import { useEffect, useRef } from 'react';
//import Staff from './Staff';
import { noteProps } from '../types/note';
import abcjs from "abcjs";
import './App.css';

export default function App() {

  const notationString = useRef<string>('X:1\nK:F\nx'); // empty staff
  const waitTimeInMilliseconds = 1000;  // temporary default value

  useEffect(() => {
    abcjs.renderAbc("staff", notationString.current);
  }, []);

  const pauseBeforeNextNote = (ms: number) => new Promise(res => setTimeout(res, ms));

  const renderNote = async (note: noteProps): Promise<void> => {
      await pauseBeforeNextNote(note.timeBetweenNotes).then(() => {
        let noteNameDuration = note.name + note.duration;
        abcjs.renderAbc("staff", notationString.current += noteNameDuration);
        console.log(note);
      });
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

  const handleClickGenerate = async (): Promise<void> => {
    // This doesn't work if the wait times aren't ascending...
    // The rendered notes end up being out of order
    // It's clearly a sleep/async/promise issue
    // Incorrect output from below:
    // {name: 'F1/2', duration: '1/2', timeBetweenNotes: 500}
    // {name: 'c2', duration: '2', timeBetweenNotes: 1000}
    // {name: 'e4|', duration: '4|', timeBetweenNotes: 2000}
    // {name: 'A1', duration: '1', timeBetweenNotes: 4000}

    const notes: noteProps[] = [
      {name: 'F', duration: '1/2', timeBetweenNotes: waitTimeInMilliseconds * 0.5},
      {name: 'A', duration: '1', timeBetweenNotes: waitTimeInMilliseconds * 4},
      {name: 'c', duration: '2', timeBetweenNotes: waitTimeInMilliseconds * 1},
      {name: 'e', duration: '4|', timeBetweenNotes: waitTimeInMilliseconds * 2},
    ]

    shuffle(notes);

    let i = 0;
    do {
      await renderNote(notes[i]);
      i++;
    } while (i < 4);
    // notes.forEach((note) => {
    //   pauseBeforeNextNote(note.timeBetweenNotes).then(() => {
    //     renderNote(note);
    //   });
    // });
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
        <button onClick={handleClickGenerate}>Stop Generating</button>
        <div id="staff"></div>
      </div>
    </div>
  );
}
