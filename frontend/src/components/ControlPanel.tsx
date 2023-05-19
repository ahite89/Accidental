import { useState } from "react";
import classNames from "classnames";
import DropDown from "./parameters/Dropdown";
import MultiRangeSlider from "./parameters/MultiRangeSlider";
import RangeSlider from "./parameters/RangeSlider";
import Button from "./parameters/Button";
import { keyOptions } from "../constants/keys";
import { scaleOptions } from "../constants/scales";
import { instrumentOptions } from "../constants/instruments";
import { pitchNumberMap } from "../constants/maps";
import { MIN_PITCH_DISTANCE, MIN_PITCH_NUMBER, MAX_PITCH_NUMBER } from "../constants/notes";
import { ControlPanelProps } from "../types/controlPanel";

export default function ControlPanel({ 
        keySelection,
        scaleSelection,
        instrumentSelection,
        handleKeySelection,
        handleScaleSelection,
        handleInstrumentSelection,
        handleUpdateStaff 
    }: ControlPanelProps) {

    // Sliders
    const [minAssignedPitch, setMinAssignedPitch] = useState<number>(MIN_PITCH_NUMBER);
    const [maxAssignedPitch, setMaxAssignedPitch] = useState<number>(MAX_PITCH_NUMBER);

    const handleSetPitchRange = (pitchRange: number[]): void => {
        setMinAssignedPitch(pitchRange[0]);
        setMaxAssignedPitch(pitchRange[1]);
        console.log(minAssignedPitch, maxAssignedPitch);
    };

    const finalClassNames = classNames(
        'border rounded p-2 shadow bg-white flex flex-col items-center mx-2 my-10'
    );

    return (
        <div className={finalClassNames}>
            <div className="flex flex-row">
                <DropDown options={keyOptions()} value={keySelection} onChange={handleKeySelection}>Key</DropDown>
                <DropDown options={scaleOptions()} value={scaleSelection} onChange={handleScaleSelection}>Scale</DropDown>
                <DropDown options={instrumentOptions()} value={instrumentSelection} onChange={handleInstrumentSelection}>Instrument</DropDown>
            </div>
            <MultiRangeSlider 
                min={MIN_PITCH_NUMBER}
                max={MAX_PITCH_NUMBER}
                minDistance={MIN_PITCH_DISTANCE}
                minValue={minAssignedPitch}
                maxValue={maxAssignedPitch}
                onChangeValues={handleSetPitchRange}
                map={pitchNumberMap}
            >
                Pitch Range
            </MultiRangeSlider>
            {/* Tempo slider */}
            <RangeSlider
                min={60}
                max={180}
                value={120}
                onChangeValue={undefined}
            >
                Tempo
            </RangeSlider>
            {/* Volume slider */}
            {/* Note duration buttons (assemble values in object of bools) */}
            {/* Custom scale buttons */}
            <Button save rounded onClick={handleUpdateStaff}>Save Changes</Button>
        </div>
    );
}