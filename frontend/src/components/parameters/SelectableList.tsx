import Selectable from './Selectable';
import { SelectableOptions } from "../../interfaces/selectable";

export default function SelectableList({ options, onSelect, children }: SelectableOptions) {

    const renderedSelectables = options.map((duration) => {
       return (
        <Selectable
            key={duration.noteLength}
            duration={duration}
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