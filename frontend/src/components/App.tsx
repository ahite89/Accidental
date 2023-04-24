import React, { useState } from 'react';
import Staff from './Staff';
//import generateNotes from '';
import './App.css';

function App() {

  const [isGenerating, setIsGenerating] = useState(false);
  const handleClickGenerate = () => {
    console.log("begin generating");
    setIsGenerating(true);
    //generateNotes();
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
      {isGenerating &&
        <div>
          <p>I should only be seen if generating</p>
        </div>
      }
    </div>
  );
}

export default App;
