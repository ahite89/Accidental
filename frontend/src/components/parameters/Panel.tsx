import className from 'classnames';
import { PanelProps } from "../../interfaces/panel";

export default function Panel({ children, extraStyling, ...rest}: PanelProps) {
    const classes = className(
        'border p-2 shadow bg-white w-full',      
        extraStyling
    );
    
    return (
        <div {...rest} className={classes}>
            {children}
        </div>
    );
}