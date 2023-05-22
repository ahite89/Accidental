import className from 'classnames';
import { PanelProps } from "../../types/panel";

export default function Panel({ children, extraStyling, clicked, ...rest}: PanelProps) {
    const classes = className(
        'border p-2 shadow bg-white w-full',
        {
            'border-cyan-500 bg-cyan-500': clicked,
        },       
        extraStyling
    );
    
    return (
        <div {...rest} className={classes}>
            {children}
        </div>
    );
}