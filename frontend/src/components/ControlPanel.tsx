import { useState } from "react";
import classNames from "classnames";
import DropDown from "./parameters/Dropdown";
import { DropDownOption } from "../types/dropdown";
import { keyOptions, scaleOptions } from "../constants/notes";

export default function ControlPanel() {

    const [keySelection, setKeySelection] = useState<DropDownOption>({ label: 'C', value: 'c'});
    const [scaleSelection, setScaleSelection] = useState<DropDownOption>({ label: 'Major', value: 'major'});

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
            {/* Missing: Slider for pitch range, slider for tempo, note duration buttons, custom scale buttons (MUI button groups?) */}
            {/* For note durations - use small buttons for each note, then assemble their values in an object of booleans ({qrt: true}) */}
        </div>
    );
}