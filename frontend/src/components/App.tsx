import { useEffect, useRef, useState } from 'react';
import abcjs, { TuneObjectArray } from "abcjs";
import Modal from 'react-modal';

import Staff from './Staff';
import ControlPanel from './ControlPanel';
import Playback from './Playback';
import Button from './parameters/Button';

import { NoteProps } from '../interfaces/note';
import { SelectableProps } from '../interfaces/selectable';
import { getRandomizedNotes } from '../services/noteRandomizer';

import { DEFAULT_PITCH_RANGE } from '../constants/pitchRange';
import { DEFAULT_KEY } from '../constants/keys';
import { DEFAULT_INSTRUMENT, instrumentMap } from '../constants/instruments';
import { DEFAULT_SCALE } from '../constants/scales';
import { durationOptions, MAX_BEATS_PER_BAR } from "../constants/durations";
import { DEFAULT_TEMPO } from '../constants/tempo';
import { DEFAULT_VOLUME } from '../constants/volume';
import * as Voices from '../constants/voices';
import * as AudioVisual from '../constants/audiovisual';

export default function App() {

  // REFS //

  // Params
  const activeKey = useRef<string>(`K:${DEFAULT_KEY}`);
  const activeInstrument = useRef<number>(instrumentMap[DEFAULT_INSTRUMENT]);
  const activePitchRange = useRef<number[]>(DEFAULT_PITCH_RANGE);
  const activeTempo = useRef<number>(DEFAULT_TEMPO);
  const activeVolume = useRef<number>(DEFAULT_VOLUME);
  const activeDurations = useRef<SelectableProps[]>(durationOptions);

  // Notation
  const voicesDeclarationArray = useRef<string[]>([Voices.VOICE_ONE_DECLARATION]);
  const voicesNotationArray = useRef<string[]>([Voices.VOICE_ONE_NOTATION]);
  const notationString = useRef<string>(`X:1\n${activeKey.current}\n${voicesDeclarationArray.current[0]}M:4/4\nQ:1/4=${activeTempo.current.toString()}\n${voicesNotationArray.current[0]}`);
  const notesInBarCount = useRef<number>(0);  // default to zero beats
  
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

      staffObj = abcjs.renderAbc("staff", notationString.current, AudioVisual.notationOptions);
      AudioVisual.synth.init({ 
        audioContext: AudioVisual.audioContext,
        visualObj: staffObj[0],
        millisecondsPerMeasure: 500,   // make dynamic or remove?
        options: {
          pan: [ -0.3, 0.3 ]
        }
      }).then(() => {
        AudioVisual.synthControl.setTune(staffObj[0], false, { program: activeInstrument.current }).then(function () {
            console.log("Audio successfully loaded.")
        }).catch((error) => {
            console.warn("Audio problem:", error);
        });
      }).catch((error) => {
          console.warn("Audio problem:", error);
      });
    }   // re-initialize synth when params are changed 
  }, [activeKey.current, activeInstrument.current, activeTempo.current,
      activeVolume.current, activePitchRange.current]);

  // NOTE RENDERING //

  const pauseBeforeNextNote = (ms: number) => new Promise(res => setTimeout(res, ms));

  const renderNoteToStaff = async (note: NoteProps): Promise<void> => {
    // switch render function with pause function?
    let newNote = '', blankStaffSpaceFilled = notationString.current.indexOf('x') === -1;
    
    await pauseBeforeNextNote(note.timeBetweenNotes).then(() => {
      notesInBarCount.current += note.duration;
      newNote = note.abcName + note.duration.toString();
      
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
          staffObj = abcjs.renderAbc("staff", notationString.current, AudioVisual.notationOptions);
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

    AudioVisual.synthControl.setTune(staffObj[0], false, { program: activeInstrument.current });
  }

  // NOTE RENDERING BUTTONS //

  const [isGenerating, setIsGenerating] = useState(true);

  const handleStopGenerating = () => {
    setIsGenerating(false);
  };

  const handleClearStaff = () => {
    notationString.current = `X:1\n${activeKey.current}\nM:4/4\nQ:1/4=${activeTempo.current.toString()}\nxxxx|xxxx|xxxx|xxxx|`;
    abcjs.renderAbc("staff", notationString.current, AudioVisual.notationOptions);
  };

  const handleStartGenerating = async (): Promise<void> => {
    // Need to disable everything but 'Stop' during generation
    setIsGenerating(true);
    await randomizeAndRenderNotes(getRandomizedNotes());  // include parameter info as argument
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
  const [tempoSelection, setTempoSelection] = useState<number>(DEFAULT_TEMPO);
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
    notationString.current = notationString.current.replace(activeKey.current, `K:${keySelection}`);
    notationString.current = notationString.current.replace(activeTempo.current.toString(), tempoSelection.toString());

    // Update refs
    activeKey.current = `K:${keySelection}`;
    activeInstrument.current = instrumentMap[instrumentSelection];
    activePitchRange.current = pitchRangeSelection;
    activeTempo.current = tempoSelection;
    activeVolume.current = volumeSelection;

    abcjs.renderAbc("staff", notationString.current, AudioVisual.notationOptions);
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

  // VOICES //

  const [voiceCount, setVoiceCount] = useState<number>(1);
  // state for voice string
  
  const addVoiceToSystem = (): void => {
    if (voiceCount < 4) {
      let voiceNotationString = Voices.VOICE_ONE_DECLARATION;
      switch (voiceCount) {
        case 1:
          voicesDeclarationArray.current.push(Voices.VOICE_TWO_DECLARATION);
          voicesNotationArray.current.push(Voices.VOICE_TWO_NOTATION);
          break;
        case 2:
          voicesDeclarationArray.current.push(Voices.VOICE_THREE_DECLARATION);
          voicesNotationArray.current.push(Voices.VOICE_THREE_NOTATION);
          break;
        case 3:
          voicesDeclarationArray.current.push(Voices.VOICE_FOUR_DECLARATION);
          voicesNotationArray.current.push(Voices.VOICE_FOUR_NOTATION);
          break;
        default:
          console.log("Max voices reached");
      }
      setVoiceCount(voiceCount + 1);
      abcjs.renderAbc("staff", notationString.current, AudioVisual.notationOptions);
    }
  };

  const removeVoiceFromSystem = (): void => {
    if (voiceCount > 2) {
      setVoiceCount(voiceCount - 1);
      abcjs.renderAbc("staff", notationString.current, AudioVisual.notationOptions);
    }
  };

  // X:1
  // K:C
  // V:V1 clef=treble
  // V:V2 clef=treble
  // V:Va clef=alto
  // V:Vc clef=bass
  // [V:V1] c
  // [V:V2] E
  // [V:Va] G,
  // [V:Vc] C,

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
        <div className="flex justify-center my-4">
          <Button save outline onClick={addVoiceToSystem}>Add Voice</Button>
          <Button save outline onClick={removeVoiceFromSystem}>Remove Voice</Button>
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
            tempoSelection={tempoSelection}
            volumeSelection={volumeSelection}
            selectedDurations={selectedDurations}
            handleKeySelection={handleKeySelection}
            handleScaleSelection={handleScaleSelection}
            handleInstrumentSelection={handleInstrumentSelection}
            handlePitchRangeSelection={handlePitchRangeSelection}
            handleTempoSelection={handleTempoSelection}
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