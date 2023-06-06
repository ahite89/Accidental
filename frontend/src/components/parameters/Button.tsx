import { ButtonProps } from "../../interfaces/button";
import className from 'classnames';

export default function Button({ 
    children,
    primary,
    secondary,
    save, 
    outline,
    rounded,
    extraStyling,
    onClick, 
    ...rest
}: ButtonProps) {

    const classes = className('px-3 py-1.5 border', {
        'border-cyan-500 bg-cyan-500 text-white': primary,
        'border-gray-400 bg-gray-400 text-white': secondary,
        'border-blue-500 bg-blue-500 text-white': save,
        'rounded-full': rounded,
        'bg-transparent border-blue-500 text-blue-500': outline
    }, extraStyling);

    return (
        <div>
            <button {...rest} className={classes} onClick={onClick}>
                {children}
            </button>
        </div>
    );
}