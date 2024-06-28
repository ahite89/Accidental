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
            <label>{children}</label>
            <div className="flex flex-wrap bg-white w-full text-center pt-2">
                {renderedSelectables}
            </div>
        </>
    );
}