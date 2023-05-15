import { useEffect, useRef, useState } from 'react';
import Staff from './Staff';
import { NoteProps } from '../types/note';
import { CursorControl } from '../services/cursorcontrol';
import { defaultNotes, noteDurationMap, MAX_BEATS_PER_BAR } from '../constants/notes';
import abcjs, { AbcVisualParams, TuneObjectArray } from "abcjs";
import ControlPanel from './ControlPanel';
import Playback from './Playback';
import Button from './parameters/Button';

export default function App() {

  const notationString = useRef<string>(`X:1\nK:C\nM:4/4\nQ:1/4=120\nxxxx|xxxx|xxxx|xxxx|`); // empty staff
  const notesInBarCount = useRef<number>(0);  // default to zero beats

  const [isGenerating, setIsGenerating] = useState(true);
  
  // abc inits
  let staffObj: TuneObjectArray;
  const synth = new abcjs.synth.CreateSynth();
  const cursorControl = new CursorControl(2, 4, null);
  const synthControl = new abcjs.synth.SynthController();
  const audioContext = new AudioContext();
  const notationOptions: AbcVisualParams = { 
    add_classes: true, 
    wrap: { 
      minSpacing: 1.8,
      maxSpacing: 2.7,
      preferredMeasuresPerLine: 4
    }, 
    viewportHorizontal: true,
    staffwidth: 800,
    scrollHorizontal: true 
  };
  const audioParams: AbcVisualParams = { 
    clickListener: () => {console.log("clicked!")} 
  };

  useEffect(() => {
    if (abcjs.synth.supportsAudio()) {     
      synthControl.load("#audio",
          cursorControl,
          {
            displayLoop: true, 
            displayRestart: true, 
            displayPlay: true, 
            displayProgress: true, 
          }
      );

      staffObj = abcjs.renderAbc("staff", notationString.current, notationOptions);
      synth.init({ 
        audioContext: audioContext,
        visualObj: staffObj[0] ,
        millisecondsPerMeasure: 1000,
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

  const renderNoteToStaff = async (note: NoteProps): Promise<void> => {
    // switch render function with pause function?
    let newNote = '';
    let blankStaffSpaceFilled = notationString.current.indexOf('x') === -1;
    
    await pauseBeforeNextNote(note.timeBetweenNotes).then(() => {
      notesInBarCount.current += note.duration;
      newNote = note.name + note.duration.toString();
      
      if (blankStaffSpaceFilled) {
        if (notesInBarCount.current >= MAX_BEATS_PER_BAR) {
          newNote += '|';
          notesInBarCount.current = 0;
        }

        notationString.current += newNote;
      }
      else {
        // replace blank staff space until filled in with notes
        notationString.current = notationString.current.replace('x', newNote); 
      }

      // For instance, a quarter note in 4/4 would be .25
      abcjs.synth.playEvent(
        [
          {"pitch": note.pitchNumber,"volume": 75,"start": 0,"duration": note.duration,"instrument": 1,"gap": 0},
        ], undefined, 1000 // a measure takes one second.    
      ).then(() => {
          staffObj = abcjs.renderAbc("staff", notationString.current);
          console.log(note);
      });
    });
  };

  const randomizeAndRenderNotes = async (notes: NoteProps[]): Promise<void> => {
    let currentIndex = notes.length,  randomIndex: number;

    let i = 0;
    while (i < 16) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      await renderNoteToStaff(notes[randomIndex]);
      i++;
    }

    synthControl.setTune(staffObj[0], true, audioParams);
  }

  const handleClickStop = () => {
    setIsGenerating(false);
  }; 

  const handleClickGenerate = async (): Promise<void> => {
    setIsGenerating(true);
    await randomizeAndRenderNotes(defaultNotes);
  };

  return (
    <div>
      <header className="bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-start p-4">
        <p className="text-white text-xl border-white border-2 border-solid p-2 rounded">
        &#9838;ccidental
        </p>
      </header>
      <div className="p-8 bg-slate-100">
        <div className="flex justify-center">
          <Button extraStyling="mr-4 shadow" primary rounded onClick={handleClickGenerate}>
            Generate
          </Button>
          <Button extraStyling="shadow" secondary rounded onClick={handleClickStop}>
            Stop
          </Button>
        </div>
        <Staff />
        <Playback />
        <ControlPanel /> 
      </div>
    </div>
  );
}
