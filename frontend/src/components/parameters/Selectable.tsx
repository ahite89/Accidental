import className from 'classnames';
import { SelectableOption } from '../../interfaces/selectable';
import { noteDurationSymbolMap } from '../../constants/durations';

export default function Selectable({ duration, onSelect }: SelectableOption) {
    
    const handleOptionClick = (): void => {
        onSelect({
            noteLength: duration.noteLength,
            selected: duration.selected,
            abcSyntax: duration.abcSyntax,
            audioDuration: duration.audioDuration
        });
    };
    
    const classes = className(
        'border shadow cursor-pointer p-1 w-14 text-3xl', {'bg-slate-100': duration.selected}
    );
    
    return (
        <div onClick={handleOptionClick} className={classes}>
            {noteDurationSymbolMap[duration.noteLength]}
        </div>
    );
}