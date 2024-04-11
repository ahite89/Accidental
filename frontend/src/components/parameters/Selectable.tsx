import className from 'classnames';
import { SelectableOption } from '../../interfaces/selectable';
import { noteDurationSymbolMap } from '../../constants/notes';

export default function Selectable({ value, selected, onSelect }: SelectableOption) {
    
    const handleOptionClick = (): void => {
        onSelect({value, selected});
    };

    // pass current in and append based on selected status?
    // use string array for current instead?
    
    const classes = className(
        'border cursor-pointer p-1 w-14 text-3xl', {'bg-slate-100': selected}
    );
    
    return (
        <div onClick={handleOptionClick} className={classes}>
            {noteDurationSymbolMap[value]}
        </div>
    );
}