import { useEffect } from 'react';
//import Staff from './Staff';
import abcjs from "abcjs"; 
import './App.css';

type noteProps = {
  name: string,
  duration: string,
  timeBetweenNotes: number
}

export default function App() {

  let notationString = 'X:1\nK:F\nx';
  const waitTimeInMilliseconds = 1000;

  useEffect(() => {
    abcjs.renderAbc("staff", notationString);
  }, []);

  const pauseBeforeNextNote = (milliseconds: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  const renderNote = (note: noteProps): void => {
      pauseBeforeNextNote(note.timeBetweenNotes).then(() => {
        abcjs.renderAbc("staff", notationString += note.name += note.duration);
        console.log(note);
      });
      //console.log(notationString);
  };
  
  const handleClickGenerate = (): void => {
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
    notes.forEach((note) => {
      renderNote(note);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3>
          Accidental
        </h3>      
      </header>
      <div style={{border: '1px solid gray', padding: '10px'}}>
        <button onClick={handleClickGenerate}>Generate one note at a time</button>
        <div id="staff"></div>
      </div>
    </div>
  );
}