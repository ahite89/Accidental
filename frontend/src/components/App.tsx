import { useEffect, useRef, useState } from 'react';
import abcjs, { TuneObjectArray } from "abcjs";
import Modal from 'react-modal';
import { MdEdit, MdPlaylistRemove } from 'react-icons/md';

import Staff from './Staff';
import ControlPanel from './ControlPanel';
import Button from './parameters/Button';

import { NoteProps } from '../interfaces/note';
import { RandomizerParameters } from '../interfaces/controlPanel';
import { NotationData } from '../interfaces/notation';

import { getRandomizedNote } from '../services/noteRandomizer';
import { fetchValidNotes } from '../services/noteFetcher';
import { fetchClefBasedOnPitchRange } from '../services/clefFetcher';

import { DEFAULT_RANDOMIZER_PARAMS } from '../constants/voices';
import { instrumentMap } from '../constants/instruments';
import { MAX_BEATS_PER_BAR } from "../constants/durations";
import { FIRST_FOUR_BARS, Clefs, DEFAULT_CLEF } from '../constants/voices';
import { DEFAULT_TEMPO } from '../constants/tempo';
import * as AudioVisual from '../constants/audiovisual';
import { pitchNumberMap } from '../constants/pitchRange';

export default function App() {

  // REFS //

  // Tempo
  const activeTempo = useRef<number>(DEFAULT_TEMPO);

  // Notation
  const notationData = useRef<NotationData[]>([
    {
      voiceNumber: 1,
      randomizerParams: DEFAULT_RANDOMIZER_PARAMS,
      notationString: `X:1\nK:C ${DEFAULT_CLEF}\nM:4/4\nL:1/8\nQ:1/4=${activeTempo.current.toString()}\n${FIRST_FOUR_BARS}`,
      playBackNotes: [],
      notesInBarCount: 0,
      instrumentMidiNumber: 2,
      validNotesForRandomizing: fetchValidNotes(DEFAULT_RANDOMIZER_PARAMS),
      clef: Clefs.Treble
    }
  ]);

  // NOTE RENDERING BUTTONS //

  const isGenerating = useRef<boolean>(false);

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
    // Only reveal the download link for a staff if generator has run and stopped
    for (let i = 0; i < notationData.current.length; i++) {
      if (!notationData.current[i].notationString.includes(FIRST_FOUR_BARS)) {
        handleDownloadMIDI(notationData.current[i]);
      }
    }
  };

  // Start
  const handleStartGenerating = async (): Promise<void> => {
    isGenerating.current = true;
    notationData.current.forEach(notationObj => {
      document.getElementById("midi-link-" + notationObj.voiceNumber.toString())!.innerHTML = "";
      randomizeAndRenderNotes(notationObj);
    });
  };

  // Clear
  const handleClearStaff = () => {
    for (let i = 0; i < notationData.current.length; i++) {
      // can consolidate if tempo is removed from the voice 1 staff
      // could also add tempo to all staves
      if (i === 0) {
        notationData.current[i].notationString = `X:1\nK:C ${notationData.current[i].clef}\nM:4/4\nL:1/8\nQ:1/4=${activeTempo.current.toString()}\n${FIRST_FOUR_BARS}`;
      }
      else {
        notationData.current[i].notationString = `X:${i + 1}\nK:C ${notationData.current[i].clef}\nM:4/4\nL:1/8\n${FIRST_FOUR_BARS}`
      }
      staffObj = abcjs.renderAbc(`staff-${i + 1}`, notationData.current[i].notationString, AudioVisual.notationOptions);
      // Hide download link if staves have been cleared
      document.getElementById("midi-link-" + notationData.current[i].voiceNumber)!.innerHTML = "";
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

  // VOICES //

  const [voiceCount, setVoiceCount] = useState<number>(notationData.current.length);

  // Add
  const addVoiceToSystem = (): void => {
    if (voiceCount < 4) {
      notationData.current.push(
        {
          voiceNumber: voiceCount + 1,
          randomizerParams: DEFAULT_RANDOMIZER_PARAMS,
          notationString: `X:${voiceCount + 1}\nK:C ${DEFAULT_CLEF}\nM:4/4\nL:1/8\n${FIRST_FOUR_BARS}`,
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

  // INITIALIZE SYNTH AND STAFF //

  let staffObj: TuneObjectArray, targetVoice: NotationData | undefined;

  useEffect(() => {   
    // need to remove element from dom when applicable
    // re-run when any of the big voice objects has changed
    const voiceCount = notationData.current.length;
    for (let i = 1; i < voiceCount + 1; i++) {
      staffObj = abcjs.renderAbc(`staff-${i}`, notationData.current[i - 1].notationString, AudioVisual.notationOptions);
    }
  }, [activeTempo.current, voiceCount, isGenerating.current]);

  // NOTE RENDERING //

  const playAndRenderNoteToStaff = async (note: NoteProps, notationObj: NotationData): Promise<void> => {
    let newNote = '', blankStaffSpaceFilled = notationObj.notationString.indexOf('x') === -1;
    
    // notationObj.notesInBarCount += note.duration;
    newNote = note.abcName + note.durationProps.abcSyntax;
    
    if (blankStaffSpaceFilled) {
      // if (notationObj.notesInBarCount === MAX_BEATS_PER_BAR) {
        // newNote += '|';
        // notationObj.notesInBarCount = 0;
      // }

      notationObj.notationString += newNote;
    }
    else {
      // replace blank staff space until filled in with notes
      notationObj.notationString = notationObj.notationString.replace('x', newNote);
    }

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

  // Save control panel changes for targeted voice
  const handleUpdateStaff = (controlPanelParams: RandomizerParameters, selectedVoiceNumber: number): void => {
    targetVoice = notationData.current.find(notationObj => notationObj.voiceNumber === selectedVoiceNumber);

    if (targetVoice) {
      // Set valid notes for randomizing based on control panel params
      targetVoice.validNotesForRandomizing = fetchValidNotes(controlPanelParams);
      
      targetVoice.clef = fetchClefBasedOnPitchRange(controlPanelParams.pitchRangeSelection);
      targetVoice.instrumentMidiNumber = instrumentMap[controlPanelParams.instrumentSelection];
      targetVoice.notationString = `X:${targetVoice.voiceNumber}\nK:${controlPanelParams.keySelection} ${targetVoice.clef}\nM:4/4\nQ:1/4=${controlPanelParams.tempoSelection}\n${FIRST_FOUR_BARS}`;
      targetVoice.randomizerParams = controlPanelParams;
      
      abcjs.renderAbc(`staff-${targetVoice.voiceNumber}`, targetVoice.notationString, AudioVisual.notationOptions);
    }
    setOpenControlPanel(false);
  };

  // CONTROLS MODAL //

  const [randomizerParameters, setRandomizerParameters] = useState<RandomizerParameters>(DEFAULT_RANDOMIZER_PARAMS);
  const [voiceNumber, setVoiceNumber] = useState<number>(1);
  const [openControlPanel, setOpenControlPanel] = useState<boolean>(false);

  const handleOpenControlPanel = (voiceNumber: number, randomizerParams: RandomizerParameters): void => {
    setRandomizerParameters(randomizerParams);
    setVoiceNumber(voiceNumber);
    setOpenControlPanel(true);
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
      transform: 'translate(-50%, -50%)',
    }
  };

  // STAVES //

  const staves = notationData.current.map((notationObj) => {

    const noteDurations = notationObj.randomizerParams.durationSelection.filter(d => d.selected).map(d => d.noteLength);
    const staffDescription = `${notationObj.randomizerParams.instrumentSelection} in
      ${notationObj.randomizerParams.keySelection} ${notationObj.randomizerParams.scaleSelection},
      Range of ${pitchNumberMap[notationObj.randomizerParams.pitchRangeSelection[0]]}-${pitchNumberMap[notationObj.randomizerParams.pitchRangeSelection[1]]}, 
      Durations of ${noteDurations.join(', ')}`

    return (
      <div key={notationObj.voiceNumber} className="flex flex-col justify-center pb-3">
        <div className="flex flex-row">
          <p className="border border-cyan-500 bg-cyan-500 px-3 py-2 text-white">{notationObj.voiceNumber}</p>
          <p className="px-3 py-2 text-slate-600">{staffDescription}</p>
          <Button disabled={isGenerating.current} outline onClick={() => handleOpenControlPanel(notationObj.voiceNumber, notationObj.randomizerParams)}>
            <MdEdit className="text-2xl"/>
          </Button>
          {notationObj.voiceNumber !== 1 &&
            <Button disabled={isGenerating.current} outline onClick={() => removeVoiceFromSystem(notationObj.voiceNumber)}>
              <MdPlaylistRemove className="text-3xl" />
            </Button>
          }
          <div onClick={() => handleDownloadMIDI(notationObj)} 
               id={`midi-link-` + notationObj.voiceNumber.toString()} 
               className="px-3 py-1.5 text-slate-600 self-center">
          </div>
        </div>
        <div className="flex flex-row">
          <Staff voiceNumber={notationObj.voiceNumber} />
        </div>          
      </div>
    );
  });

  // JSX //

  return (
    <div>
      <header className="bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-between px-10 py-4">
        <p className="text-white text-xl border-white border-2 border-solid p-2 rounded">
          &#9838;ccidental
        </p>
        <div className="flex flex-row self-center">
          <Button disabled={isGenerating.current} extraStyling="mr-4 border border-2 border-white" primary rounded onClick={handleStartGenerating}>
            Generate
          </Button>
          <Button disabled={isGenerating.current} extraStyling="mr-4 border border-2 border-white" primary rounded onClick={handleStopGenerating}>
            Stop
          </Button>
          <Button disabled={isGenerating.current} extraStyling="mr-4 border border-2 border-white" primary rounded onClick={handleClearStaff}>
            Clear
          </Button>
          {/* <Button disabled={isGenerating.current} extraStyling="mr-4 border border-2 border-white" primary rounded onClick={handlePlayback}>
            Play
          </Button> */}
          <Button disabled={isGenerating.current} extraStyling="shadow border border-2 border-white" primary rounded onClick={addVoiceToSystem}>
            Add Voice
          </Button>
        </div>
      </header>
      <div className="p-8 bg-slate-100">
        <div className="flex flex-col p-4">
          {staves}
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
    </div>
  );
}