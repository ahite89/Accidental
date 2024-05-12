import { useEffect, useRef, useState } from 'react';
import abcjs, { TuneObjectArray } from "abcjs";
import Modal from 'react-modal';
import '../index.css';
import { MdPlaylistRemove, MdOutlinePlaylistAdd } from 'react-icons/md';

import Staff from './Staff';
import ControlPanel from './ControlPanel';
import Button from './parameters/Button';
import InfoBox from './InfoBox';

import { NoteProps } from '../interfaces/note';
import { RandomizerParameters } from '../interfaces/controlPanel';
import { NotationData } from '../interfaces/notation';
import { DurationProps } from '../interfaces/selectable';

import { getRandomizedNote } from '../services/noteRandomizer';
import { fetchValidNotes } from '../services/noteFetcher';
import { fetchClefBasedOnPitchRange } from '../services/clefFetcher';

import { DEFAULT_RANDOMIZER_PARAMS } from '../constants/voices';
import { instrumentMap } from '../constants/instruments';
import { MAX_BEATS_PER_BAR, durationOptions } from "../constants/durations";
import { FIRST_EIGHT_BARS, Clefs, DEFAULT_CLEF } from '../constants/voices';
import { DEFAULT_TEMPO } from '../constants/tempo';
import * as AudioVisual from '../constants/audiovisual';
import { pitchNumberMap } from '../constants/pitchRange';
import { scaleKeyQualityMap, DEFAULT_KEY } from '../constants/keys';
import Header from './Header';

