import { useEffect, useState } from 'react';
import Staff from './Staff';
import { generateNotes } from '../services/vexflow/generateNotes';
import Vex from 'vexflow';
import './App.css';

function App() {

  // USE useRef
  let stave: Vex.Stave;
  let context: Vex.RenderContext;

  useEffect(() => {
      const { Renderer, Stave } = Vex.Flow;

      const canvas = document.getElementById("staff") as HTMLCanvasElement;
      const renderer = new Renderer(canvas, Renderer.Backends.SVG);
      context = renderer.getContext();

      stave = new Stave(10, 0, 300);
      stave.addClef("treble").addTimeSignature("4/4");
      stave.setContext(context).draw();
  }, []);

  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleClickGenerate = () => {
    setIsGenerating(true);
    generateNotes(stave, context);
    console.log(stave);
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
      <Staff />
    </div>
  );
}

export default App;
