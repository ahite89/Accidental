import { useState } from 'react';
import Selectable from './Selectable';
import { SelectableOption, SelectableOptions } from "../../types/selectable";

export default function SelectableList({ options, onSelect, children }: SelectableOptions) {

    //const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (option: SelectableOption): void => {
        onSelect(option.value);
    };

    const renderedSelectables = options.map((option) => {
       return (
        <div className="hover:bg-sky-100 border cursor-pointer p-2 w-10"
            onClick={() => handleOptionClick(option)} key={option.value}>
            {option.label}
        </div>
       );         
    });

    return (
        <>
            <label className="mb-2">{children}</label>
            <Selectable>
                {renderedSelectables}
            </Selectable>
        </>
    );
}