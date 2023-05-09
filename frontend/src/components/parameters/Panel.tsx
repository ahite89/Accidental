import classNames from "classnames";
import { ReactNode } from 'react';

type PanelProps = {
    children?: ReactNode,
    className: string,
    [x: string]: any
}

export default function Panel({ children, className, ...rest}: PanelProps) {
    const finalClassNames = classNames(
        'border rounded p-2 shadow bg-white w-full',
        className
    );
    
    return (
        <div {...rest} className={finalClassNames}>
            {children}
        </div>
    );
}