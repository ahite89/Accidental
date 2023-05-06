import { useState } from "react";
import DropDown from "./Dropdown";
import { dropDownOption } from "../../types/dropdown";

export default function Interface() {

    const [selection, setSelection] = useState(null);

    const handleSelection = (option: any) => {
        setSelection(option);
    };

    const options: dropDownOption[] = [
        { label: 'C', value: 'c'},
        { label: 'C#', value: 'c-sharp'},
        { label: 'D', value: 'd'}
    ];

    return (
        <div>
            <DropDown options={options} value={selection} onChange={handleSelection} />
        </div>
    );
}