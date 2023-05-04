import { useEffect, useRef, useState } from 'react';
import Staff from './Staff';
import { noteProps } from '../types/note';
import { defaultNotes, noteDurationMap } from '../constants/notes';
import abcjs from "abcjs";
import * as Tone from 'tone'
import './App.scss';

export default function App() {

  const notationString = useRef<string>('X:1\nK:C\nx'); // empty staff
  const noteDurationCount = useRef<number>(0);  // default to zero beats
  const maxBeatsPerBar = 8;
  //const waitTimeInMilliseconds = 250;  // temporary default value

  const [isGenerating, setIsGenerating] = useState(true);
  const synth = new Tone.AMSynth().toDestination();   // default synth sound

  useEffect(() => {
    abcjs.renderAbc("staff", notationString.current);
  }, []);

  const pauseBeforeNextNote = (ms: number) => new Promise(res => setTimeout(res, ms));

  const renderNoteToStaff = async (note: noteProps): Promise<void> => {
    // switch render function with pause function?
    let barLine = '', noteNameDuration = '';
    await pauseBeforeNextNote(note.timeBetweenNotes).then(() => {
      noteDurationCount.current += note.duration;
      if (noteDurationCount.current == maxBeatsPerBar) {
        barLine = '|';
        noteDurationCount.current = 0;
      }
      noteNameDuration = note.name + note.duration.toString() + barLine;
      abcjs.renderAbc("staff", notationString.current += noteNameDuration);
      
      // Tone.js subdivisions = "1m" | "1n" | "1n." | "2n" | "2n." | "2t" | "4n" | "4n." | "4t" | "8n" | "8n." | "8t" |
      // "16n" | "16n." | "16t" | "32n" | "32n." | "32t" | "64n" | "64n." | "64t" | "128n" | "128n." | "128t" |
      synth.triggerAttackRelease(`${note.name}4`, noteDurationMap[note.duration]);
      
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
        <h3>
          Accidental
        </h3>
      </header>
      <div style={{border: '1px solid gray', padding: '10px'}}>
        <button onClick={handleClickGenerate}>Start Generating</button>
        <button onClick={handleClickStop}>Stop Generating</button>
        <Staff />
      </div>
    </div>
  );
}
