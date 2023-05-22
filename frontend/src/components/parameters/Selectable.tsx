import className from 'classnames';
import { SelectableProps } from '../../types/selectable';

export default function Selectable({ children, selected, selectedStyling, onClick }: SelectableProps) {
    const classes = className(
        'border p-2 shadow bg-slate-100 border-slate-300 w-10 text-center cursor-pointer',      
        selectedStyling
    );
    
    return (
        <div onClick={onClick} className={classes}>
            {children}
        </div>
    );
}