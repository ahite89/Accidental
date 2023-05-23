import { useState } from 'react';
import Selectable from './Selectable';
import { SelectableOption, SelectableOptions } from "../../types/selectable";

export default function SelectableList({ options, handleSelectableClick, children }: SelectableOptions) {

    //const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (option: SelectableOption) => {
        handleSelectableClick(option.value, !option.selected);
    };

    const renderedSelectables = options.map((option) => {
       return (
        <div className="hover:bg-sky-100"
            onClick={() => handleOptionClick(option)} key={option.value}>
            {option.label}
        </div>
       );         
    });

    return (
        <div className="flex flex-row">
            <Selectable>
                {renderedSelectables}
            </Selectable>
        </div>
    );
}