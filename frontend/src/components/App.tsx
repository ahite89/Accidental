import { useEffect, useRef, useState } from 'react';
import abcjs, { TuneObjectArray } from "abcjs";
import className from 'classnames';
import Modal from 'react-modal';

import Staff from './Staff';
import ControlPanel from './ControlPanel';
import Playback from './Playback';
import Button from './parameters/Button';
import RangeSlider from './parameters/RangeSlider';

import { NoteProps } from '../interfaces/note';
import { SelectableProps } from '../interfaces/selectable';
import { RandomizerParameters, DEFAULT_RANDOMIZER_PARAMS } from '../interfaces/controlPanel';
import { NotationData } from '../interfaces/notation';
import { getRandomizedNotes } from '../services/noteRandomizer';

import { DEFAULT_PITCH_RANGE } from '../constants/pitchRange';
import { DEFAULT_KEY } from '../constants/keys';
import { DEFAULT_INSTRUMENT, instrumentMap } from '../constants/instruments';
import { DEFAULT_SCALE } from '../constants/scales';
import { durationOptions, MAX_BEATS_PER_BAR } from "../constants/durations";
import * as Tempo from "../constants/tempo";
import { DEFAULT_VOLUME } from '../constants/volume';
import { FIRST_FOUR_BARS } from '../constants/voices';
import * as AudioVisual from '../constants/audiovisual';

