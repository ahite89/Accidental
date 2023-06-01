import { useEffect, useRef, useState } from 'react';
import abcjs, { TuneObjectArray } from "abcjs";
import Modal from 'react-modal';

import Staff from './Staff';
import ControlPanel from './ControlPanel';
import Playback from './Playback';
import Button from './parameters/Button';

import { NoteProps } from '../interfaces/note';
import { SelectableProps } from '../interfaces/selectable';

import { defaultNotes } from '../constants/notes';
import { MAX_BEATS_PER_BAR, MIN_PITCH_NUMBER, MAX_PITCH_NUMBER } from '../constants/integers';
import { keyOptions } from '../constants/keys';
import { instrumentOptions } from '../constants/instruments';
import { scaleOptions } from '../constants/scales';
import { durationOptions } from "../constants/durations";
import { instrumentMap } from '../constants/maps';
import { synth, synthControl, cursorControl, audioContext, notationOptions } from '../constants/audiovisual';

export default function App() {

  // REFS //

  const activeKey = useRef<string>('K:C');
  const activeInstrument = useRef<number>(0);
  const activeMinPitch = useRef<number>(MIN_PITCH_NUMBER);
  const activeMaxPitch = useRef<number>(MAX_PITCH_NUMBER);
  const activeTempo = useRef<number>(100);
  const activeVolume = useRef<number>(40);
  const activeDurations = useRef<SelectableProps[]>(durationOptions);
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
          pan: [ -0.3, 0.3 ]
        }
      }).then(() => {
          synthControl.setTune(staffObj[0], false, { program: activeInstrument.current }).then(function () {
            console.log("Audio successfully loaded.")
        }).catch((error) => {
            console.warn("Audio problem:", error);
        });
      }).catch((error) => {
          console.warn("Audio problem:", error);
      });
    }   // re-initialize synth when params are changed 
  }, [activeKey.current, activeInstrument.current, activeTempo.current,
      activeVolume.current, activeMinPitch.current, activeMaxPitch.current]);

  // NOTE RENDERING //

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
      // quarter note in 4/4 would be .25
      abcjs.synth.playEvent(
        [
          {
            "pitch": note.pitchNumber,
            "volume": activeVolume.current,
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

    synthControl.setTune(staffObj[0], false, { program: activeInstrument.current });
  }

  // NOTE RENDERING BUTTONS //

  const [isGenerating, setIsGenerating] = useState(true);

  const handleStopGenerating = () => {
    setIsGenerating(false);
  };

  const handleClearStaff = () => {
    notationString.current = `X:1\n${activeKey.current}\nM:4/4\nQ:1/4=${activeTempo.current.toString()}\nxxxx|xxxx|xxxx|xxxx|`;
    abcjs.renderAbc("staff", notationString.current, notationOptions);
  };

  const handleStartGenerating = async (): Promise<void> => {
    // Need to disable everything but 'Stop' during generation
    setIsGenerating(true);
    await randomizeAndRenderNotes(defaultNotes);
  };

  // CONTROL PANEL PARAMETERS //

  // Key
  const [keySelection, setKeySelection] = useState<string>(keyOptions()[0].value);
  const handleKeySelection = (key: string): void => {
    setKeySelection(key);
  };

  // Scale
  const [scaleSelection, setScaleSelection] = useState<string>(scaleOptions()[0].value);
  const handleScaleSelection = (scale: string): void => {
      setScaleSelection(scale);
  };

  // Instrument
  const [instrumentSelection, setInstrumentSelection] = useState<string>(instrumentOptions()[0].value);
  const handleInstrumentSelection = (instrument: string): void => {
    setInstrumentSelection(instrument);
  };

  // Range
  const [minPitchSelection, setMinPitchSelection] = useState<number>(MIN_PITCH_NUMBER);
  const [maxPitchSelection, setMaxPitchSelection] = useState<number>(MAX_PITCH_NUMBER);
  const handleSetPitchRange = (pitchRange: number[]): void => {
      setMinPitchSelection(pitchRange[0]);
      setMaxPitchSelection(pitchRange[1]);
  };

  // Tempo
  const [tempoSelection, setTempoSelection] = useState<number>(100);
  const handleTempoSelection = (tempo: number): void => {
    setTempoSelection(tempo);
  };

  // Volume
  const [volumeSelection, setVolumeSelection] = useState<number>(40);
  const handleVolumeSelection = (volume: number): void => {
    setVolumeSelection(volume);
  };

  // Duration
  const [selectedDurations, setSelectedDurations] = useState<SelectableProps[]>(durationOptions);

  const handleDurationSelection = (durationObject: SelectableProps) => {
    const updatedDurations = selectedDurations.map((duration) => {
      if (duration.value === durationObject.value) {
        return {value: duration.value, selected: !duration.selected};
      }
      return duration;
    });

    setSelectedDurations(updatedDurations);
    activeDurations.current = selectedDurations.filter((duration) => duration.selected);
    console.log(activeDurations.current);
  };

  // Save control panel changes (check to see if there's a difference first?)
  const handleUpdateStaff = (): void => {

    // Update notation string
    notationString.current = notationString.current.replace(activeKey.current, `K:${keySelection}`);
    notationString.current = notationString.current.replace(activeTempo.current.toString(), tempoSelection.toString());

    // Update refs
    activeKey.current = `K:${keySelection}`;
    activeInstrument.current = instrumentMap[instrumentSelection];
    activeMinPitch.current = minPitchSelection;
    activeMaxPitch.current = maxPitchSelection;
    activeTempo.current = tempoSelection;
    activeVolume.current = volumeSelection;

    abcjs.renderAbc("staff", notationString.current, notationOptions);
    setOpenControlPanel(false);
  };

  // CONTROLS MODAL //

  const [openControlPanel, setOpenControlPanel] = useState<boolean>(false);

  const modalStyling = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    }
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
          <Button extraStyling="mr-4 shadow" primary rounded onClick={handleStartGenerating}>
            Generate
          </Button>
          <Button extraStyling="mr-4 shadow" secondary rounded onClick={handleStopGenerating}>
            Stop
          </Button>
          <Button extraStyling="shadow" save rounded onClick={handleClearStaff}>Clear</Button>
        </div>
        <div className="flex justify-center p-4">
          <Button secondary onClick={() => setOpenControlPanel(true)}>CTRLS</Button>
          <Staff />
        </div>
        <Playback />
        <Modal
          isOpen={openControlPanel}
          ariaHideApp={false}
          style={modalStyling}
        >
          <ControlPanel
            keySelection={keySelection} 
            scaleSelection={scaleSelection}
            instrumentSelection={instrumentSelection}
            minPitchSelection={minPitchSelection}
            maxPitchSelection={maxPitchSelection}
            tempoSelection={tempoSelection}
            volumeSelection={volumeSelection}
            selectedDurations={selectedDurations}
            handleKeySelection={handleKeySelection}
            handleScaleSelection={handleScaleSelection}
            handleInstrumentSelection={handleInstrumentSelection}
            handleSetPitchRange={handleSetPitchRange}
            handleTempoSelection={handleTempoSelection}
            handleVolumeSelection={handleVolumeSelection}
            onSelect={handleDurationSelection}    // make more specific for duration
          />
          <div className="flex justify-center mb-4">
            <Button save extraStyling="mr-4" onClick={handleUpdateStaff}>Save Changes</Button>
            <Button secondary onClick={() => setOpenControlPanel(false)}>Cancel</Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}