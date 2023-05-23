import className from 'classnames';
import { SelectableProps } from '../../types/selectable';

export default function Selectable({ children, selected, handleSelectableClick, value }: SelectableProps) {
    const classes = className(
        'border p-2 shadow bg-slate-50 border-slate-300 w-10 text-center cursor-pointer',      
        selected ? 'bg-slate-200' : 'bg-slate-50'
    );
    
    return (
        <div onClick={handleSelectableClick} className={classes}>
            {children}
        </div>
    );
}