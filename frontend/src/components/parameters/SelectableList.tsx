import Selectable from './Selectable';
import { SelectableOption, SelectableOptions } from "../../types/selectable";

export default function SelectableList({ options, onSelect, children }: SelectableOptions) {

    const renderedSelectables = options.map((option) => {
       return (
        <Selectable
            key={option.value}
            value={option.value}
            selected={option.selected}
            onSelect={onSelect}
        />
       );
    });

    return (
        <>
            <label className="mb-2">{children}</label>
            <div className="flex shadow bg-white w-full text-center">
                {renderedSelectables}
            </div>
        </>
    );
}