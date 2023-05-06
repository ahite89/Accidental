import { useState } from "react";
import { dropDownOptions, dropDownOption } from "../../types/dropdown";
import { GoChevronDown } from "react-icons/go";

export default function DropDown({ options, value, onChange }: dropDownOptions) {

    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: dropDownOption) => {
        setIsOpen(false);
        onChange(option);
    };

    const renderedOptions = options.map((option) => {
       return (
        <div className="hover:bg-sky-100 rounded cursor-pointer p-1"
            onClick={() => handleOptionClick(option)} key={option.value}>
            {option.label}
        </div>
       );         
    });

    return (
        <div className="w-48 relative">
            <div className="flex justify-between items-center cursor-pointer rounded p-3 shadow bg-white w-full"
                onClick={handleClick}>
                {value?.label || 'Select...'}
                <GoChevronDown className="text-lg" />
            </div>
            {isOpen && <div className="absolute top-full border rounded p-3 shadow bg-white w-full">{renderedOptions}</div>}
        </div>
    );
}