import Selectable from './Selectable';
import { SelectableOption, SelectableOptions } from "../../types/selectable";

export default function SelectableList({ options, onSelect, children }: SelectableOptions) {

    const renderedSelectables = options.map((option) => {
       return (
        <Selectable
            key={option.value}
            label={option.label}
            value={option.value}
            styling="hover:bg-sky-100 border cursor-pointer p-2 w-10"
            selected={option.selected}
            onSelect={onSelect}
        />
       );
    });

    return (
        <>
            <label className="mb-2">{children}</label>
            <div>
                {renderedSelectables}
            </div>
        </>
    );
}