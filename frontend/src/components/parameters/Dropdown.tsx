import { useState } from "react";
import { dropDownOptions } from "../../types/dropdown";

export default function DropDown({ options }: dropDownOptions) {

    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: any) => {
        setIsOpen(false);
    };

    const renderedOptions = options.map((option) => {
       return <div onClick={() => handleOptionClick(option)} id={option.value}>
            {option.label}
       </div>         
    });

    return (
        <div>
            <div onClick={handleClick}>Select Key</div>
            {isOpen && <div>{renderedOptions}</div>}
        </div>
    );
}