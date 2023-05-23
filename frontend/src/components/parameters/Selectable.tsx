import className from 'classnames';
import { SelectableProps } from '../../types/selectable';

export default function Selectable({ children, selected, handleSelectableClick, value }: SelectableProps) {
    const classes = className(
        'flex shadow bg-white w-full text-center'    
    );
    
    return (
        <div onClick={handleSelectableClick} className={classes}>
            {children}
        </div>
    );
}