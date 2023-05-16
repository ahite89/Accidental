import { useState } from "react";
import classNames from "classnames";
import DropDown from "./parameters/Dropdown";
import { DropDownOption } from "../types/dropdown";
import RangeSlider from "./parameters/RangeSlider";
import { keyOptions, scaleOptions, MIN_PITCH_DISTANCE, MIN_PITCH_NUMBER, MAX_PITCH_NUMBER } from "../constants/notes";

export default function ControlPanel() {

    const [keySelection, setKeySelection] = useState<DropDownOption>(keyOptions()[0]);
    const [scaleSelection, setScaleSelection] = useState<DropDownOption>(scaleOptions()[0]);
    const [minAssignedPitch, setMinAssignedPitch] = useState<number>(MIN_PITCH_NUMBER);
    const [maxAssignedPitch, setMaxAssignedPitch] = useState<number>(MAX_PITCH_NUMBER);

    const handleSetPitchRange = (pitchRange: number[]): void => {
        setMinAssignedPitch(pitchRange[0]);
        setMaxAssignedPitch(pitchRange[1]);
        console.log(minAssignedPitch, maxAssignedPitch);
    };

    const handleKeySelection = (option: DropDownOption): void => {
        setKeySelection(option);
    };

    const handleScaleSelection = (option: DropDownOption): void => {
        setScaleSelection(option);
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
                </div>
                <RangeSlider 
                    minDistance={MIN_PITCH_DISTANCE} 
                    minValue={minAssignedPitch}
                    maxValue={maxAssignedPitch}
                    onChangeValues={handleSetPitchRange}
                >
                    Pitch Range
                </RangeSlider>          
                {/* Missing: Slider for pitch range, slider for tempo, note duration buttons, custom scale buttons (MUI button groups?) */}
                {/* For note durations - use small buttons for each note, then assemble their values in an object of booleans ({qrt: true}) */}
            </div>
        </>
    );
}