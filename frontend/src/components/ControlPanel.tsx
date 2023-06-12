import { useState } from 'react';
import className from "classnames";

import DropDown from "./parameters/Dropdown";
import MultiRangeSlider from "./parameters/MultiRangeSlider";
import RangeSlider from "./parameters/RangeSlider";
import SelectableList from './parameters/SelectableList';

import { ControlPanelProps, DEFAULT_RANDOMIZER_PARAMS } from "../interfaces/controlPanel";
import { SelectableProps } from '../interfaces/selectable';
import { keyOptions } from "../constants/keys";
import { scaleOptions } from "../constants/scales";
import { instrumentOptions } from "../constants/instruments";
import { pitchNumberMap } from "../constants/pitchRange";
import { MIN_PITCH_DISTANCE, MIN_PITCH_NUMBER, MAX_PITCH_NUMBER } from "../constants/pitchRange";
import { MIN_VOLUME, MAX_VOLUME, VOLUME_INTERVAL } from "../constants/volume";
import * as Tempo from "../constants/tempo";

export default function ControlPanel({ randomizerParameters }: ControlPanelProps) {

    // Key
    const [keySelection, setKeySelection] = useState<string>(DEFAULT_RANDOMIZER_PARAMS.keySelection);
    const handleKeySelection = (key: string): void => {
        setKeySelection(key);
    };

    // Scale
    const [scaleSelection, setScaleSelection] = useState<string>(DEFAULT_RANDOMIZER_PARAMS.scaleSelection);
    const handleScaleSelection = (scale: string): void => {
        setScaleSelection(scale);
    };

    // Instrument
    const [instrumentSelection, setInstrumentSelection] = useState<string>(DEFAULT_RANDOMIZER_PARAMS.instrumentSelection);
    const handleInstrumentSelection = (instrument: string): void => {
        setInstrumentSelection(instrument);
    };

    // Range
    const [pitchRangeSelection, setPitchRangeSelection] = useState<number[]>(DEFAULT_RANDOMIZER_PARAMS.pitchRangeSelection);
    const handlePitchRangeSelection = (pitchRange: number[]): void => {
        setPitchRangeSelection([pitchRange[0], pitchRange[1]]);
    };

    // Tempo
    const [tempoSelection, setTempoSelection] = useState<number>(DEFAULT_RANDOMIZER_PARAMS.tempoSelection);
    const handleTempoSelection = (tempo: number): void => {
        setTempoSelection(tempo);
    };

    // Volume
    const [volumeSelection, setVolumeSelection] = useState<number>(DEFAULT_RANDOMIZER_PARAMS.volumeSelection);
    const handleVolumeSelection = (volume: number): void => {
        setVolumeSelection(volume);
    };

    // Duration
    const [selectedDurations, setSelectedDurations] = useState<SelectableProps[]>(DEFAULT_RANDOMIZER_PARAMS.selectedDurations);

    const handleDurationSelection = (durationObject: SelectableProps) => {
        const updatedDurations = selectedDurations.map((duration) => {
        if (duration.value === durationObject.value) {
            return {value: duration.value, selected: !duration.selected};
        }
        return duration;
        });

        setSelectedDurations(updatedDurations);
    };

    const classes = className(
        'p-2 flex flex-col items-center'
    );

    return (
        <div className={classes}>
            <div className="flex flex-row mb-8">
                <DropDown options={keyOptions()} value={keySelection} onChange={handleKeySelection}>Key</DropDown>
                <DropDown options={scaleOptions()} value={scaleSelection} onChange={handleScaleSelection}>Scale</DropDown>
                <DropDown options={instrumentOptions()} value={instrumentSelection} onChange={handleInstrumentSelection}>Instrument</DropDown>
            </div>
            <div className="flex flex-col items-center mb-8">
                <SelectableList 
                    options={selectedDurations}
                    onSelect={handleDurationSelection}
                >
                    Durations
                </SelectableList>
            </div>
            {/* Custom scale buttons */}
            <MultiRangeSlider 
                min={MIN_PITCH_NUMBER}
                max={MAX_PITCH_NUMBER}
                minDistance={MIN_PITCH_DISTANCE}
                valueRange={pitchRangeSelection}
                onChangeValues={handlePitchRangeSelection}
                map={pitchNumberMap}
            >
                Range
            </MultiRangeSlider>
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
        </div>
    );
}