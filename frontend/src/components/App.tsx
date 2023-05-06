import { useEffect, useRef, useState } from 'react';
import Staff from './Staff';
import { noteProps } from '../types/note';
import { defaultNotes, noteDurationMap, MAX_BEATS_PER_BAR } from '../constants/notes';
import abcjs from "abcjs";
import * as Tone from 'tone'
import './App.scss';

export default function App() {

  const notationString = useRef<string>('X:1\nK:C\nM:4/4\nxxxx|xxxx|xxxx|xxxx|'); // empty staff
  const notesInBarCount = useRef<number>(0);  // default to zero beats
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
