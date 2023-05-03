import { useEffect, useRef, useState } from 'react';
//import Staff from './Staff';
import { noteProps } from '../types/note';
import abcjs from "abcjs";
import * as Tone from 'tone'
import './App.css';

export default function App() {

  const notationString = useRef<string>('X:1\nK:F\nx'); // empty staff
  const waitTimeInMilliseconds = 250;  // temporary default value

  const [isGenerating, setIsGenerating] = useState(true);
  const synth = new Tone.AMSynth().toDestination();

  useEffect(() => {
    abcjs.renderAbc("staff", notationString.current);
  }, []);

  const pauseBeforeNextNote = (ms: number) => new Promise(res => setTimeout(res, ms));

  const noteDurationMap: Record<string, string> = {
    '1': '8n',
    '2': '4n',
    '3': '4n.',
    '4': '2n'
  }

  const renderNoteToStaff = async (note: noteProps): Promise<void> => {
    // switch render function with pause function?
    await pauseBeforeNextNote(note.timeBetweenNotes).then(() => {
      let noteNameDuration = note.name + note.duration;
      abcjs.renderAbc("staff", notationString.current += noteNameDuration);
      
      // Subdivisions = "1m" | "1n" | "1n." | "2n" | "2n." | "2t" | "4n" | "4n." | "4t" | "8n" | "8n." | "8t" |
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
 
    const notes: noteProps[] = [
      {name: 'F', duration: '1', timeBetweenNotes: waitTimeInMilliseconds * 1},
      {name: 'G', duration: '2', timeBetweenNotes: waitTimeInMilliseconds * 2},
      {name: 'A', duration: '3', timeBetweenNotes: waitTimeInMilliseconds * 3},
      {name: 'B', duration: '1', timeBetweenNotes: waitTimeInMilliseconds * 1},
      {name: 'C', duration: '1', timeBetweenNotes: waitTimeInMilliseconds * 1},
      {name: 'D', duration: '1', timeBetweenNotes: waitTimeInMilliseconds * 1},
      {name: 'E', duration: '3', timeBetweenNotes: waitTimeInMilliseconds * 3},
    ]

    await randomizeAndRenderNotes(notes);
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
        <div className='staff-container'>
          <div id="staff"></div>
        </div>
      </div>
    </div>
  );
}
