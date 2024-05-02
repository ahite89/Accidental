import { useEffect, useRef, useState } from 'react';
import abcjs, { TuneObjectArray } from "abcjs";
import Modal from 'react-modal';
import '../index.css';
import { MdPlaylistRemove, MdInfoOutline, MdOutlinePlaylistAdd } from 'react-icons/md';

import Staff from './Staff';
import ControlPanel from './ControlPanel';
import Button from './parameters/Button';
import InfoBox from './InfoBox';

import { NoteProps } from '../interfaces/note';
import { RandomizerParameters } from '../interfaces/controlPanel';
import { NotationData } from '../interfaces/notation';

import { getRandomizedNote } from '../services/noteRandomizer';
import { fetchValidNotes } from '../services/noteFetcher';
import { fetchClefBasedOnPitchRange } from '../services/clefFetcher';

import { DEFAULT_RANDOMIZER_PARAMS } from '../constants/voices';
import { instrumentMap } from '../constants/instruments';
import { MAX_BEATS_PER_BAR } from "../constants/durations";
import { FIRST_EIGHT_BARS, Clefs, DEFAULT_CLEF } from '../constants/voices';
import { DEFAULT_TEMPO } from '../constants/tempo';
import * as AudioVisual from '../constants/audiovisual';
import { pitchNumberMap } from '../constants/pitchRange';
import { scaleKeyQualityMap } from '../constants/keys';
import Header from './Header';

export default function App() {

  // ----NOTATION REF---- //
  const notationData = useRef<NotationData[]>([
    {
      voiceNumber: 1,
      randomizerParams: DEFAULT_RANDOMIZER_PARAMS,
      notationString: `X:1\nK:C ${DEFAULT_CLEF}\nM:4/4\nL:1/8\nQ:1/4=${DEFAULT_TEMPO}\n${FIRST_EIGHT_BARS}`,
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

  // MIDI Download
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
    document.getElementById("midi-link-" + notationObj.voiceNumber.toString())!.innerHTML = midi;
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
      document.getElementById("midi-link-" + notationObj.voiceNumber.toString())!.innerHTML = "";
      notationObj.notationString = notationObj.notationString.replace(FIRST_EIGHT_BARS, "");
      randomizeAndRenderNotes(notationObj);
    });
  };

  // Clear
  const handleClearStaff = () => {
    for (let i = 0; i < notationData.current.length; i++) {
      // Maybe move tempo outside of staves
      if (i === 0) {
        notationData.current[i].notationString = `X:1\nK:C ${notationData.current[i].clef}\nM:4/4\nL:1/8\nQ:1/4=${notationData.current[i].randomizerParams.tempoSelection}\n${FIRST_EIGHT_BARS}`;
      }
      else {
        notationData.current[i].notationString = `X:${i + 1}\nK:C ${notationData.current[i].clef}\nM:4/4\nL:1/8\nQ:1/4=${notationData.current[i].randomizerParams.tempoSelection}\n${FIRST_EIGHT_BARS}`
      }
      staffObj = abcjs.renderAbc(`staff-${i + 1}`, notationData.current[i].notationString, AudioVisual.notationOptions);
      // Hide download link if staves have been cleared
      document.getElementById("midi-link-" + notationData.current[i].voiceNumber)!.innerHTML = "";
      notationData.current[i].notesInBarCount = 0;
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
          notationString: `X:${voiceCount + 1}\nK:C ${DEFAULT_CLEF}\nM:4/4\nL:1/8\nQ:1/4=${DEFAULT_TEMPO}\n${FIRST_EIGHT_BARS}`,
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
      await playAndRenderNoteToStaff(randomNote, notationObj);
      // Need to pause to ensure note plays out for entire length
      await new Promise(res => setTimeout(res, randomNote.timeBetweenNotes));
    }
  };

  const playAndRenderNoteToStaff = async (note: NoteProps, notationObj: NotationData): Promise<void> => {
    let newNote = '';  
    newNote = note.abcName + note.durationProps.abcSyntax;
    
    notationObj.notesInBarCount += note.durationProps.audioDuration;
    if (notationObj.notesInBarCount >= MAX_BEATS_PER_BAR) {
      newNote += '|';
      notationObj.notesInBarCount = 0;
    }

    notationObj.notationString += newNote;

    // Add notes to playback array for playback functionality
    // notationObj.playBackNotes.push({pitchNumber: note.pitchNumber, duration: note.duration});
    // probably need to use the abcjs.synth.playEvent function below, first by passing all the notes into it as an array of abcjs.MidiPitches

    // Play audio and add note to staff
    staffObj = abcjs.renderAbc(`staff-${notationObj.voiceNumber}`, notationObj.notationString, AudioVisual.notationOptions);
    await playNote(note, notationObj);    
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

      // Update notation string and randomizer parameters
      targetVoice.notationString = `X:${targetVoice.voiceNumber}\nK:${keySignature} ${targetVoice.clef}\nM:4/4\nQ:1/4=${controlPanelParams.tempoSelection}\n${FIRST_EIGHT_BARS}`;
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
    setOpenInfoBox(true);
  };

  // Show app description modal the first time a user loads the page 
  useEffect(() => {
    const hasSeenDescription = localStorage.getItem("seenDescription");
    if (hasSeenDescription === null) {
      setOpenInfoBox(true);
    }
  }, []);

  // ----RENDER STAVES---- //

  const staves = notationData.current.map((notationObj) => {

    const noteDurations = notationObj.randomizerParams.durationSelection.filter(d => d.selected).map(d => d.noteLength);
    const staffDescription = `${notationObj.randomizerParams.instrumentSelection} in
      ${notationObj.randomizerParams.keySelection} ${notationObj.randomizerParams.scaleSelection} |
      ${pitchNumberMap[notationObj.randomizerParams.pitchRangeSelection[0]]}-${pitchNumberMap[notationObj.randomizerParams.pitchRangeSelection[1]]} |
      ${noteDurations.join(', ')} Notes`

    return (
      <div key={notationObj.voiceNumber} className="flex flex-col justify-center pb-3">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <p className="border border-cyan-500 bg-cyan-500 px-5 py-4 text-white text-2xl self-center">{notationObj.voiceNumber}</p>
            <p className="px-3 py-2 text-slate-600 text-xl self-center">{staffDescription}</p>
            {notationObj.voiceNumber !== 1 && !generating &&
              <Button disabled={generating} extraStyling="flex flex-row text-blue-500" onClick={() => removeVoiceFromSystem(notationObj.voiceNumber)}>
                <MdPlaylistRemove className="text-4xl" />
              </Button>
            }
          </div>
          <div onClick={() => handleDownloadMIDI(notationObj)} 
               id={`midi-link-` + notationObj.voiceNumber.toString()} 
               className="px-3 py-1.5 text-xl text-blue-500 self-center justify-end">
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