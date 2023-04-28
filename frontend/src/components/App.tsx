import { useEffect } from 'react';
//import Staff from './Staff';
import abcjs from "abcjs"; 
import './App.css';

type noteProps = {
  name: string,
  timeBetweenNotes: number
}

export default function App() {

  let notationString = 'X:1\nK:F\nx';

  useEffect(() => {
    abcjs.renderAbc("staff", notationString);
  }, []);

  const pauseBeforeNextNote = (milliseconds: number) => {
    new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  const renderNote = async (note: noteProps): Promise<void> => {
    await pauseBeforeNextNote(note.timeBetweenNotes);
    abcjs.renderAbc("staff", notationString += note.name);
    console.log(notationString);
    console.log(note);
  }
  
  const handleClickGenerate = (): void => {
    const notes: noteProps[] = [
      {name: 'F', timeBetweenNotes: 2000},
      {name: 'A', timeBetweenNotes: 1000},
      {name: 'c', timeBetweenNotes: 4000},
      {name: 'e', timeBetweenNotes: 1000}
    ]
    
    notes.forEach((note) => {
      renderNote(note)
    }) 
  }

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