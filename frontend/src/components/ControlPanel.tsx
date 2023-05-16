import { useState } from "react";
import classNames from "classnames";
import DropDown from "./parameters/Dropdown";
import { DropDownOption } from "../types/dropdown";
import RangeSlider from "./parameters/RangeSlider";
import { keyOptions, scaleOptions, instrumentOptions, MIN_PITCH_DISTANCE, MIN_PITCH_NUMBER, MAX_PITCH_NUMBER } from "../constants/notes";

export default function ControlPanel() {

    // Dropdowns
    const [keySelection, setKeySelection] = useState<DropDownOption>(keyOptions()[0]);
    const [scaleSelection, setScaleSelection] = useState<DropDownOption>(scaleOptions()[0]);
    const [instrumentSelection, setInstrumentSelection] = useState<DropDownOption>(instrumentOptions()[0]);

    const handleKeySelection = (option: DropDownOption): void => {
        setKeySelection(option);
        // use string instead for option value
    };

    const handleScaleSelection = (option: DropDownOption): void => {
        setScaleSelection(option);
    };

    const handleInstrumentSelection = (option: DropDownOption): void => {
        setInstrumentSelection(option);
        console.log(option.label, option.value);
    };

    // Sliders
    const [minAssignedPitch, setMinAssignedPitch] = useState<number>(MIN_PITCH_NUMBER);
    const [maxAssignedPitch, setMaxAssignedPitch] = useState<number>(MAX_PITCH_NUMBER);

    const handleSetPitchRange = (pitchRange: number[]): void => {
        setMinAssignedPitch(pitchRange[0]);
        setMaxAssignedPitch(pitchRange[1]);
        console.log(minAssignedPitch, maxAssignedPitch);
    };

    const finalClassNames = classNames(
        'border rounded p-2 shadow bg-white w-full flex flex-col items-center mt-8'
    );

    return (
        <>
            <div className={finalClassNames}>
                <div className="flex flex-row">
                    <DropDown options={keyOptions()} value={keySelection} onChange={handleKeySelection}>Key:</DropDown>
                    <DropDown options={scaleOptions()} value={scaleSelection} onChange={handleScaleSelection}>Scale:</DropDown>
                    <DropDown options={instrumentOptions()} value={instrumentSelection} onChange={handleInstrumentSelection}>Instrument:</DropDown>
                </div>
                <RangeSlider 
                    minDistance={MIN_PITCH_DISTANCE} 
                    minValue={minAssignedPitch}
                    maxValue={maxAssignedPitch}
                    onChangeValues={handleSetPitchRange}
                >
                    Pitch Range
                </RangeSlider>
                {/* Tempo slider */}
                {/* Volume slider */}
                {/* Note duration buttons (assemble values in object of bools) */}
                {/* Custom scale buttons */}
            </div>
        </>
    );
}