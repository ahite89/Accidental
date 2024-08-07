import { useState } from 'react';
import '../index.css';

import Modal from 'react-modal';
import Button from './parameters/Button';
import DropDown from "./parameters/Dropdown";
import MultiRangeSlider from "./parameters/MultiRangeSlider";
import RangeSlider from "./parameters/RangeSlider";
import SelectableList from './parameters/SelectableList';
import Checkbox from './parameters/Checkbox';

import { ControlPanelProps } from "../interfaces/controlPanel";
import { DurationProps } from '../interfaces/selectable';

import { MajorKeys, MinorKeys, keyOptions } from "../constants/keys";
import { Scales, scaleOptions } from "../constants/scales";
import { instrumentOptions, Instruments } from "../constants/instruments";
import { pitchNumberMap } from "../constants/pitchRange";
import { MIN_PITCH_DISTANCE, MIN_PITCH_NUMBER, MAX_PITCH_NUMBER } from "../constants/pitchRange";
import { MIN_VOLUME, MAX_VOLUME, VOLUME_INTERVAL } from "../constants/volume";
import { MODAL_STYLING } from "../constants/modal";
import { DEFAULT_RANDOMIZER_PARAMS } from '../constants/voices';

import * as Tempo from "../constants/tempo";
import * as Steps from "../constants/steps";

