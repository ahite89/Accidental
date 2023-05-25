import className from 'classnames';
import { SelectableOption } from '../../types/selectable';

export default function Selectable({ value, selected, onSelect }: SelectableOption) {
    
    const handleOptionClick = (): void => {
        onSelect({value, selected});
    };

    // pass current in and append based on selected status?
    // use string array for current instead?
    
    const classes = className(
        'hover:bg-sky-100 border cursor-pointer p-2 w-10', {'bg-slate-200': selected}
    );
    
    return (
        <div onClick={handleOptionClick} className={classes}>
            {value}
        </div>
    );
}