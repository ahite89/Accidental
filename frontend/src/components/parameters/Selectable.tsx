import className from 'classnames';
import { SelectableOption } from '../../types/selectable';
import { noteSymbolMap } from '../../constants/maps';

export default function Selectable({ value, selected, onSelect }: SelectableOption) {
    
    const handleOptionClick = (): void => {
        onSelect({value, selected});
    };

    // pass current in and append based on selected status?
    // use string array for current instead?
    
    const classes = className(
        'border cursor-pointer p-2 w-16 text-3xl', {'bg-slate-100': selected}
    );
    
    return (
        <div onClick={handleOptionClick} className={classes}>
            {noteSymbolMap[value]}
        </div>
    );
}