export default function ControlPanel({ 
    voiceNumber, 
    onSubmit, 
    handleCloseControlPanel, 
    openControlPanel, 
    randomizerParameters
}: ControlPanelProps) {

    const handleSubmitParameters = (): void => {
        onSubmit({
            keySelection,
            scaleSelection,
            instrumentSelection,
            stepsSelection,
            repeatNoteSelection,
            pitchRangeSelection,
            tempoSelection,
            volumeSelection,
            durationSelection
        }, voiceNumber)
    };

    const handleResetParameters = (): void => {
        setScaleSelection(DEFAULT_RANDOMIZER_PARAMS.scaleSelection);
        setKeySelection(DEFAULT_RANDOMIZER_PARAMS.keySelection);
        setInstrumentSelection(DEFAULT_RANDOMIZER_PARAMS.instrumentSelection);
        setStepsSelection(DEFAULT_RANDOMIZER_PARAMS.stepsSelection);
        setRepeatNoteSelection(DEFAULT_RANDOMIZER_PARAMS.repeatNoteSelection);
        setPitchRangeSelection(DEFAULT_RANDOMIZER_PARAMS.pitchRangeSelection);
        setTempoSelection(DEFAULT_RANDOMIZER_PARAMS.tempoSelection);
        setVolumeSelection(DEFAULT_RANDOMIZER_PARAMS.volumeSelection);
        setDurationSelection(DEFAULT_RANDOMIZER_PARAMS.durationSelection);
    }

    // Scale
    const [scaleSelection, setScaleSelection] = useState<Scales>(randomizerParameters.scaleSelection);
    const handleScaleSelection = (scale: Scales): void => {
        setScaleSelection(scale);
    };
    
    // Key
    const [keySelection, setKeySelection] = useState<MajorKeys | MinorKeys>(randomizerParameters.keySelection);
    const handleKeySelection = (key: MajorKeys | MinorKeys): void => {
        setKeySelection(key);
    };

    // Instrument
    const [instrumentSelection, setInstrumentSelection] = useState<Instruments>(randomizerParameters.instrumentSelection);
    const handleInstrumentSelection = (instrument: Instruments): void => {
        setInstrumentSelection(instrument);
    };

    // Steps
    const [stepsSelection, setStepsSelection] = useState<number>(randomizerParameters.stepsSelection);
    const handleStepsSelection = (steps: number): void => {
        setStepsSelection(steps);
    };

    // Repeat Note
    const [repeatNoteSelection, setRepeatNoteSelection] = useState<boolean>(randomizerParameters.repeatNoteSelection);
    const handleRepeatNote = (repeat: boolean): void => {
        setRepeatNoteSelection(repeat);
    };

    // Pitch Range
    const [pitchRangeSelection, setPitchRangeSelection] = useState<number[]>(randomizerParameters.pitchRangeSelection);
    const handlePitchRangeSelection = (pitchRange: number[]): void => {
        setPitchRangeSelection([pitchRange[0], pitchRange[1]]);
    };

    // Tempo
    const [tempoSelection, setTempoSelection] = useState<number>(randomizerParameters.tempoSelection);
    const handleTempoSelection = (tempo: number): void => {
        setTempoSelection(tempo);
    };

    // Volume
    const [volumeSelection, setVolumeSelection] = useState<number>(randomizerParameters.volumeSelection);
    const handleVolumeSelection = (volume: number): void => {
        setVolumeSelection(volume);
    };

    // Duration
    const [durationSelection, setDurationSelection] = useState<DurationProps[]>(randomizerParameters.durationSelection);
    const validParams = durationSelection.find(d => d.selected) ? true : false;

    const handleDurationSelection = (durationObject: DurationProps) => {
        const updatedDurations = durationSelection.map((duration) => {
            // Toggle selected value if duration is clicked
            if (duration.noteLength === durationObject.noteLength) {
                return {
                    noteLength: duration.noteLength,
                    selected: !duration.selected,
                    abcSyntax: duration.abcSyntax,
                    audioDuration: duration.audioDuration,
                    isRest: duration.isRest
                };
            }
            
            return duration;
        });

        setDurationSelection(updatedDurations);
    };

    return (
        <Modal isOpen={openControlPanel} style={MODAL_STYLING} ariaHideApp={false}>
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
                <p className="text-center text-white py-3 text-3xl">Voice {voiceNumber}</p>
            </div>
            <div className="px-8 py-4 flex flex-row">
                <div className="w-60 mr-6">
                    <div className="flex flex-col pb-2">
                        <DropDown options={scaleOptions()} value={scaleSelection} onChange={handleScaleSelection}>Scale</DropDown>
                        <DropDown options={keyOptions(scaleSelection)} value={keySelection} onChange={handleKeySelection}>Key</DropDown>
                        <DropDown options={instrumentOptions()} value={instrumentSelection} onChange={handleInstrumentSelection}>Instrument</DropDown>
                    </div>
                    <div className="items-center pb-2">
                        <SelectableList 
                            options={durationSelection}
                            onSelect={handleDurationSelection}
                        >
                            Durations
                        </SelectableList>
                    </div>
                    <Checkbox 
                        label="Repeat Pitches"
                        checked={repeatNoteSelection} 
                        onCheck={handleRepeatNote}
                        extraStyling="py-4"
                    />
                </div>
                <div className="w-96 border-solid border-0 border-l border-slate-200 pl-8 flex flex-col justify-between">
                    <MultiRangeSlider 
                        min={MIN_PITCH_NUMBER}
                        max={MAX_PITCH_NUMBER}
                        minDistance={MIN_PITCH_DISTANCE}
                        valueRange={pitchRangeSelection}
                        onChangeValues={handlePitchRangeSelection}
                        map={pitchNumberMap}
                    >
                        Pitch Range
                    </MultiRangeSlider>
                    <RangeSlider
                        min={repeatNoteSelection ? Steps.MIN_STEPS: 1}
                        max={Steps.MAX_STEPS}
                        value={stepsSelection}
                        onChangeValue={handleStepsSelection}
                        interval={Steps.STEPS_INTERVAL}
                    >
                        Maximum Steps Between Pitches
                    </RangeSlider>
                    <RangeSlider
                        min={Tempo.MIN_TEMPO}
                        max={Tempo.MAX_TEMPO}
                        value={tempoSelection}
                        onChangeValue={handleTempoSelection}
                        interval={Tempo.TEMPO_INTERVAL}
                    >
                        Tempo
                    </RangeSlider>
                    <RangeSlider
                        min={MIN_VOLUME}
                        max={MAX_VOLUME}
                        value={volumeSelection}
                        onChangeValue={handleVolumeSelection}
                        interval={VOLUME_INTERVAL}
                    >
                        Volume
                    </RangeSlider>
                    <div className="flex justify-center mb-4">
                        <Button disabled={!validParams} 
                            primary={validParams}
                            extraStyling="mr-4" 
                            onClick={handleSubmitParameters}>Save Changes</Button>
                        <Button onClick={handleCloseControlPanel}>Cancel</Button>
                        <Button onClick={handleResetParameters}>Reset</Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}