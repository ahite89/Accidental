import { useState, useEffect, useRef } from "react";
import { dropDownOptions, dropDownOption } from "../../types/dropdown";
import { GoChevronDown } from "react-icons/go";
import Panel from "./Panel";

export default function DropDown({ options, value, onChange, children }: dropDownOptions) {

    const [isOpen, setIsOpen] = useState(false);
    const divEl = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handler = (event: MouseEvent) => {
            if (!divEl.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handler, true);

        return () => {
            document.removeEventListener('click', handler);
        };
    }, []);

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
        <>
            <label className="mr-2 self-center">{children}</label>
            <div ref={divEl} className="w-28 relative">
                <Panel className="flex justify-between items-center cursor-pointer"
                    onClick={handleClick}>
                    {value?.label || 'Select...'}
                    <GoChevronDown className="text-lg" />
                </Panel>
                {isOpen && 
                    <Panel className="absolute top-full">
                        {renderedOptions}
                    </Panel>
                }
            </div>
        </>
    );
}