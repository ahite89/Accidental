import { useEffect, useRef, useState } from 'react';
import abcjs, { TuneObjectArray } from "abcjs";
import Modal from 'react-modal';

import Staff from './Staff';
import ControlPanel from './ControlPanel';
import Playback from './Playback';
import Button from './parameters/Button';
import RangeSlider from './parameters/RangeSlider';

import { NoteProps } from '../interfaces/note';
import { SelectableProps } from '../interfaces/selectable';
import { RandomizerParameters } from '../interfaces/controlPanel';
import { getRandomizedNotes } from '../services/noteRandomizer';

import { DEFAULT_PITCH_RANGE } from '../constants/pitchRange';
import { DEFAULT_KEY } from '../constants/keys';
import { DEFAULT_INSTRUMENT, instrumentMap } from '../constants/instruments';
import { DEFAULT_SCALE } from '../constants/scales';
import { durationOptions, MAX_BEATS_PER_BAR } from "../constants/durations";
import * as Tempo from "../constants/tempo";
import { DEFAULT_VOLUME } from '../constants/volume';
import { VOICE_ONE_NOTATION } from '../constants/voices';
import * as AudioVisual from '../constants/audiovisual';

export default function App() {

  // REFS //

  // NEW PLAN: EACH VOICE WILL HAVE THEIR OWN PARAMS AS A BIG OBJECT
  // KEY, INSTRUMENT, RANGE, VOLUME, DURATIONS
  // TEMPO WILL BE GLOBAL AND REMOVED FROM THE CONTROL PANEL
  // EACH VOICE WILL HAVE THEIR OWN NOTATION STRING

  // Params
  const activeKey = useRef<string>(`K:${DEFAULT_KEY}`);
  const activeInstrument = useRef<number>(instrumentMap[DEFAULT_INSTRUMENT]);
  const activePitchRange = useRef<number[]>(DEFAULT_PITCH_RANGE);
  const activeTempo = useRef<number>(Tempo.DEFAULT_TEMPO);
  const activeVolume = useRef<number>(DEFAULT_VOLUME);
  const activeDurations = useRef<SelectableProps[]>(durationOptions);

  interface notationData {
    notationString: string,
    voiceNumber: number,
    volume: number
  }

  // Notation
  //const notationString = useRef<string>(`X:1\n${activeKey.current}\nM:4/4\nQ:1/4=${activeTempo.current.toString()}\n${VOICE_ONE_NOTATION}`);
  const notationData = useRef<notationData[]>([
    {notationString: "X:1\nK:C\n", voiceNumber: 1, volume: DEFAULT_VOLUME}
  ]);
  const notesInBarCount = useRef<number>(0);  // default to zero beats

  // VOICES //

  const [voiceCount, setVoiceCount] = useState<number>(1);  // state used for iterative staff rendering

  const addVoiceToSystem = (): void => {
    if (voiceCount < 4) {
      notationData.current.push({notationString: `X:${voiceCount + 1}\nK:D\n`, voiceNumber: voiceCount + 1, volume: DEFAULT_VOLUME})
      setVoiceCount(voiceCount + 1);
    }
  };

  const removeVoiceFromSystem = (): void => {
    if (voiceCount > 1) {
      notationData.current.pop();
      setVoiceCount(voiceCount - 1);
    }
  };

  // INITIALIZE SYNTH AND STAFF //

  let staffObj: TuneObjectArray;

  useEffect(() => {
    if (abcjs.synth.supportsAudio()) {   
      AudioVisual.synthControl.load("#audio",
      AudioVisual.cursorControl,
          {
            displayLoop: true, 
            displayRestart: true, 
            displayPlay: true, 
            displayProgress: true, 
          }
      );

      // use loop here for rendering staves based on number of voices
      // need to remove element from dom when applicable
      // re-run when any of the big voice objects has changed
      for (let i = 1; i < voiceCount + 1; i++) {
        staffObj = abcjs.renderAbc(`staff-${i}`, notationData.current[i - 1].notationString, AudioVisual.notationOptions);
        
        AudioVisual.synth.init({ 
          audioContext: AudioVisual.audioContext,
          visualObj: staffObj[0],
          millisecondsPerMeasure: 500,   // make dynamic or remove?
          options: {
            pan: [ -0.3, 0.3 ]
          }
        }).then(() => {
          AudioVisual.synthControl.setTune(staffObj[0], false, { program: activeInstrument.current });
        }).catch((error) => {
            console.warn("Audio problem:", error);
        });
      }
     }   // re-initialize synth when params are changed 
  }, [activeKey.current, activeInstrument.current, activeTempo.current,
      activeVolume.current, activePitchRange.current, voiceCount]);

  // NOTE RENDERING //

  const pauseBeforeNextNote = (ms: number) => new Promise(res => setTimeout(res, ms));

  const renderNoteToStaff = async (note: NoteProps, notationObj: notationData): Promise<void> => {
    // switch render function with pause function?
    let newNote = ''; //blankStaffSpaceFilled = notationString.current.indexOf('x') === -1;
    
    await pauseBeforeNextNote(note.timeBetweenNotes).then(() => {
      notesInBarCount.current += note.duration;
      newNote = note.abcName + note.duration.toString();
      
      // if (blankStaffSpaceFilled) {
      // if (notesInBarCount.current >= MAX_BEATS_PER_BAR) {
      //   newNote += '|';
      //   notesInBarCount.current = 0;
      // }

      notationObj.notationString += newNote;
      // }
      // else {
      //   // replace blank staff space until filled in with notes
      //   notation = notation.replace('x', newNote);
      // }
      // quarter note in 4/4 would be .25
      abcjs.synth.playEvent(
        [
          {
            "pitch": note.pitchNumber,
            "volume": notationObj.volume,
            "start": 0,
            "duration": note.duration,
            "instrument": notationObj.voiceNumber,
            "gap": 0
          },
        ], [], 1000 // a measure takes one second.    
      ).then(() => {
          staffObj = abcjs.renderAbc(`staff-${notationObj.voiceNumber}`, notationObj.notationString, AudioVisual.notationOptions);
          //staffObj = abcjs.renderAbc("staff-2", notationString.current[0], AudioVisual.notationOptions);
          console.log(note);
      });
    });
  };

  const randomizeAndRenderNotes = async (notes: NoteProps[], notationObj: notationData): Promise<void> => {
    let currentIndex = notes.length,  randomIndex: number;

    let i = 0;
    while (i < 10) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      await renderNoteToStaff(notes[randomIndex], notationObj);
      i++;
    }

    AudioVisual.synthControl.setTune(staffObj[0], false, { program: activeInstrument.current });
  }

  // NOTE RENDERING BUTTONS //

  const [isGenerating, setIsGenerating] = useState(true);

  const handleStopGenerating = () => {
    setIsGenerating(false);
  };

  const handleClearStaff = () => {
    //notationString.current[0] = `X:1\n${activeKey.current}\nM:4/4\nQ:1/4=${activeTempo.current.toString()}\nxxxx|xxxx|xxxx|xxxx|`;
    //abcjs.renderAbc("staff-1", notationString.current[0], AudioVisual.notationOptions);
  };

  const handleStartGenerating = async (): Promise<void> => {
    // Need to disable everything but 'Stop' during generation
    setIsGenerating(true);
    const randomizerParameters: RandomizerParameters = {
      keySelection,
      scaleSelection,
      pitchRangeSelection,
      selectedDurations
    };
    console.log(notationData.current);
    // change name to "get correct notes based on parameters" or something
    notationData.current.forEach(notationObj => {
      // probably move getRandomizedNotes function into randomizeAndRender function
      // so you can access voice specific parameters
      randomizeAndRenderNotes(getRandomizedNotes(randomizerParameters), notationObj);
    });
  };

  // CONTROL PANEL PARAMETERS //

  // Key
  const [keySelection, setKeySelection] = useState<string>(DEFAULT_KEY);
  const handleKeySelection = (key: string): void => {
    setKeySelection(key);
  };

  // Scale
  const [scaleSelection, setScaleSelection] = useState<string>(DEFAULT_SCALE);
  const handleScaleSelection = (scale: string): void => {
      setScaleSelection(scale);
  };

  // Instrument
  const [instrumentSelection, setInstrumentSelection] = useState<string>(DEFAULT_INSTRUMENT);
  const handleInstrumentSelection = (instrument: string): void => {
    setInstrumentSelection(instrument);
  };

  // Range
  const [pitchRangeSelection, setPitchRangeSelection] = useState<number[]>(DEFAULT_PITCH_RANGE);
  const handlePitchRangeSelection = (pitchRange: number[]): void => {
      setPitchRangeSelection([pitchRange[0], pitchRange[1]]);
  };

  // Tempo
  const [tempoSelection, setTempoSelection] = useState<number>(Tempo.DEFAULT_TEMPO);
  const handleTempoSelection = (tempo: number): void => {
    setTempoSelection(tempo);
  };

  // Volume
  const [volumeSelection, setVolumeSelection] = useState<number>(DEFAULT_VOLUME);
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
    //notationString.current[0] = notationString.current[0].replace(activeKey.current, `K:${keySelection}`);
    //notationString.current[0] = notationString.current[0].replace(activeTempo.current.toString(), tempoSelection.toString());

    // Update refs
    activeKey.current = `K:${keySelection}`;
    activeInstrument.current = instrumentMap[instrumentSelection];
    activePitchRange.current = pitchRangeSelection;
    activeTempo.current = tempoSelection;
    activeVolume.current = volumeSelection;

    //abcjs.renderAbc("staff-1", notationString.current[0], AudioVisual.notationOptions);
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
        <div className="flex justify-center mb-4">
          <Button extraStyling="mr-4 shadow" primary rounded onClick={handleStartGenerating}>
            Generate
          </Button>
          <Button extraStyling="mr-4 shadow" secondary rounded onClick={handleStopGenerating}>
            Stop
          </Button>
          <Button extraStyling="shadow" save rounded onClick={handleClearStaff}>Clear</Button>
        </div>
        <div className="flex justify-center">
          <RangeSlider
                min={Tempo.MIN_TEMPO}
                max={Tempo.MAX_TEMPO}
                value={tempoSelection}
                onChangeValue={handleTempoSelection}
                interval={Tempo.TEMPO_INTERVAL}
                labelStyling="text-3xl mr-2"
          >
            {"\uD834\uDD5F"} =
          </RangeSlider>
        </div>
        <div className="flex flex-col justify-center p-4">
          <div className="flex flex-row">
            <Button extraStyling="bg-blue-200" onClick={() => setOpenControlPanel(true)}>Voice 1</Button>
            <Staff voiceNumber={1} />
          </div>
          {voiceCount > 1 &&
            <div className="flex flex-row">
              <Button extraStyling="bg-green-200" onClick={() => setOpenControlPanel(true)}>Voice 2</Button>
              <Staff voiceNumber={2} />
            </div>
          }
          {voiceCount > 2 &&
            <div className="flex flex-row">
              <Button extraStyling="bg-orange-200" onClick={() => setOpenControlPanel(true)}>Voice 3</Button>
              <Staff voiceNumber={3} />
            </div>
          }
          {voiceCount > 3 &&
            <div className="flex flex-row">
              <Button extraStyling="bg-purple-200" onClick={() => setOpenControlPanel(true)}>Voice 4</Button>
              <Staff voiceNumber={4} />
            </div>
          }
        </div>
        <div className="flex justify-center my-4">
          <Button extraStyling="mr-4" outline onClick={addVoiceToSystem}>Add Voice</Button>
          <Button outline onClick={removeVoiceFromSystem}>Remove Voice</Button>
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
            pitchRangeSelection={pitchRangeSelection}
            volumeSelection={volumeSelection}
            selectedDurations={selectedDurations}
            handleKeySelection={handleKeySelection}
            handleScaleSelection={handleScaleSelection}
            handleInstrumentSelection={handleInstrumentSelection}
            handlePitchRangeSelection={handlePitchRangeSelection}
            handleVolumeSelection={handleVolumeSelection}
            handleDurationSelection={handleDurationSelection}
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