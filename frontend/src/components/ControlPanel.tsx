import { useState } from "react";
import className from "classnames";

import DropDown from "./parameters/Dropdown";
import MultiRangeSlider from "./parameters/MultiRangeSlider";
import RangeSlider from "./parameters/RangeSlider";
import SelectableList from './parameters/SelectableList';

import { ControlPanelProps } from "../interfaces/controlPanel";
import { keyOptions } from "../constants/keys";
import { scaleOptions } from "../constants/scales";
import { instrumentOptions } from "../constants/instruments";
import { pitchNumberMap } from "../constants/maps";
import { 
    MIN_PITCH_DISTANCE,
    MIN_PITCH_NUMBER,
    MAX_PITCH_NUMBER,
    MIN_TEMPO,
    MAX_TEMPO,
    TEMPO_INTERVAL,
    MIN_VOLUME,
    MAX_VOLUME,
    VOLUME_INTERVAL
} from "../constants/integers";

export default function ControlPanel({ 
        keySelection,
        scaleSelection,
        instrumentSelection,
        minPitchSelection,
        maxPitchSelection,
        tempoSelection,
        volumeSelection,
        selectedDurations,
        handleKeySelection,
        handleScaleSelection,
        handleInstrumentSelection,
        handleSetPitchRange,
        handleTempoSelection,
        handleVolumeSelection,
        onSelect,
    }: ControlPanelProps) {

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
                    onSelect={onSelect}
                >
                    Duration
                </SelectableList>
            </div>
            {/* Custom scale buttons */}
            <MultiRangeSlider 
                min={MIN_PITCH_NUMBER}
                max={MAX_PITCH_NUMBER}
                minDistance={MIN_PITCH_DISTANCE}
                minValue={minPitchSelection}
                maxValue={maxPitchSelection}
                onChangeValues={handleSetPitchRange}
                map={pitchNumberMap}
            >
                Range
            </MultiRangeSlider>
            <RangeSlider
                min={MIN_TEMPO}
                max={MAX_TEMPO}
                value={tempoSelection}
                onChangeValue={handleTempoSelection}
                interval={TEMPO_INTERVAL}
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