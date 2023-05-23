import { useEffect, useRef, useState } from 'react';
import abcjs, { TuneObjectArray } from "abcjs";

import Staff from './Staff';
import ControlPanel from './ControlPanel';
import Playback from './Playback';
import Button from './parameters/Button';

import { NoteProps } from '../types/note';
import { defaultNotes } from '../constants/notes';
import { MAX_BEATS_PER_BAR } from '../constants/integers';
import { keyOptions } from '../constants/keys';
import { instrumentOptions } from '../constants/instruments';
import { scaleOptions } from '../constants/scales';
// import { durationOptions } from "../constants/durations";
import { instrumentMap } from '../constants/maps';
import { synth, synthControl, cursorControl, audioContext, notationOptions } from '../constants/audiovisual';

export default function App() {

  // REFS //

  const activeKey = useRef<string>('K:C');
  const activeInstrument = useRef<number>(0);
  const activeTempo = useRef<number>(100);
  const activeVolume = useRef<number>(60);
  const activeDurations = useRef<string[]>(['4']);
  const notationString = useRef<string>(`X:1\n${activeKey.current}\nM:4/4\nQ:1/4=${activeTempo.current.toString()}\nxxxx|xxxx|xxxx|xxxx|`); // empty staff
  const notesInBarCount = useRef<number>(0);  // default to zero beats
  
  // INITIALIZE SYNTH AND STAFF //

  let staffObj: TuneObjectArray;

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
    }   // re-initialize synth when params are changed 
  }, [activeKey.current, activeInstrument.current, activeTempo.current, activeVolume.current]);

  // NOTE RENDERING //

  const [isGenerating, setIsGenerating] = useState(true);

  const pauseBeforeNextNote = (ms: number) => new Promise(res => setTimeout(res, ms));

  const renderNoteToStaff = async (note: NoteProps): Promise<void> => {
    // switch render function with pause function?
    let newNote = '', blankStaffSpaceFilled = notationString.current.indexOf('x') === -1;
    
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
      console.log(volumeSelection);
      // quarter note in 4/4 would be .25
      abcjs.synth.playEvent(
        [
          {
            "pitch": note.pitchNumber,
            "volume": volumeSelection,
            "start": 0,
            "duration": note.duration,
            "instrument": activeInstrument.current,
            "gap": 0
          },
        ], [], 1000 // a measure takes one second.    
      ).then(() => {
          staffObj = abcjs.renderAbc("staff", notationString.current, notationOptions);
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

    synthControl.setTune(staffObj[0], true);  // why here?
  }

  const handleClickStop = () => {
    setIsGenerating(false);
  }; 

  const handleClickGenerate = async (): Promise<void> => {
    setIsGenerating(true);
    await randomizeAndRenderNotes(defaultNotes);
  };

  // CONTROL PANEL PARAMETERS //

  // Key
  const [keySelection, setKeySelection] = useState<string>(keyOptions()[0].value);

  const handleKeySelection = (key: string): void => {
    setKeySelection(key);
    notationString.current = notationString.current.replace(activeKey.current, `K:${key}`);
    activeKey.current = `K:${key}`;
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

  // Tempo
  const [tempoSelection, setTempoSelection] = useState<number>(100);

  const handleTempoSelection = (tempo: number): void => {
    setTempoSelection(tempo);
    notationString.current = notationString.current.replace(activeTempo.current.toString(), tempo.toString());
    activeTempo.current = tempo;
  };

  // Volume
  const [volumeSelection, setVolumeSelection] = useState<number>(60);

  const handleVolumeSelection = (volume: number): void => {
    setVolumeSelection(volume);
    activeVolume.current = volume;
  };

  // Duration
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);

  const handleDurationSelection = (duration: string): void => {
      setSelectedDurations([...activeDurations.current, duration]);
      activeDurations.current.push(duration);
      console.log(selectedDurations, activeDurations.current);
  };

  // Save param changes
  const handleUpdateStaff = (): void => {
    abcjs.renderAbc("staff", notationString.current, notationOptions);
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
          tempoSelection={tempoSelection}
          volumeSelection={volumeSelection}
          selectedDurations={selectedDurations}
          handleKeySelection={handleKeySelection}
          handleScaleSelection={handleScaleSelection}
          handleInstrumentSelection={handleInstrumentSelection}
          handleTempoSelection={handleTempoSelection}
          handleVolumeSelection={handleVolumeSelection}
          handleDurationSelection={handleDurationSelection}
          handleUpdateStaff={handleUpdateStaff}
        /> 
      </div>
    </div>
  );
}