export default function App() {

  // ----NOTATION REF---- //
  const notationData = useRef<NotationData[]>([
    {
      voiceNumber: 1,
      randomizerParams: DEFAULT_RANDOMIZER_PARAMS,
      notationString: `X:1\nK:${DEFAULT_KEY} ${DEFAULT_CLEF}\nM:4/4\nL:1/8\nQ:1/4=${DEFAULT_TEMPO}\n${FIRST_EIGHT_BARS}`,
      playBackNotes: [],
      notesInBarCount: 0,
      instrumentMidiNumber: 2,
      validNotesForRandomizing: fetchValidNotes(DEFAULT_RANDOMIZER_PARAMS),
      clef: Clefs.Treble
    }
  ]);

  // ----PRIMARY ACTIONS---- //

  let staffObj: TuneObjectArray;

  const isGenerating = useRef<boolean>(false);  // for stopping/starting
  const [generating, setGenerating] = useState<boolean>(false); // for disabling buttons

  // Toggle MIDI Download Button
  const toggleMIDIDownloadButton = (display: Boolean, notationObj: NotationData, midi = ""): void => {
    const midiLink = document.getElementById("midi-link-" + notationObj.voiceNumber.toString())!;
    midiLink.innerHTML = display ? midi: "";
    const buttonClasses = ["px-3", "py-1.5", "text-xl", "self-center", "justify-end", "rounded-full", "border", "hover:opacity-75", "bg-cyan-500", "text-white"];
    buttonClasses.forEach(className => display ? midiLink.classList.add(className): midiLink.classList.remove(className));
  };

  // Download MIDI
  const handleDownloadMIDI = (notationObj: NotationData): void => {
    const staffObjForDownload = abcjs.renderAbc(`staff-${notationObj.voiceNumber}`, notationObj.notationString, AudioVisual.notationOptions);
    const midi = abcjs.synth.getMidiFile(staffObjForDownload[0],
      { 
        chordsOff: true,
        midiOutputType: "link",
        fileName: `Accidental Voice ${notationObj.voiceNumber}`,
        downloadLabel: `Download MIDI`
      }
    );
    toggleMIDIDownloadButton(true, notationObj, midi.toString());
  };

  // Stop
  const handleStopGenerating = () => {
    isGenerating.current = false;
    setGenerating(false);
    // Only reveal the download link for a staff if generator has run and stopped
    for (let i = 0; i < notationData.current.length; i++) {
      if (!notationData.current[i].notationString.includes(FIRST_EIGHT_BARS)) {
        handleDownloadMIDI(notationData.current[i]);
      }
    }
  };

  // Start
  const handleStartGenerating = async (): Promise<void> => {
    isGenerating.current = true;
    setGenerating(true);
    notationData.current.forEach(notationObj => {
      toggleMIDIDownloadButton(false, notationObj);
      notationObj.notationString = notationObj.notationString.replace(FIRST_EIGHT_BARS, "");
      randomizeAndRenderNotes(notationObj);
    });
  };

  // Clear
  const handleClearStaff = () => {
    for (let i = 0; i < notationData.current.length; i++) {
      const params = notationData.current[i].randomizerParams;
      notationData.current[i].notationString = 
        `X:${i + 1}\nK:${params.keySelection} ${notationData.current[i].clef}\nM:4/4\nL:1/8\nQ:1/4=${params.tempoSelection}\n${FIRST_EIGHT_BARS}`;
      staffObj = abcjs.renderAbc(`staff-${i + 1}`, notationData.current[i].notationString, AudioVisual.notationOptions);
      notationData.current[i].notesInBarCount = 0;
      notationData.current[i].previousNotePitch = undefined;
      toggleMIDIDownloadButton(false, notationData.current[i]);
    }
  };

  // const handlePlayback = (): void => {
  //   // Find a way to only pass the notation object in; not the generated note props
  //   // Loop through notation string characters
  //   notationData.current[0].playBackNotes.forEach(note => {
  //       playNote(
  //       {abcName: 'F', pitchNumber: note.pitchNumber, duration: note.duration, timeBetweenNotes: 1000},
  //       notationData.current[0]
  //     )
  //   });
  // };

  // ----VOICE ACTIONS---- //

  const [voiceCount, setVoiceCount] = useState<number>(notationData.current.length);

  // Add
  const addVoiceToSystem = (): void => {
    console.log(voiceCount);
    if (voiceCount < 4) {
      notationData.current.push(
        {
          voiceNumber: voiceCount + 1,
          randomizerParams: DEFAULT_RANDOMIZER_PARAMS,
          notationString: `X:${voiceCount + 1}\nK:${DEFAULT_KEY} ${DEFAULT_CLEF}\nM:4/4\nL:1/8\nQ:1/4=${DEFAULT_TEMPO}\n${FIRST_EIGHT_BARS}`,
          playBackNotes: [],
          notesInBarCount: 0,
          instrumentMidiNumber: 2,
          validNotesForRandomizing: fetchValidNotes(DEFAULT_RANDOMIZER_PARAMS),
          clef: Clefs.Treble
        }
      )
      setVoiceCount(voiceCount + 1);
    }
  };

  // Remove
  const removeVoiceFromSystem = (voiceNumber: number): void => {
    if (voiceCount > 1) {
      const selectedVoice = notationData.current.indexOf(notationData.current[voiceNumber - 1]);
      notationData.current.splice(selectedVoice, 1);
      setVoiceCount(voiceCount - 1);
    }
  };

  // Re-render when voice count has changed
  useEffect(() => {   
    // need to remove element from dom when applicable
    const voiceCount = notationData.current.length;
    for (let i = 1; i < voiceCount + 1; i++) {
      staffObj = abcjs.renderAbc(`staff-${i}`, notationData.current[i - 1].notationString, AudioVisual.notationOptions);
    }
  }, [voiceCount]);

  // ----NOTE PLAYING AND RENDERING---- //

  const randomizeAndRenderNotes = async (notationObj: NotationData): Promise<void> => {
    let randomNote: NoteProps;

    while (isGenerating.current) {
      if (!isGenerating.current) {
        break;
      }
      randomNote = getRandomizedNote(notationObj);
      await renderNoteToStaff(randomNote, notationObj);
      if (!randomNote.isRest) {
        await playNote(randomNote, notationObj);
      }
      // Need to pause to ensure note plays out for entire length
      await new Promise(res => setTimeout(res, randomNote.timeBetweenNotes));
    }
  };

  const renderNoteToStaff = async (note: NoteProps, notationObj: NotationData): Promise<void> => {
    let newNote = '', tieNoteLeftover: DurationProps | undefined;
    // Deal with ties and bar lines
    if (notationObj.notesInBarCount + note.durationProps.audioDuration === MAX_BEATS_PER_BAR) {
      newNote = note.abcName + note.durationProps.abcSyntax + '|';
      notationObj.notesInBarCount = 0;
      notationObj.notationString += newNote;
    }
    // If note is too long for current bar, split it into two and tie it over the bar
    else if (notationObj.notesInBarCount + note.durationProps.audioDuration > MAX_BEATS_PER_BAR) {
      const firstNoteOfTieLength = MAX_BEATS_PER_BAR - notationObj.notesInBarCount;

      if (firstNoteOfTieLength !== 5 && firstNoteOfTieLength !== 7) {
        const firstNoteOfTie = durationOptions.find(duration => duration.audioDuration === firstNoteOfTieLength);
        newNote = note.abcName + firstNoteOfTie?.abcSyntax + (note.isRest ? '|' : '-|');
        notationObj.notationString += newNote;
      }
      else {
        // If non-existent duration, add eighth note first so that the resulting duration is a half or dotted half
        newNote = note.abcName + '-';
        notationObj.notationString += newNote;

        // Add the remainder of the duration
        tieNoteLeftover = durationOptions.find(duration => duration.audioDuration === firstNoteOfTieLength - 1);
        newNote = note.abcName + tieNoteLeftover?.abcSyntax + (note.isRest ? '|' : '-|');
        notationObj.notationString += newNote;
      }
      
      notationObj.notesInBarCount = 0;   
      const secondNoteOfTieLength = note.durationProps.audioDuration - firstNoteOfTieLength;

      // Check for note durations that don't exist (e.g. half + eighth)
      if (secondNoteOfTieLength !== 5 && secondNoteOfTieLength !== 7) {
        const secondNoteOfTie = durationOptions.find(duration => duration.audioDuration === secondNoteOfTieLength);
        newNote = note.abcName + secondNoteOfTie?.abcSyntax;
        notationObj.notationString += newNote;
      }
      else {
        // If non-existent duration, add eighth note first so that the resulting duration is a half or dotted half
        newNote = note.abcName + '-';
        notationObj.notationString += newNote;

        // Add the remainder of the duration
        tieNoteLeftover = durationOptions.find(duration => duration.audioDuration === secondNoteOfTieLength - 1);
        newNote = note.abcName + tieNoteLeftover?.abcSyntax;
        notationObj.notationString += newNote;
      }
      notationObj.notesInBarCount = secondNoteOfTieLength;
    }
    else {
      newNote += (note.abcName + note.durationProps.abcSyntax);
      notationObj.notationString += newNote;
      notationObj.notesInBarCount += note.durationProps.audioDuration;
    }
      
    // Add notes to playback array for playback functionality
    // notationObj.playBackNotes.push({pitchNumber: note.pitchNumber, duration: note.duration});
    // probably need to use the abcjs.synth.playEvent function below, first by passing all the notes into it as an array of abcjs.MidiPitches

    // Set for steps functionality
    notationObj.previousNotePitch = note.pitchNumber;

    // Add note to staff
    staffObj = abcjs.renderAbc(`staff-${notationObj.voiceNumber}`, notationObj.notationString, AudioVisual.notationOptions);
  };

  const playNote = async (note: NoteProps, notationObj: NotationData): Promise<void> => {
    abcjs.synth.playEvent(
      [
        {
          "pitch": note.pitchNumber,
          "volume": notationObj.randomizerParams.volumeSelection,
          "start": 0,
          "duration": note.durationProps.audioDuration,
          "instrument": notationObj.instrumentMidiNumber,
          "gap": 0
        },
      ], [], 1000 // a measure takes one second.
    )
  }

  // ----UPDATE STAFF AND PARAMETERS FOR SPECIFIC VOICE---- //

  // Save control panel changes for targeted voice
  const handleUpdateStaff = (controlPanelParams: RandomizerParameters, selectedVoiceNumber: number): void => {

    let targetVoice = notationData.current.find(notationObj => notationObj.voiceNumber === selectedVoiceNumber);

    if (targetVoice && targetVoice.randomizerParams !== controlPanelParams) {

      // Set valid notes for randomizing based on control panel params (assuming they've changed)
      targetVoice.validNotesForRandomizing = fetchValidNotes(controlPanelParams);
      
      // Get clef and instrument
      targetVoice.clef = fetchClefBasedOnPitchRange(controlPanelParams.pitchRangeSelection);
      targetVoice.instrumentMidiNumber = instrumentMap[controlPanelParams.instrumentSelection];

      // Change key signature based on scale quality (major/minor)
      const key = scaleKeyQualityMap[controlPanelParams.scaleSelection].keys.find(k => k.name === controlPanelParams.keySelection)!;
      const keySignature = key.relativeMajorKey ? key.relativeMajorKey : controlPanelParams.keySelection;
      
      // Update notation string and randomizer parameters (don't erase already generated notes if present)
      if (targetVoice.notationString.includes(FIRST_EIGHT_BARS)) {
        targetVoice.notationString = `X:${targetVoice.voiceNumber}\nK:${keySignature} ${targetVoice.clef}\nM:4/4\nQ:1/4=${controlPanelParams.tempoSelection}\n${FIRST_EIGHT_BARS}`;
      }
      else if (targetVoice.randomizerParams.keySelection !== controlPanelParams.keySelection) {
        targetVoice.notationString += `| [K:${keySignature}]`;
      }
      
      targetVoice.randomizerParams = controlPanelParams;
      
      // Render new changes to staff/voice
      abcjs.renderAbc(`staff-${targetVoice.voiceNumber}`, targetVoice.notationString, AudioVisual.notationOptions);
    }
    setOpenControlPanel(false);
  };

  // ----CONTROL PANEL BEHAVIOR---- //

  const [randomizerParameters, setRandomizerParameters] = useState<RandomizerParameters>(DEFAULT_RANDOMIZER_PARAMS);
  const [voiceNumber, setVoiceNumber] = useState<number>(1);
  const [openControlPanel, setOpenControlPanel] = useState<boolean>(false);

  const handleOpenControlPanel = (voiceNumber: number, randomizerParams: RandomizerParameters, generating: boolean): void => {
    if (!generating) {
      setRandomizerParameters(randomizerParams);
      setVoiceNumber(voiceNumber);
      setOpenControlPanel(true);
    }
  };

  const handleCloseControlPanel = () => {
    setOpenControlPanel(false);
  };

  const modalStyling = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  };

  // ----INFO BOX BEHAVIOR---- //

  const [openInfoBox, setOpenInfoBox] = useState<boolean>(false);

  const handleCloseInfoBox = () => {
    localStorage.setItem("seenDescription", "true");
    setOpenInfoBox(false);
  };

  const handleOpenInfoBox = () => {
    if (!generating) {
      setOpenInfoBox(true);
    }
  };

  // Show app description modal the first time a user loads the page 
  useEffect(() => {
    const hasSeenDescription = localStorage.getItem("seenDescription");
    if (hasSeenDescription === null) {
      setOpenInfoBox(true);
    }
  }, []);

  // ----RENDER STAVES---- //

  const staffDescription = (randomizerParams: RandomizerParameters): string => {
    const noteDurations = randomizerParams.durationSelection.filter(d => d.selected).map(d => d.noteLength);

    return `${randomizerParams.instrumentSelection} in
      ${randomizerParams.keySelection} ${randomizerParams.scaleSelection} |
      ${pitchNumberMap[randomizerParams.pitchRangeSelection[0]]}-${pitchNumberMap[randomizerParams.pitchRangeSelection[1]]} |
      ${noteDurations.join(', ')} |
      ${randomizerParams.stepsSelection.toString()} Step${randomizerParams.stepsSelection === 1 ? "" : "s"} Between Notes |
      ${randomizerParams.repeatNoteSelection ? "" : "No "} Repeated Notes`
  };

  const staves = notationData.current.map((notationObj) => {
    return (
      <div key={notationObj.voiceNumber} className="flex flex-col justify-center pb-3">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <p className="border border-cyan-500 bg-cyan-500 px-5 py-4 text-white text-2xl self-center">{notationObj.voiceNumber}</p>
            <p className="px-3 py-2 text-slate-600 text-xl self-center">{staffDescription(notationObj.randomizerParams)}</p>
            {notationObj.voiceNumber !== 1 && !generating &&
              <Button disabled={generating} extraStyling="flex flex-row text-blue-500" onClick={() => removeVoiceFromSystem(notationObj.voiceNumber)}>
                <MdPlaylistRemove className="text-4xl" />
              </Button>
            }
          </div>
          <div onClick={() => handleDownloadMIDI(notationObj)} 
               id={`midi-link-` + notationObj.voiceNumber.toString()}>
          </div>
        </div>
        <div>
          <Staff 
            voiceNumber={notationObj.voiceNumber}
            randomizerParams={notationObj.randomizerParams}
            generating={generating}
            handleOpenControlPanel={handleOpenControlPanel}
          />
        </div>          
      </div>
    );
  });

  // ----JSX---- //

  return (
    <div>
      <Header handleOpenInfoBox={handleOpenInfoBox} />
      <div className="p-8 bg-slate-100">
        <div className="flex flex-row justify-center my-4">
          <Button disabled={generating} extraStyling="mr-4 text-xl" primary rounded onClick={handleStartGenerating}>
            Start
          </Button>
          <Button disabled={!generating} extraStyling="mr-4 text-xl" primary rounded onClick={handleStopGenerating}>
            Stop
          </Button>
          <Button disabled={generating} extraStyling="mr-4 text-xl" primary rounded onClick={handleClearStaff}>
            Clear
          </Button>
          {/* <Button disabled={isGenerating.current} extraStyling="mr-4 border border-2 border-white" primary rounded onClick={handlePlayback}>
            Play
          </Button> */}
        </div>
        <div className="flex flex-col p-4">
          {staves}
        </div> 
        <div className="flex flex-row justify-center">
          {voiceNumber < 4 && !generating &&
          <Button disabled={generating} extraStyling="flex flex-row text-blue-500" onClick={addVoiceToSystem}>
            <MdOutlinePlaylistAdd className="text-4xl" />
          </Button>
          }
        </div>
      </div>
      <Modal isOpen={openControlPanel} style={modalStyling} ariaHideApp={false}>
          {openControlPanel && <ControlPanel 
            onSubmit={handleUpdateStaff} 
            voiceNumber={voiceNumber}
            randomizerParameters={randomizerParameters}
            handleCloseControlPanel={handleCloseControlPanel}
          />}
      </Modal>
      <Modal isOpen={openInfoBox} style={modalStyling} ariaHideApp={false}>
        {openInfoBox && 
          <InfoBox handleCloseInfoBox={handleCloseInfoBox} />
        }
      </Modal>
    </div>
  );
}