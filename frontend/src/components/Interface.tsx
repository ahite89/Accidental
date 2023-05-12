import { useState } from "react";
import DropDown from "./parameters/Dropdown";
import { DropDownOption } from "../types/dropdown";

export default function Interface() {

    const [selection, setSelection] = useState<DropDownOption | null>(null);

    const handleSelection = (option: DropDownOption) => {
        setSelection(option);
    };

    const keyOptions: DropDownOption[] = [
        { label: 'C', value: 'c'},
        { label: 'C#', value: 'c-sharp'},
        { label: 'D', value: 'd'},
        { label: 'D#', value: 'd-sharp'},
        { label: 'E', value: 'e'}
    ];

    return (
        <div className="flex justify-center mt-8">
            <DropDown options={keyOptions} value={selection} onChange={handleSelection}>Key:</DropDown>
        </div>
    );
}