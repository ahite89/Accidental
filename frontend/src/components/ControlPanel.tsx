import { useState, useRef } from "react";
import classNames from "classnames";
import DropDown from "./parameters/Dropdown";
import { DropDownOption } from "../types/dropdown";
import Slider from "./parameters/Slider";
import { keyOptions, scaleOptions } from "../constants/notes";

export default function ControlPanel() {

    const minPitchRef = useRef<number>(null);
    const maxPitchRef = useRef<number>(null);

    const [keySelection, setKeySelection] = useState<DropDownOption>(keyOptions()[0]);
    const [scaleSelection, setScaleSelection] = useState<DropDownOption>(scaleOptions()[0]);
    const [minPitch, setMinPitch] = useState<number>(50);
    const [maxPitch, setMaxPitch] = useState<number>(100);

    const handleSetMinPitch = () => {

    };

    const handleSetMaxPitch = () => {

    };

    const handleKeySelection = (option: DropDownOption) => {
        setKeySelection(option);
    };

    const handleScaleSelection = (option: DropDownOption) => {
        setScaleSelection(option);
    };

    const finalClassNames = classNames(
        'border rounded p-2 shadow bg-white w-full flex justify-center mt-8'
    );

    return (
        <div className={finalClassNames}>
            <DropDown options={keyOptions()} value={keySelection} onChange={handleKeySelection}>Key:</DropDown>
            <DropDown options={scaleOptions()} value={scaleSelection} onChange={handleScaleSelection}>Scale:</DropDown>
            <Slider 
                minValue={minPitch} 
                maxValue={maxPitch} 
                onChangeMin={handleSetMinPitch} 
                onChangeMax={handleSetMaxPitch} 
                minRef={minPitchRef} 
                maxRef={maxPitchRef} 
            />
            {/* Missing: Slider for pitch range, slider for tempo, note duration buttons, custom scale buttons (MUI button groups?) */}
            {/* For note durations - use small buttons for each note, then assemble their values in an object of booleans ({qrt: true}) */}
        </div>
    );
}