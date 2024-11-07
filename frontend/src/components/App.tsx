import { useEffect, useRef, useState } from 'react';
import abcjs, { TuneObjectArray } from "abcjs";
import { MdPlaylistRemove, MdOutlinePlaylistAdd, MdEdit } from 'react-icons/md';
import '../index.css';

import Staff from './Staff';
import ControlPanel from './ControlPanel';
import Button from './parameters/Button';
import InfoBox from './InfoBox';
import ConfirmDialog from './ConfirmDialog';
import Header from './Header';

import { NoteProps } from '../interfaces/note';
import { RandomizerParameters } from '../interfaces/controlPanel';
import { NotationData } from '../interfaces/notation';

import { getRandomizedNote } from '../services/noteRandomizer';
import { fetchValidNotes } from '../services/noteFetcher';
import { fetchClefBasedOnPitchRange } from '../services/clefFetcher';
import { addNoteTiesAndBarLines } from '../services/notation';

import { DEFAULT_RANDOMIZER_PARAMS } from '../constants/voices';
import { instrumentMap } from '../constants/instruments';
import { noteDurationSymbolMap } from "../constants/durations";
import { FIRST_EIGHT_BARS, Clefs, DEFAULT_CLEF, VOICE_NUMBERS } from '../constants/voices';
import { DEFAULT_TEMPO } from '../constants/tempo';
import * as AudioVisual from '../constants/audiovisual';
import { pitchNumberMap } from '../constants/pitchRange';
import { scaleKeyQualityMap, DEFAULT_KEY } from '../constants/keys';

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
  const [notesOnStaff, setNotesOnStaff] = useState<boolean>(false);
  const [activeVoices, setActiveVoices] = useState<number[]>([1]);

  // Toggle MIDI Download Button
  const toggleMIDIDownloadButtons = (display: Boolean, midi = ""): void => {
    // Only target active voices
    // *** FIX MIDI LINK NUMBER BUG *** //
    activeVoices.forEach(voice => {
      const midiLink = document.getElementById("midi-link-" + voice.toString())!;
      midiLink.innerHTML = display ? midi: "";
      const buttonClasses = ["px-3", "py-1.5", "text-xl", "self-center", "justify-end", "rounded-full", "border", "button-primary", "bg-cyan-500", "text-white"];
      buttonClasses.forEach(className => display ? midiLink.classList.add(className): midiLink.classList.remove(className));
    });
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
    toggleMIDIDownloadButtons(true, midi.toString());
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
    setNotesOnStaff(true);
  };

  // Start
  const handleStartGenerating = async (): Promise<void> => {
    isGenerating.current = true;
    setGenerating(true);
    toggleMIDIDownloadButtons(false);
    notationData.current.forEach(notationObj => {
      notationObj.notationString = notationObj.notationString.replace(FIRST_EIGHT_BARS, "");
      randomizeAndRenderNotes(notationObj);
    });
  };

  // Clear
  const handleClearAllStaves = () => {
    for (let i = 0; i < notationData.current.length; i++) {
      const params = notationData.current[i].randomizerParams;
      notationData.current[i].notationString = 
        `X:${i + 1}\nK:${params.keySelection} ${notationData.current[i].clef}\nM:4/4\nL:1/8\nQ:1/4=${params.tempoSelection}\n${FIRST_EIGHT_BARS}`;
      staffObj = abcjs.renderAbc(`staff-${i + 1}`, notationData.current[i].notationString, AudioVisual.notationOptions);
      notationData.current[i].notesInBarCount = 0;
      notationData.current[i].previousNotePitch = undefined;
      notationData.current[i].playBackNotes = [];
    }
    toggleMIDIDownloadButtons(false);
    setNotesOnStaff(false);
  };

  // Play
  const handlePlayback = async (): Promise<void> => {
    isGenerating.current = true;
    setGenerating(true);
    toggleMIDIDownloadButtons(false);
    notationData.current.forEach(notationObj => {
      notationObj.notationString = notationObj.notationString.replace(notationObj.notationString, "");
      playNotes(notationObj); // each notation object needs to have its own collection of note elements - could do in stop function
    });
  };

  const playNotes = async (notationObj: NotationData): Promise<void> => {
    // maybe need to use the abcjs.synth.playEvent function below, first by passing all the notes into it as an array of abcjs.MidiPitches    
    // const noteElems = document.getElementsByClassName("abcjs-note");

    // target children of each staff instead

    // ** FIGURE OUT WHY THIS KEEPS LOOPING ** //
    let i = 0;
    while (i < notationObj.playBackNotes.length) {
      if (!isGenerating.current) {
        break;
      }

      await renderNoteToStaff(notationObj.playBackNotes[i], notationObj);

      if (!notationObj.playBackNotes[i].isRest) {
        playNote(notationObj.playBackNotes[i], notationObj);
        // noteElems[i].setAttribute("fill", "red");
        // if (i > 0) {
        //   noteElems[i - 1].setAttribute("fill", "black");
        // }
      }

      // Need to pause to ensure note plays out for entire length
      await new Promise(res => setTimeout(res, notationObj.playBackNotes[i].timeBetweenNotes));
      i++;       
    }
    isGenerating.current = false;
    setGenerating(false);
  };

  const playNote = (note: NoteProps, notationObj: NotationData): void => {
    abcjs.synth.playEvent(
      [
        {
          "pitch": note.pitchNumber!,
          "volume": notationObj.randomizerParams.volumeSelection,
          "start": 0,
          "duration": note.durationProps.audioDuration,
          "instrument": notationObj.instrumentMidiNumber,
          "gap": 0
        },
      ], [], 1000 // a measure takes one second.
    )
  }

  // ----VOICE ACTIONS---- //

  const getNextVoiceToAdd = (): number => {
    // Always add the lowest voice number next
    const remainingVoices = VOICE_NUMBERS.filter(x => !activeVoices.includes(x));
    return Math.min(...remainingVoices);
  };

  // Add
  const addVoiceToSystem = (): void => {
    if (activeVoices.length < 4) {
      notationData.current.push(
        {
          voiceNumber: getNextVoiceToAdd(),
          randomizerParams: DEFAULT_RANDOMIZER_PARAMS,
          notationString: `X:${activeVoices.length + 1}\nK:${DEFAULT_KEY} ${DEFAULT_CLEF}\nM:4/4\nL:1/8\nQ:1/4=${DEFAULT_TEMPO}\n${FIRST_EIGHT_BARS}`,
          playBackNotes: [],
          notesInBarCount: 0,
          instrumentMidiNumber: 2,
          validNotesForRandomizing: fetchValidNotes(DEFAULT_RANDOMIZER_PARAMS),
          clef: Clefs.Treble
        }
      )
      setActiveVoices([...activeVoices, getNextVoiceToAdd()].sort((a, b) => a - b));
    }
  };

  // Remove
  const removeVoiceFromSystem = (voiceNumber: number): void => {
    if (activeVoices.length > 1) {
      const voiceNumberIndex = activeVoices.indexOf(voiceNumber);
      const selectedVoice = notationData.current.indexOf(notationData.current[voiceNumberIndex]);
      notationData.current.splice(selectedVoice, 1);
      setActiveVoices(activeVoices.filter(voice => voice !== voiceNumber));
    }   
  };

  // Re-render when voice count has changed so new staves are displayed
  useEffect(() => {   
    const voiceCount = notationData.current.length;
    for (let i = 1; i < voiceCount + 1; i++) {
      staffObj = abcjs.renderAbc(`staff-${i}`, notationData.current[i - 1].notationString, AudioVisual.notationOptions);
    }
  }, [activeVoices.length]);

  // ----NOTE PLAYING AND RENDERING---- //

  const randomizeAndRenderNotes = async (notationObj: NotationData): Promise<void> => {
    let randomNote: NoteProps;

    while (isGenerating.current) {
      if (!isGenerating.current) {
        break;
      }

      // *** MOVE RANDOMIZE FUNCTION TO RENDER NOTE FUNCTION? *** //
      randomNote = getRandomizedNote(notationObj);
      await renderNoteToStaff(randomNote, notationObj);

      // Increase speed 5x for initial render
      await new Promise(res => setTimeout(res, randomNote.timeBetweenNotes/5));
    }
  };

  const renderNoteToStaff = async (note: NoteProps, notationObj: NotationData): Promise<void> => {
    // Update notation object with new note syntax
    notationObj = addNoteTiesAndBarLines(note, notationObj);
    
    // Set previous pitch for steps functionality
    notationObj.previousNotePitch = note.pitchNumber;

    // Re-render staff with newly added note
    staffObj = abcjs.renderAbc(`staff-${notationObj.voiceNumber}`, notationObj.notationString, AudioVisual.notationOptions);
  };

  // ----UPDATE STAFF AND PARAMETERS FOR SPECIFIC VOICE---- //

  // Save control panel changes for targeted voice
  const handleUpdateStaff = (controlPanelParams: RandomizerParameters, selectedVoiceNumber: number): void => {

    let targetVoice = notationData.current.find(notationObj => notationObj.voiceNumber === selectedVoiceNumber);

    if (targetVoice) {

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

  // ----REMOVE STAFF DIALOG BEHAVIOR---- //

  const [openRemoveStaffDialog, setopenRemoveStaffDialog] = useState<boolean>(false);
  const [voiceToRemove, setVoiceToRemove] = useState<number>();

  const handleOpenRemoveStaffDialog = (voiceNumber: number) => {
    setopenRemoveStaffDialog(true);
    setVoiceToRemove(voiceNumber);
  };

  const handleSubmitRemoveStaff = () => {
    removeVoiceFromSystem(voiceToRemove!);
    setopenRemoveStaffDialog(false);
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

  const staffDescription = (randomizerParams: RandomizerParameters): JSX.Element => {
    const noteDurations = randomizerParams.durationSelection.filter(d => d.selected).map((d) => {
      return <span key={d.noteLength} style={{width: "30px", paddingTop: "18px"}}>{noteDurationSymbolMap[d.noteLength]}</span>
    });

    const desc = `${randomizerParams.instrumentSelection} |
      ${randomizerParams.keySelection} ${randomizerParams.scaleSelection} |
      ${pitchNumberMap[randomizerParams.pitchRangeSelection[0]]}-${pitchNumberMap[randomizerParams.pitchRangeSelection[1]]} |
      
      ${randomizerParams.stepsSelection.toString()} Step${randomizerParams.stepsSelection === 1 ? "" : "s"} |
      ${randomizerParams.repeatNoteSelection ? "" : "No "} Repeats | `;

      return (
        <>
          <p className="px-3 py-2 text-slate-600 text-xl self-center">{desc}</p>
          <p className="flex flex-row">{noteDurations}</p>
        </>
      );
  };

  const staves = notationData.current.sort((a, b) => a.voiceNumber - b.voiceNumber).map((notationObj) => {
    return (
      <div className="flex flex-row" key={notationObj.voiceNumber}>
        <div className="flex flex-col justify-center">
          {false &&
            <Button disabled={generating} extraStyling="text-blue-500" onClick={() => handleOpenControlPanel(notationObj.voiceNumber, notationObj.randomizerParams, generating)}>
              <MdEdit className="text-3xl" />
            </Button>
          }
          {notationObj.voiceNumber !== 1 && !generating &&
            <Button disabled={generating} extraStyling="text-blue-500" onClick={() => handleOpenRemoveStaffDialog(notationObj.voiceNumber)}>
              <MdPlaylistRemove className="text-4xl" />
            </Button>
          }
        </div>
        <div className="flex flex-col justify-center pb-3">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row">
              <p className="border border-cyan-500 bg-cyan-500 px-5 py-4 text-white text-2xl self-center">{notationObj.voiceNumber}</p>
              {staffDescription(notationObj.randomizerParams)}
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
      </div>
    );
  });

  // ----JSX---- //

  return (
    <div>
      <Header 
        handleOpenInfoBox={handleOpenInfoBox} 
        generating={generating}
        notesOnStaff={notesOnStaff}
        handleStartGenerating={handleStartGenerating}
        handleStopGenerating={handleStopGenerating}
        handleClearStaves={handleClearAllStaves}
        handlePlayback={handlePlayback}
      />
      <div className="p-8 bg-slate-100">
        <div className="flex flex-col p-4">
          {staves}
        </div> 
        <div className="flex flex-row justify-center">
          {activeVoices.length < 4 && !generating &&
          <Button disabled={generating} extraStyling="flex flex-row text-blue-500" onClick={addVoiceToSystem}>
            <MdOutlinePlaylistAdd className="text-4xl" />
          </Button>
          }
        </div>
      </div>      
      {openControlPanel && 
        <ControlPanel 
          onSubmit={handleUpdateStaff} 
          voiceNumber={voiceNumber}
          randomizerParameters={randomizerParameters}
          handleCloseControlPanel={() => setOpenControlPanel(false)}
          openControlPanel={openControlPanel}
        />
      }
      {openInfoBox && 
        <InfoBox handleCloseInfoBox={handleCloseInfoBox} openInfoBox={openInfoBox} />
      }
      {openRemoveStaffDialog &&
        <ConfirmDialog
          openDialog={openRemoveStaffDialog}
          dialogTitle="Remove Staff"
          submitButtonText="Remove" 
          onSubmit={handleSubmitRemoveStaff}
          handleCloseConfirmDialog={() => setopenRemoveStaffDialog(false)}>
            Are you sure you want to remove this staff?
        </ConfirmDialog>
      }
    </div>
  );
}