import className from 'classnames';
import { SelectableOption } from '../../types/selectable';

export default function Selectable({ label, value, styling, selected, onSelect }: SelectableOption) {
    
    const handleOptionClick = (): void => {
        onSelect(value, !selected);
    };
    
    const classes = className(
        'flex shadow bg-white w-full text-center'    
    );
    
    return (
        <div onClick={handleOptionClick} className={classes}>
            {label}
        </div>
    );
}