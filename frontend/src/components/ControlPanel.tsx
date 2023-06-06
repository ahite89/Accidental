import className from "classnames";

import DropDown from "./parameters/Dropdown";
import MultiRangeSlider from "./parameters/MultiRangeSlider";
import RangeSlider from "./parameters/RangeSlider";
import SelectableList from './parameters/SelectableList';

import { ControlPanelProps } from "../interfaces/controlPanel";
import { keyOptions } from "../constants/keys";
import { scaleOptions } from "../constants/scales";
import { instrumentOptions } from "../constants/instruments";
import { pitchNumberMap } from "../constants/pitchRange";
import { MIN_PITCH_DISTANCE, MIN_PITCH_NUMBER, MAX_PITCH_NUMBER } from "../constants/pitchRange";
import { MIN_VOLUME, MAX_VOLUME, VOLUME_INTERVAL } from "../constants/volume";

export default function ControlPanel({ 
        keySelection,
        scaleSelection,
        instrumentSelection,
        pitchRangeSelection,
        volumeSelection,
        selectedDurations,
        handleKeySelection,
        handleScaleSelection,
        handleInstrumentSelection,
        handlePitchRangeSelection,
        handleVolumeSelection,
        handleDurationSelection,
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