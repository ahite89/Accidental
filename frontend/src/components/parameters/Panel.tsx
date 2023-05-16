import classNames from "classnames";
import { PanelProps } from "../../types/panel";

export default function Panel({ children, className, ...rest}: PanelProps) {
    const finalClassNames = classNames(
        'border p-2 shadow bg-white w-full',
        className
    );
    
    return (
        <div {...rest} className={finalClassNames}>
            {children}
        </div>
    );
}