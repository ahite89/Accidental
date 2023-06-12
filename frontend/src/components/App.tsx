import { useEffect, useRef, useState } from 'react';
import abcjs, { TuneObjectArray } from "abcjs";
import className from 'classnames';
import Modal from 'react-modal';

import Staff from './Staff';
import ControlPanel from './ControlPanel';
import Playback from './Playback';
import Button from './parameters/Button';

import { NoteProps, PlaybackNoteData } from '../interfaces/note';
import { RandomizerParameters, DEFAULT_RANDOMIZER_PARAMS } from '../interfaces/controlPanel';
import { NotationData } from '../interfaces/notation';
import { getRandomizedNotes } from '../services/noteRandomizer';

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
      volume: DEFAULT_VOLUME,
      notesInBarCount: 0
    }
  ]);

  // NOTE RENDERING BUTTONS //

  const stopRendering = useRef<boolean>(false);

  const handleStopGenerating = () => {
    stopRendering.current = true;
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
    // Need to disable everything but 'Stop' during generation
    stopRendering.current = false;
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

  const [voiceCount, setVoiceCount] = useState<number>(1);  // state used for iterative staff rendering

  const addVoiceToSystem = (): void => {
    if (voiceCount < 4) {
      notationData.current.push(
        {
          voiceNumber: voiceCount + 1,
          randomizerParams: DEFAULT_RANDOMIZER_PARAMS,
          notationString: `X:${voiceCount + 1}\nK:C\nM:4/4\n${FIRST_FOUR_BARS}`,
          playBackNotes: [],
          volume: DEFAULT_VOLUME,
          notesInBarCount: 0
        }
      )
      setVoiceCount(voiceCount + 1);
    }
  };

  const removeVoiceFromSystem = (): void => {
    if (voiceCount > 1) {
      notationData.current.pop();
      setVoiceCount(voiceCount - 1);
    }
  };

  // INITIALIZE SYNTH AND STAFF //

  let staffObj: TuneObjectArray;

  useEffect(() => {   
    // need to remove element from dom when applicable
    // re-run when any of the big voice objects has changed
    for (let i = 1; i < voiceCount + 1; i++) {
      staffObj = abcjs.renderAbc(`staff-${i}`, notationData.current[i - 1].notationString, AudioVisual.notationOptions);
    }   // re-initialize synth when params are changed 
  }, [activeTempo.current, voiceCount, stopRendering.current]);

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
          "volume": notationObj.volume,
          "start": 0,
          "duration": note.duration,
          "instrument": instrumentMap[notationObj.randomizerParams.instrumentSelection],
          "gap": 0
        },
      ], [], 1000 // a measure takes one second.    
    )
  }


  // IDEA:
  // CONTROL PANEL HAS ALL THE STATES FOR THE PARAMETERS. IT HAS AN ONSUBMIT FUNCTION FOR THE SAVE
  // PARAMETERS BUTTON. AT THAT POINT A PARAMETERS OBJECT IS CREATED FROM ALL THE STATE UPDATES AND
  // PASSED BACK TO APP.TSX WHERE ITS PROPERTIES ARE ASSIGNED TO THE NOTATION STRING AND ELSEWHERE FOR
  // THAT SPECIFIC VOICE (INSIDE OF NOTATION DATA ARRAY)


  const randomizeAndRenderNotes = async (notes: NoteProps[], notationObj: NotationData): Promise<void> => {
    let currentIndex = notes.length,  randomIndex: number;

    while (!stopRendering.current) {
      if (stopRendering.current) {
        break;
      }
      randomIndex = Math.floor(Math.random() * currentIndex);
      await playAndRenderNoteToStaff(notes[randomIndex], notationObj);
    }
  };

  // Save control panel changes (check to see if there's a difference first?)
  const handleUpdateStaff = (): void => {

    // Update notation string

    setOpenControlPanel(false);
  };

  // CONTROLS MODAL //

  const [openControlPanel, setOpenControlPanel] = useState<boolean>(false);

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

  const staffStyling = className("flex flex-row justify-center");

  return (
    <div>
      <header className="bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-start px-10 py-4">
        <p className="text-white text-xl border-white border-2 border-solid p-2 rounded">
          &#9838;ccidental
        </p>
      </header>
      <div className="p-8 bg-slate-100">
        <div className="flex justify-center mb-8">
          <Button extraStyling="mr-4 shadow" primary rounded onClick={handleStartGenerating}>
            Generate
          </Button>
          <Button extraStyling="mr-4 shadow" secondary rounded onClick={handleStopGenerating}>
            Stop
          </Button>
          <Button extraStyling="mr-4 shadow" save rounded onClick={handleClearStaff}>
            Clear
          </Button>
          <Button extraStyling="shadow" outline onClick={handlePlayback}>
            Play
          </Button>
        </div>
        <div className="flex flex-col p-4">
          <div className={staffStyling}>
            <Button extraStyling="bg-blue-200" onClick={() => setOpenControlPanel(true)}>Voice 1</Button>
            <Staff voiceNumber={1} />
          </div>
          {voiceCount > 1 &&
            <div className={staffStyling}>
              <Button extraStyling="bg-green-200" onClick={() => setOpenControlPanel(true)}>Voice 2</Button>
              <Staff voiceNumber={2} />
            </div>
          }
          {voiceCount > 2 &&
            <div className={staffStyling}>
              <Button extraStyling="bg-orange-200" onClick={() => setOpenControlPanel(true)}>Voice 3</Button>
              <Staff voiceNumber={3} />
            </div>
          }
          {voiceCount > 3 &&
            <div className={staffStyling}>
              <Button extraStyling="bg-purple-200" onClick={() => setOpenControlPanel(true)}>Voice 4</Button>
              <Staff voiceNumber={4} />
            </div>
          }
        </div>
        <div className="flex justify-center my-4">
          <Button extraStyling="mr-4" outline onClick={addVoiceToSystem}>Add Voice</Button>
          <Button outline onClick={removeVoiceFromSystem}>Remove Voice</Button>
        </div>
        <Playback />
        <Modal
          isOpen={openControlPanel}
          ariaHideApp={false}
          style={modalStyling}
        >
          <ControlPanel randomizerParameters={DEFAULT_RANDOMIZER_PARAMS} />
          <div className="flex justify-center mb-4">
            <Button save extraStyling="mr-4" onClick={handleUpdateStaff}>Save Changes</Button>
            <Button secondary onClick={() => setOpenControlPanel(false)}>Cancel</Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}