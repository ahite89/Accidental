import { useState } from "react";
import DropDown from "./Dropdown";
import { dropDownOption } from "../../types/dropdown";

export default function Interface() {

    const [selection, setSelection] = useState<dropDownOption | null>(null);

    const handleSelection = (option: dropDownOption) => {
        setSelection(option);
    };

    const options: dropDownOption[] = [
        { label: 'C', value: 'c'},
        { label: 'C#', value: 'c-sharp'},
        { label: 'D', value: 'd'},
        { label: 'D#', value: 'd-sharp'},
        { label: 'E', value: 'e'}
    ];

    return (
        <div className="flex justify-center mt-8">
            <DropDown options={options} value={selection} onChange={handleSelection}>Key:</DropDown>
        </div>
    );
}