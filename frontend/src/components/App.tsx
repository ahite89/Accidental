import { useEffect, useState, useRef } from 'react';
import Staff from './Staff';
import { generateNotes } from '../services/vexflow/generateNotes';
import Vex from 'vexflow';
import './App.css';

export default function App() {

  // Create references to stave and its context
  const contextRef = useRef<Vex.RenderContext | null>(null);
  const staveRef = useRef<Vex.Stave | null>(null);

  useEffect(() => {
    // Create stave context
    const { Renderer, Stave } = Vex.Flow;

    const staff = document.getElementById("staff") as HTMLDivElement;
    const renderer = new Renderer(staff, Renderer.Backends.SVG);
    const context = renderer.getContext();

    // Create stave
    const stave = new Stave(10, 0, 300);
    stave.addClef("treble").addTimeSignature("4/4");
    stave.setContext(context);
    stave.draw();
  
    // Set current values of ref objects
    staveRef.current = stave;
    contextRef.current = context;
  }, []);

  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleClickGenerate = () => {
    setIsGenerating(true);
    console.log(isGenerating);
    // maybe while is generating here?
    generateNotes(staveRef.current, contextRef.current, isGenerating);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Accidental
        </p>      
      </header>
      <div>
        <h2>Generate</h2>
      </div>
      <div>
        {!isGenerating && <button onClick={handleClickGenerate}>Start</button>}
        {isGenerating && <button onClick={() => setIsGenerating(false)}>Stop</button>}
      </div>
      <div>
        <Staff />
      </div>
    </div>
  );
}