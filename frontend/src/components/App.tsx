import { useEffect, useRef, useState } from 'react';
//import Staff from './Staff';
import { noteProps } from '../types/note';
import abcjs from "abcjs";
import './App.css';

export default function App() {

  const notationString = useRef<string>('X:1\nK:F\nx'); // empty staff
  const waitTimeInMilliseconds = 1000;  // temporary default value

  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    abcjs.renderAbc("staff", notationString.current);
  }, []);

  const pauseBeforeNextNote = (ms: number) => new Promise(res => setTimeout(res, ms));

  let pause: any;
  const renderNote = async (note: noteProps): Promise<void> => {
    // switch render function with pause function
      console.log(isGenerating);
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

  const shuffle = (notes: noteProps[]): noteProps[] => {
    let currentIndex = notes.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [notes[currentIndex], notes[randomIndex]] = [
        notes[randomIndex], notes[currentIndex]];
    }

    return notes;
  }

  const handleClickStop = () => {
    setIsGenerating(false);
    //console.log(isGenerating);
  }; 

  const handleClickGenerate = async (): Promise<void> => {

    // if (!isGenerating) {
    //   setIsGenerating(true);
    // }
    
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

    //shuffle(notes);

    let i = 0;
    while (i < notes.length) {
      console.log(isGenerating);
      //if (isGenerating) {
        await renderNote(notes[i]);
      // }
      // else {
      //   break;
      // }
      i++;
    }
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
        <div id="staff"></div>
      </div>
    </div>
  );
}
