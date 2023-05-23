import { useState, useEffect, useRef } from "react";
import { DropDownOptions, DropDownOption } from "../../types/dropdown";
import { GoChevronDown } from "react-icons/go";
import Panel from "./Panel";

export default function DropDown({ options, value, onChange, children }: DropDownOptions) {

    const [isOpen, setIsOpen] = useState(false);
    const divEl = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handler = (event: MouseEvent): void => {
            if (!divEl.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handler, true);

        return () => {
            document.removeEventListener('click', handler);
        };
    }, []);

    const handleClick = (): void => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: DropDownOption): void => {
        setIsOpen(false);
        onChange(option.value);
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
        <div ref={divEl} className="w-40 relative mr-4">
            <label>{children}</label>
            <Panel extraStyling="flex justify-between items-center cursor-pointer mt-1"
                onClick={handleClick}>
                {value || 'Select...'}
                <GoChevronDown className="text-lg" />
            </Panel>
            {isOpen && 
                <Panel extraStyling="absolute top-full z-10">
                    {renderedOptions}
                </Panel>
            }
        </div>
    );
}