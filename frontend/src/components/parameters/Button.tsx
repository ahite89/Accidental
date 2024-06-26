import { ButtonProps } from "../../interfaces/button";
import className from 'classnames';

export default function Button({ 
    children,
    disabled,
    primary,
    outline,
    rounded,
    extraStyling,
    onClick, 
    ...rest
}: ButtonProps) {

    const classes = className('px-6 py-3', {
        'border border-cyan-500 bg-cyan-500 text-white hover:opacity-75': primary,
        'border border-slate-400 bg-slate-400 text-white hover:opacity-100': disabled,
        'rounded-full': rounded,
        'bg-transparent border border-white text-white hover:bg-cyan-500': outline
    }, extraStyling);

    return (
        <div>
            <button disabled={disabled} {...rest} className={classes} onClick={onClick}>
                {children}
            </button>
        </div>
    );
}