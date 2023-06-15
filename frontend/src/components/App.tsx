import { useEffect, useRef, useState } from 'react';
import abcjs, { TuneObjectArray } from "abcjs";
import Modal from 'react-modal';
import { MdEdit, MdPlaylistRemove } from 'react-icons/md';

import Staff from './Staff';
import ControlPanel from './ControlPanel';
import Button from './parameters/Button';

import { NoteProps, PlaybackNoteData } from '../interfaces/note';
import { RandomizerParameters } from '../interfaces/controlPanel';
import { NotationData } from '../interfaces/notation';
import { getRandomizedNotes } from '../services/noteRandomizer';

import { DEFAULT_RANDOMIZER_PARAMS } from '../constants/voices';
import { instrumentMap } from '../constants/instruments';
import { MAX_BEATS_PER_BAR } from "../constants/durations";
import { DEFAULT_VOLUME } from '../constants/volume';
import { FIRST_FOUR_BARS } from '../constants/voices';
import { DEFAULT_TEMPO } from '../constants/tempo';
import * as AudioVisual from '../constants/audiovisual';

export default function App() {

  // REFS //

  // Tempo
  const activeTempo = useRef<number>(DEFAULT_TEMPO);

  // Notation
  const notationData = useRef<NotationData[]>([
    {
      voiceNumber: 1,
      randomizerParams: DEFAULT_RANDOMIZER_PARAMS,
      notationString: `X:1\nK:C\nM:4/4\nQ:1/4=${activeTempo.current.toString()}\n${FIRST_FOUR_BARS}`,
      playBackNotes: [],
      notesInBarCount: 0
    }
  ]);

  // NOTE RENDERING BUTTONS //

  const isGenerating = useRef<boolean>(false);

  const handleStopGenerating = () => {
    isGenerating.current = false;
    console.log(notationData.current);
    // Also split notation strings into note arrays?
  };

  const handleClearStaff = () => {
    for (let i = 0; i < notationData.current.length; i++) {
      if (i === 0) {
        notationData.current[i].notationString = `X:1\nK:C\nM:4/4\nQ:1/4=${activeTempo.current.toString()}\n${FIRST_FOUR_BARS}`;
      }
      else {
        notationData.current[i].notationString = `X:${i + 1}\nK:C\nM:4/4\n${FIRST_FOUR_BARS}`
      }
      staffObj = abcjs.renderAbc(`staff-${i + 1}`, notationData.current[i].notationString, AudioVisual.notationOptions);
    }
  };

  const handleStartGenerating = async (): Promise<void> => {
    isGenerating.current = true;
    notationData.current.forEach(notationObj => {
      // change name to "get correct notes based on parameters" or something
      // probably move getRandomizedNotes function into randomizeAndRender function
      // so you can access voice specific parameters
      randomizeAndRenderNotes(getRandomizedNotes(DEFAULT_RANDOMIZER_PARAMS), notationObj);
    });
  };

  const handlePlayback = (): void => {
    // Find a way to only pass the notation object in; not the generated note props
    // Loop through notation string characters
    notationData.current[0].playBackNotes.forEach(note => {
        playNote(
        {abcName: 'F', pitchNumber: note.pitchNumber, duration: note.duration, timeBetweenNotes: 1000},
        notationData.current[0]
      )
    });
  };

  // VOICES //

  const [voiceCount, setVoiceCount] = useState<number>(notationData.current.length);

  const addVoiceToSystem = (): void => {
    if (voiceCount < 4) {
      notationData.current.push(
        {
          voiceNumber: voiceCount + 1,
          randomizerParams: DEFAULT_RANDOMIZER_PARAMS,
          notationString: `X:${voiceCount + 1}\nK:C\nM:4/4\n${FIRST_FOUR_BARS}`,
          playBackNotes: [],
          notesInBarCount: 0
        }
      )
      setVoiceCount(voiceCount + 1);
    }
  };

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

  const pauseBeforeNextNote = (ms: number) => new Promise(res => setTimeout(res, ms));

  const playAndRenderNoteToStaff = async (note: NoteProps, notationObj: NotationData): Promise<void> => {
    // switch render function with pause function?
    let newNote = '', blankStaffSpaceFilled = notationObj.notationString.indexOf('x') === -1;
    
    await pauseBeforeNextNote(note.timeBetweenNotes).then(() => {
      notationObj.notesInBarCount += note.duration;
      newNote = note.abcName + note.duration.toString();
      
      if (blankStaffSpaceFilled) {
        if (notationObj.notesInBarCount === MAX_BEATS_PER_BAR) {
          newNote += '|';
          notationObj.notesInBarCount = 0;
        }

        notationObj.notationString += newNote;
      }
      else {
        // replace blank staff space until filled in with notes
        notationObj.notationString = notationObj.notationString.replace('x', newNote);
      }

      // Add notes to playback array for playback functionality
      notationObj.playBackNotes.push({pitchNumber: note.pitchNumber, duration: note.duration});

      // Play audio and add note to staff
      playNote(note, notationObj)  
      staffObj = abcjs.renderAbc(`staff-${notationObj.voiceNumber}`, notationObj.notationString, AudioVisual.notationOptions);
    });
  };

  const playNote = (note: NoteProps, notationObj: NotationData): void => {
    abcjs.synth.playEvent(
      [
        {
          "pitch": note.pitchNumber,
          "volume": notationObj.randomizerParams.volumeSelection,
          "start": 0,
          "duration": note.duration,
          "instrument": instrumentMap[notationObj.randomizerParams.instrumentSelection],
          "gap": 0
        },
      ], [], 1000 // a measure takes one second.    
    )
  }

  const randomizeAndRenderNotes = async (notes: NoteProps[], notationObj: NotationData): Promise<void> => {
    let currentIndex = notes.length,  randomIndex: number;

    while (isGenerating.current) {
      if (!isGenerating.current) {
        break;
      }
      randomIndex = Math.floor(Math.random() * currentIndex);
      await playAndRenderNoteToStaff(notes[randomIndex], notationObj);
    }
  };

  useEffect(() => {
    // useRef to update key/scale label?
  }, [targetVoice]);

  // Save control panel changes for targeted voice
  const handleUpdateStaff = (controlPanelParams: RandomizerParameters, selectedVoiceNumber: number): void => {
    debugger
    targetVoice = notationData.current.find(notationObj => notationObj.voiceNumber === selectedVoiceNumber);
    if (targetVoice) {
      targetVoice.notationString = `X:${targetVoice.voiceNumber}\nK:${controlPanelParams.keySelection}\nM:4/4\nQ:1/4=${controlPanelParams.tempoSelection}\n${FIRST_FOUR_BARS}`;
      targetVoice.randomizerParams = controlPanelParams;
      abcjs.renderAbc(`staff-${targetVoice.voiceNumber}`, targetVoice.notationString, AudioVisual.notationOptions);
    }
    setOpenControlPanel(false);
  };

  // CONTROLS MODAL //

  const [openControlPanel, setOpenControlPanel] = useState<boolean>(false);
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

    const staffDescription = `${notationObj.randomizerParams.instrumentSelection} in
    ${notationObj.randomizerParams.keySelection} ${notationObj.randomizerParams.scaleSelection}`

    return (
      <div key={notationObj.voiceNumber} className="flex flex-col justify-center pb-3">
        <div className="flex flex-row">
          <p className="border border-cyan-500 bg-cyan-500 px-3 py-2 text-white">Voice {notationObj.voiceNumber}</p>
          <p className="px-3 py-2 text-slate-600">{staffDescription}</p>
          <Button disabled={isGenerating.current} outline onClick={() => setOpenControlPanel(true)}>
            <MdEdit className="text-2xl"/>
          </Button>
          {notationObj.voiceNumber !== 1 &&
            <Button disabled={isGenerating.current} outline onClick={() => removeVoiceFromSystem(notationObj.voiceNumber)}>
              <MdPlaylistRemove className="text-3xl" />
            </Button>
          }
        </div>
        <div className="flex flex-row">
          <Staff voiceNumber={notationObj.voiceNumber} />
        </div>
        <Modal isOpen={openControlPanel} style={modalStyling} ariaHideApp={false}>
          <ControlPanel 
            onSubmit={handleUpdateStaff} 
            voiceNumber={notationObj.voiceNumber}
            randomizerParameters={notationObj.randomizerParams}
            handleCloseControlPanel={handleCloseControlPanel}
          />
        </Modal>
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
          <Button disabled={isGenerating.current} extraStyling="mr-4 border border-2 border-white" primary rounded onClick={handlePlayback}>
            Play
          </Button>
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
    </div>
  );
}