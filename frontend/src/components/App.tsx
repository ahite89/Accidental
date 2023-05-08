import { useEffect, useRef, useState } from 'react';
import Staff from './Staff';
import { noteProps } from '../types/note';
import { defaultNotes, noteDurationMap, MAX_BEATS_PER_BAR } from '../constants/notes';
import abcjs from "abcjs";
import * as Tone from 'tone'
import './App.scss';

export default function App() {

  // class Greeter {
  //   greeting: string;
   
  //   constructor(message: string) {
  //     this.greeting = message;
  //   }
   
  //   greet() {
  //     return "Hello, " + this.greeting;
  //   }
  // }

  class CursorControl {
    beatNumber: number;
    beatSubdivisions: number;
    event: any;

    constructor(beatNumber: number, beatSubdivisions: number, event: any) {
      this.beatNumber = beatNumber;
      this.beatSubdivisions = beatSubdivisions;
      this.event = event;
    }
    
    onStart() {
      console.log("The tune has started playing.");
    }

    onFinished() {
      console.log("The tune has stopped playing.");
    }

    onBeat() {
      console.log("Beat " + this.beatNumber + " is happening.");
    }
    
    onEvent() {
      console.log("An event is happening", this.event);
    }
  };

  const notationString = useRef<string>('X:1\nK:C\nM:4/4\nxxxx|xxxx|xxxx|xxxx|'); // empty staff
  const notesInBarCount = useRef<number>(0);  // default to zero beats
  //const waitTimeInMilliseconds = 250;  // temporary default value

  const [isGenerating, setIsGenerating] = useState(true);
  //const synth = new Tone.AMSynth().toDestination();   // default synth sound
  const synth = new abcjs.synth.CreateSynth();

  useEffect(() => {
    //abcjs.renderAbc("staff", notationString.current);

    // given that there are two elements in the DOM with the IDs "paper" and "audio"
    const abcOptions = { add_classes: true };
    const audioParams = { chordsOff: true };

    if (abcjs.synth.supportsAudio()) {
      
      var cursorControl = new CursorControl(2, 4, null);
      const synthControl = new abcjs.synth.SynthController();
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

      const audioContext = new AudioContext();
      const staffObj = abcjs.renderAbc("staff", notationString.current, abcOptions);
      synth.init({ 
        audioContext: audioContext,
        visualObj: staffObj[0] ,
        millisecondsPerMeasure: 500,
        options: {
          soundFontUrl: "https:/path/to/soundfont/folder",
          pan: [ -0.3, 0.3 ] 
        }
      }).then(function () {
          synthControl.setTune(staffObj[0], false, audioParams).then(function () {
          console.log("Audio successfully loaded.")
        }).catch(function (error) {
          console.warn("Audio problem:", error);
        });
      }).catch(function (error) {
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
      //notationString.current += noteNameDuration;
      abcjs.renderAbc("staff", notationString.current);
      //synth.start();
      abcjs.synth.playEvent(
        [   // a C chord
          {"pitch":note.pitchNumber,"volume":75,"start":0,"duration":note.duration,"instrument":0,"gap":0},
        ],
        [],
          1000 // a measure takes one second.    
      )
      // Tone.js subdivisions = "1m" | "1n" | "1n." | "2n" | "2n." | "2t" | "4n" | "4n." | "4t" | "8n" | "8n." | "8t" |
      // "16n" | "16n." | "16t" | "32n" | "32n." | "32t" | "64n" | "64n." | "64t" | "128n" | "128n." | "128t" |
      //synth.triggerAttackRelease(`${note.name}4`, noteDurationMap[note.duration]);
      
      console.log(note);
    });
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
