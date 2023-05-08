import { useEffect, useRef, useState } from 'react';
import Staff from './Staff';
import { noteProps } from '../types/note';
import { CursorControl } from '../services/cursorcontrol';
import { defaultNotes, noteDurationMap, MAX_BEATS_PER_BAR } from '../constants/notes';
import abcjs, { TuneObjectArray } from "abcjs";
import './App.scss';

export default function App() {

  const notationString = useRef<string>('X:1\nK:C\nM:4/4\nABCD|CFGE|BFED|AGCF|'); // empty staff
  const notesInBarCount = useRef<number>(0);  // default to zero beats

  const [isGenerating, setIsGenerating] = useState(true);
  const synth = new abcjs.synth.CreateSynth();
  const cursorControl = new CursorControl(2, 4, null);
  const synthControl = new abcjs.synth.SynthController();
  const audioContext = new AudioContext();
  const abcOptions = { add_classes: true };
  const audioParams = { chordsOff: true };
  let staffObj: TuneObjectArray;

  useEffect(() => {

    if (abcjs.synth.supportsAudio()) {
      
      synthControl.load("#audio",
          cursorControl,
          {
            displayLoop: true, 
            displayRestart: true, 
            displayPlay: true, 
            displayProgress: true, 
            displayWarp: true
          }
      );

      staffObj = abcjs.renderAbc("staff", notationString.current, abcOptions);
      synth.init({ 
        audioContext: audioContext,
        visualObj: staffObj[0] ,
        millisecondsPerMeasure: 500,
        options: {
          pan: [ -0.3, 0.3 ]
        }
      }).then(() => {
          synthControl.setTune(staffObj[0], false, audioParams).then(function () {
            console.log("Audio successfully loaded.")
        }).catch((error) => {
            console.warn("Audio problem:", error);
        });
      }).catch((error) => {
          console.warn("Audio problem:", error);
      });
    } 
  }, []);

  const pauseBeforeNextNote = (ms: number) => new Promise(res => setTimeout(res, ms));

  const renderNoteToStaff = async (note: noteProps): Promise<void> => {
    // switch render function with pause function?
    let barLine = '', noteNameDuration = '';
    let blankStaffSpaceExists = notationString.current.indexOf('x') !== -1;
    
    await pauseBeforeNextNote(note.timeBetweenNotes).then(() => {
      notesInBarCount.current += note.duration;
      if (notesInBarCount.current === MAX_BEATS_PER_BAR && !blankStaffSpaceExists) {
        barLine = '|';
        notesInBarCount.current = 0;  // reset notes per bar count
      }
      
      noteNameDuration = note.name + note.duration.toString() + barLine;
      if (!blankStaffSpaceExists) {
        notationString.current += noteNameDuration;
      }
      else {
        // replace blank staff space until filled in with notes
        notationString.current = notationString.current.replace('x', noteNameDuration); 
      }

      // For instance, a quarter note in 4/4 would be .25
      abcjs.synth.playEvent(
        [
          {"pitch": note.pitchNumber,"volume": 75,"start": 0,"duration": note.duration,"instrument": 23,"gap": 0},
        ], undefined, 2000 // a measure takes one second.    
      ).then(() => {
          staffObj = abcjs.renderAbc("staff", notationString.current);
          console.log(note);
      });
    });

    synthControl.setTune(staffObj[0], false, audioParams);
  };

  const randomizeAndRenderNotes = async (notes: noteProps[]): Promise<void> => {
    let currentIndex = notes.length,  randomIndex;

    while (isGenerating) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      await renderNoteToStaff(notes[randomIndex]);
    }
  }

  const handleClickStop = () => {
    setIsGenerating(false);
  }; 

  const handleClickGenerate = async (): Promise<void> => {
    setIsGenerating(true);
    await randomizeAndRenderNotes(defaultNotes);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Accidental</h2>
      </header>
      <div className="p-8">
        <button onClick={handleClickGenerate}>Start</button>
        <button onClick={handleClickStop}>Stop</button>
        <Staff />
      </div>
    </div>
  );
}
