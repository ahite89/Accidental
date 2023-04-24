import { useEffect, useState } from 'react';
import Staff from './Staff';
import { generateStaff } from '../services/vexflow/generateNotes';
import './App.css';

function App() {

  useEffect(() => {
    generateStaff();
  }, []);

  const [isGenerating, setIsGenerating] = useState(false);
  const handleClickGenerate = () => {
    console.log("begin generating");
    setIsGenerating(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Accidental
        </p>      
      </header>
      <div>        
        <Staff onClickGenerate={handleClickGenerate} />
      </div>
      {isGenerating && <p>Notes are being generated</p>}
        <div id="staff"></div>
    </div>
  );
}

export default App;
