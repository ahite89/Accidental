import { useState } from "react";
import classNames from "classnames";
import DropDown from "./parameters/Dropdown";
import { DropDownOption } from "../types/dropdown";

export default function ControlPanel() {

    const [keySelection, setKeySelection] = useState<DropDownOption>({ label: 'C', value: 'c'});
    const [scaleSelection, setScaleSelection] = useState<DropDownOption>({ label: 'Major', value: 'major'});

    const handleKeySelection = (option: DropDownOption) => {
        setKeySelection(option);
    };

    const handleScaleSelection = (option: DropDownOption) => {
        setScaleSelection(option);
    };

    const keyOptions: DropDownOption[] = [
        { label: 'C', value: 'c'},
        { label: 'C#', value: 'c-sharp'},
        { label: 'D', value: 'd'},
        { label: 'D#', value: 'd-sharp'},
        { label: 'E', value: 'e'}
    ];

    const scaleOptions: DropDownOption[] = [
        { label: 'Major', value: 'major'},
        { label: 'Minor', value: 'minor'},
        { label: 'Dorian', value: 'dorian'},
        { label: 'Phrygian', value: 'phrygian'},
        { label: 'Lydian', value: 'lydian'}
    ];

    const finalClassNames = classNames(
        'border rounded p-2 shadow bg-white w-full flex justify-center mt-8'
    );

    return (
        <div className={finalClassNames}>
            <DropDown options={keyOptions} value={keySelection} onChange={handleKeySelection}>Key:</DropDown>
            <DropDown options={scaleOptions} value={scaleSelection} onChange={handleScaleSelection}>Scale:</DropDown>
        </div>
    );
}