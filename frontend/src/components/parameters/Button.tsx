import { ButtonProps } from "../../interfaces/button";
import className from 'classnames';

export default function Button({ 
    children,
    disabled,
    primary,
    outline,
    rounded,
    cancel,
    extraStyling,
    onClick, 
    ...rest
}: ButtonProps) {

    const classes = className('px-6 py-3', {
        'border border-cyan-500 bg-cyan-500 text-white button-primary': primary,
        'border border-slate-400 bg-slate-400 text-white button-disabled': disabled,
        'hover:bg-slate-200': cancel,
        'rounded-full': rounded,
        'bg-transparent border border-white text-white hover:bg-cyan-500 button-outline': outline
    }, extraStyling);

    return (
        <div>
            <button disabled={disabled} {...rest} className={classes} onClick={onClick}>
                {children}
            </button>
        </div>
    );
}