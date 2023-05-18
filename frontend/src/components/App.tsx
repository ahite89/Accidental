import { useEffect, useRef, useState } from 'react';
import Staff from './Staff';
import { NoteProps } from '../types/note';
import { CursorControl } from '../services/cursorcontrol';
import { defaultNotes, MAX_BEATS_PER_BAR } from '../constants/notes';
import { keyOptions } from '../constants/keys';
import { instrumentOptions } from '../constants/instruments';
import { scaleOptions } from '../constants/scales';
import { instrumentMap } from '../constants/maps';
import abcjs, { AbcVisualParams, TuneObjectArray, SynthOptions } from "abcjs";
import ControlPanel from './ControlPanel';
import Playback from './Playback';
import Button from './parameters/Button';

export default function App() {

  const startingKey = useRef<string>("K:C");
  const activeInstrument = useRef<number>(0);
  const notationString = useRef<string>(`X:1\n${startingKey.current}\nM:4/4\nQ:1/4=120\nxxxx|xxxx|xxxx|xxxx|`); // empty staff
  const notesInBarCount = useRef<number>(0);  // default to zero beats

  const [isGenerating, setIsGenerating] = useState(true);
  
  // abc inits
  let staffObj: TuneObjectArray;
  const synth = new abcjs.synth.CreateSynth();
  const cursorControl = new CursorControl(2, 4, null);
  const synthControl = new abcjs.synth.SynthController();
  const audioContext = new AudioContext();
  const notationOptions: AbcVisualParams = { 
    add_classes: true, 
    wrap: { 
      minSpacing: 1.8,
      maxSpacing: 2.7,
      preferredMeasuresPerLine: 4
    }, 
    viewportHorizontal: true,
    staffwidth: 800,
    scrollHorizontal: true 
  };

  useEffect(() => {
    if (abcjs.synth.supportsAudio()) {     
      synthControl.load("#audio",
          cursorControl,
          {
            displayLoop: true, 
            displayRestart: true, 
            displayPlay: true, 
            displayProgress: true, 
          }
      );
      console.log(activeInstrument.current);
      staffObj = abcjs.renderAbc("staff", notationString.current, notationOptions);
      synth.init({ 
        audioContext: audioContext,
        visualObj: staffObj[0],
        millisecondsPerMeasure: 500,   // make dynamic or remove?
        options: {
          pan: [ -0.3, 0.3 ],
          program: activeInstrument.current  // why no work?
        }
      }).then(() => {
          synthControl.setTune(staffObj[0], false).then(function () {
            console.log("Audio successfully loaded.")
        }).catch((error) => {
            console.warn("Audio problem:", error);
        });
      }).catch((error) => {
          console.warn("Audio problem:", error);
      });
    } 
  }, [activeInstrument.current]);

  const pauseBeforeNextNote = (ms: number) => new Promise(res => setTimeout(res, ms));

  const renderNoteToStaff = async (note: NoteProps): Promise<void> => {
    // switch render function with pause function?
    let newNote = '';
    let blankStaffSpaceFilled = notationString.current.indexOf('x') === -1;
    
    await pauseBeforeNextNote(note.timeBetweenNotes).then(() => {
      notesInBarCount.current += note.duration;
      newNote = note.name + note.duration.toString();
      
      if (blankStaffSpaceFilled) {
        if (notesInBarCount.current >= MAX_BEATS_PER_BAR) {
          newNote += '|';
          notesInBarCount.current = 0;
        }

        notationString.current += newNote;
      }
      else {
        // replace blank staff space until filled in with notes
        notationString.current = notationString.current.replace('x', newNote); 
      }

      // quarter note in 4/4 would be .25
      abcjs.synth.playEvent(
        [
          {
            "pitch": note.pitchNumber,
            "volume": 75,
            "start": 0,
            "duration": note.duration,
            "instrument": activeInstrument.current,
            "gap": 0
          },
        ], [], 1000 // a measure takes one second.    
      ).then(() => {
          staffObj = abcjs.renderAbc("staff", notationString.current);
          console.log(note);
      });
    });
  };

  const randomizeAndRenderNotes = async (notes: NoteProps[]): Promise<void> => {
    let currentIndex = notes.length,  randomIndex: number;

    let i = 0;
    while (i < 10) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      await renderNoteToStaff(notes[randomIndex]);
      i++;
    }

    synthControl.setTune(staffObj[0], true);
  }

  const handleClickStop = () => {
    setIsGenerating(false);
  }; 

  const handleClickGenerate = async (): Promise<void> => {
    setIsGenerating(true);
    await randomizeAndRenderNotes(defaultNotes);
  };

  // CONTROL PANEL PARAMETERS

  // Key
  const [keySelection, setKeySelection] = useState<string>(keyOptions()[0].value);

  const handleKeySelection = (key: string): void => {
    setKeySelection(key);
    notationString.current = notationString.current.replace(startingKey.current, `K:${key}`);
    startingKey.current = `K:${key}`;
  };

  // Scales
  const [scaleSelection, setScaleSelection] = useState<string>(scaleOptions()[0].value);

  const handleScaleSelection = (scale: string): void => {
      setScaleSelection(scale);
  };

  // Instrument
  const [instrumentSelection, setInstrumentSelection] = useState<string>(instrumentOptions()[0].value);
  
  const handleInstrumentSelection = (instrument: string): void => {
    setInstrumentSelection(instrument);
    activeInstrument.current = instrumentMap[instrument];
  };

  // Save changes
  const handleUpdateStaff = (): void => {
    abcjs.renderAbc("staff", notationString.current);
  };

  return (
    <div>
      <header className="bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-start px-10 py-4">
        <p className="text-white text-xl border-white border-2 border-solid p-2 rounded">
          &#9838;ccidental
        </p>
      </header>
      <div className="p-8 bg-slate-100">
        <div className="flex justify-center">
          <Button extraStyling="mr-4 shadow" primary rounded onClick={handleClickGenerate}>
            Generate
          </Button>
          <Button extraStyling="shadow" secondary rounded onClick={handleClickStop}>
            Stop
          </Button>
        </div>
        <Staff />
        <Playback />
        <ControlPanel 
          keySelection={keySelection} 
          scaleSelection={scaleSelection}
          instrumentSelection={instrumentSelection}
          handleKeySelection={handleKeySelection}
          handleScaleSelection={handleScaleSelection}
          handleInstrumentSelection={handleInstrumentSelection} 
          handleUpdateStaff={handleUpdateStaff}
        /> 
      </div>
    </div>
  );
}
