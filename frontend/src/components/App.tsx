import { useEffect, useRef, useState } from 'react';
//import Staff from './Staff';
import { noteProps } from '../types/note';
import abcjs from "abcjs";
import './App.css';

export default function App() {

  const notationString = useRef<string>('X:1\nK:F\nx'); // empty staff
  const waitTimeInMilliseconds = 750;  // temporary default value

  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    abcjs.renderAbc("staff", notationString.current);
  }, []);

  const pauseBeforeNextNote = (ms: number) => new Promise(res => setTimeout(res, ms));

  let pause: any;
  const renderNoteToStaff = async (note: noteProps): Promise<void> => {
    // switch render function with pause function
      if (!isGenerating) {
        clearTimeout(pause);
      }
      else {
        pause = await pauseBeforeNextNote(note.timeBetweenNotes).then(() => {
          let noteNameDuration = note.name + note.duration;
          abcjs.renderAbc("staff", notationString.current += noteNameDuration);
          console.log(note);
        });
    }
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
      {name: 'F', duration: '1/2', timeBetweenNotes: waitTimeInMilliseconds * 0.5},
      {name: 'A', duration: '2', timeBetweenNotes: waitTimeInMilliseconds * 2},
      {name: 'c', duration: '3', timeBetweenNotes: waitTimeInMilliseconds * 3},
      {name: 'e', duration: '1|', timeBetweenNotes: waitTimeInMilliseconds * 1},
      {name: 'g', duration: '1', timeBetweenNotes: waitTimeInMilliseconds * 1},
      {name: 'e', duration: '1|', timeBetweenNotes: waitTimeInMilliseconds * 1},
      {name: 'c', duration: '3', timeBetweenNotes: waitTimeInMilliseconds * 3},
      {name: 'A', duration: '2', timeBetweenNotes: waitTimeInMilliseconds * 2},
      {name: 'F', duration: '1/2', timeBetweenNotes: waitTimeInMilliseconds * 0.5},
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
