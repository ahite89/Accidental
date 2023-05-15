import { ButtonProps } from "../../types/button";
import className from 'classnames';

export default function Button({ 
    children,
    primary,
    secondary,
    success,
    warning, 
    outline,
    rounded,
    extraStyling,
    onClick, 
    ...rest
}: ButtonProps) {

    const classes = className('px-3 py-1.5 border', {
        'border-cyan-500 bg-cyan-500 text-white': primary,
        'border-gray-400 bg-gray-400 text-white': secondary,
        'border-green-400 bg-green-400 text-white': success,
        'border-yellow-400 bg-yellow-400 text-white': warning,
        'rounded-full': rounded,
        'bg-white': outline,
        'text-blue-400': outline && primary,
        'text-gray-400': outline && secondary,
        'text-green-400': outline && success,
        'text-yellow-400': outline && warning
    }, extraStyling);

    return (
        <div>
            <button className={classes} onClick={onClick}>
                {children}
            </button>
        </div>
    );
}