export default function App() {

  // REFS //

  // Params
  const activeKey = useRef<string>(`K:${DEFAULT_KEY}`);
  const activeInstrument = useRef<number>(instrumentMap[DEFAULT_INSTRUMENT]);
  const activePitchRange = useRef<number[]>(DEFAULT_PITCH_RANGE);
  const activeTempo = useRef<number>(Tempo.DEFAULT_TEMPO);
  const activeVolume = useRef<number>(DEFAULT_VOLUME);
  const activeDurations = useRef<SelectableProps[]>(durationOptions);

  // Notation
  const notationData = useRef<NotationData[]>([
    {
      voiceNumber: 1,
      randomizerParams: DEFAULT_RANDOMIZER_PARAMS,
      notationString: `X:1\nK:C\nM:4/4\nQ:1/4=${activeTempo.current.toString()}\n${FIRST_FOUR_BARS}`,
      volume: DEFAULT_VOLUME,
      notesInBarCount: 0,
    }
  ]);

  // VOICES //

  const [voiceCount, setVoiceCount] = useState<number>(1);  // state used for iterative staff rendering

  const addVoiceToSystem = (): void => {
    if (voiceCount < 4) {
      notationData.current.push(
        {
          voiceNumber: voiceCount + 1,
          randomizerParams: DEFAULT_RANDOMIZER_PARAMS,
          notationString: `X:${voiceCount + 1}\nK:C\nM:4/4\n${FIRST_FOUR_BARS}`,
          volume: DEFAULT_VOLUME,
          notesInBarCount: 0
        }
      )
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
      AudioVisual.synthControlOne.load("#audio", null,
        {
          displayLoop: true, 
          displayRestart: true, 
          displayPlay: true, 
          displayProgress: true, 
        }
      );

      // need to remove element from dom when applicable
      // re-run when any of the big voice objects has changed
      for (let i = 1; i < voiceCount + 1; i++) {
        staffObj = abcjs.renderAbc(`staff-${i}`, notationData.current[i - 1].notationString, AudioVisual.notationOptions);
        AudioVisual.synthOne.init({ 
          audioContext: AudioVisual.audioContext,
          visualObj: staffObj[0],
          millisecondsPerMeasure: 500,   // make dynamic or remove?
          options: {
            pan: [ -0.3, 0.3 ]
          }
        }).then(() => {
            AudioVisual.synthControlOne.setTune(staffObj[0], false, { program: activeInstrument.current });
        }).catch((error) => {
            console.warn("Audio problem:", error);
        });
      }
     }   // re-initialize synth when params are changed 
  }, [activeKey.current, activeInstrument.current, activeTempo.current,
      activeVolume.current, activePitchRange.current, voiceCount]);

  // NOTE RENDERING //

  const pauseBeforeNextNote = (ms: number) => new Promise(res => setTimeout(res, ms));

  const renderNoteToStaff = async (note: NoteProps, notationObj: NotationData): Promise<void> => {
    // switch render function with pause function?
    let newNote = '', blankStaffSpaceFilled = notationObj.notationString.indexOf('x') === -1;
    
    await pauseBeforeNextNote(note.timeBetweenNotes).then(() => {
      notationObj.notesInBarCount += note.duration;
      newNote = note.abcName + note.duration.toString();
      
      if (blankStaffSpaceFilled) {
        if (notationObj.notesInBarCount === MAX_BEATS_PER_BAR) {
          newNote += '|';
          notationObj.notesInBarCount = 0;
        }

        notationObj.notationString += newNote;
      }
      else {
        // replace blank staff space until filled in with notes
        notationObj.notationString = notationObj.notationString.replace('x', newNote);
      }
      // quarter note in 4/4 would be .25
      abcjs.synth.playEvent(
        [
          {
            "pitch": note.pitchNumber,
            "volume": notationObj.volume,
            "start": 0,
            "duration": note.duration,
            "instrument": notationObj.voiceNumber,  // TEMP
            "gap": 0
          },
        ], [], 1000 // a measure takes one second.    
      ).then(() => {
          staffObj = abcjs.renderAbc(`staff-${notationObj.voiceNumber}`, notationObj.notationString, AudioVisual.notationOptions);
          console.log(note);
      });
    });
  };

  const randomizeAndRenderNotes = async (notes: NoteProps[], notationObj: NotationData): Promise<void> => {
    let currentIndex = notes.length,  randomIndex: number;

    while (!stopRendering.current) {
      if (stopRendering.current) {
        break;
      }
      randomIndex = Math.floor(Math.random() * currentIndex);
      await renderNoteToStaff(notes[randomIndex], notationObj);
    }

    AudioVisual.synthControlOne.setTune(staffObj[0], false, { program: activeInstrument.current });
  };

  // NOTE RENDERING BUTTONS //

  const stopRendering = useRef<boolean>(false);

  const handleStopGenerating = () => {
    stopRendering.current = true;
  };

  const handleClearStaff = () => {
    for (let i = 0; i < notationData.current.length; i++) {
      if (i === 0) {
        notationData.current[i].notationString = `X:1\nK:C\nM:4/4\nQ:1/4=${activeTempo.current.toString()}\n${FIRST_FOUR_BARS}`;
      }
      else {
        notationData.current[i].notationString = `X:${i + 1}\nK:C\nM:4/4\n${FIRST_FOUR_BARS}`
      }
      staffObj = abcjs.renderAbc(`staff-${i + 1}`, notationData.current[i].notationString, AudioVisual.notationOptions);
    }
  };

  const handleStartGenerating = async (): Promise<void> => {
    // Need to disable everything but 'Stop' during generation
    stopRendering.current = false;
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
    activeTempo.current = tempoSelection;
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
    // activeKey.current = `K:${keySelection}`;
    // activeInstrument.current = instrumentMap[instrumentSelection];
    // activePitchRange.current = pitchRangeSelection;
    //activeTempo.current = tempoSelection;
    // activeVolume.current = volumeSelection;

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

  const staffStyling = className("flex flex-row justify-center");

  return (
    <div>
      <header className="bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-start px-10 py-4">
        <p className="text-white text-xl border-white border-2 border-solid p-2 rounded">
          &#9838;ccidental
        </p>
      </header>
      <div className="p-8 bg-slate-100">
        <div className="flex justify-center mb-8">
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
        <div className="flex flex-col p-4">
          <div className={staffStyling}>
            <Button extraStyling="bg-blue-200" onClick={() => setOpenControlPanel(true)}>Voice 1</Button>
            <Staff voiceNumber={1} />
          </div>
          {voiceCount > 1 &&
            <div className={staffStyling}>
              <Button extraStyling="bg-green-200" onClick={() => setOpenControlPanel(true)}>Voice 2</Button>
              <Staff voiceNumber={2} />
            </div>
          }
          {voiceCount > 2 &&
            <div className={staffStyling}>
              <Button extraStyling="bg-orange-200" onClick={() => setOpenControlPanel(true)}>Voice 3</Button>
              <Staff voiceNumber={3} />
            </div>
          }
          {voiceCount > 3 &&
            <div className={staffStyling}>
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