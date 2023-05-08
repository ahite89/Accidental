import classNames from "classnames";

export default function Panel({ children, className, ...rest}: any) {
    const finalClassNames = classNames(
        'border rounded p-3 shadow bg-white w-full',
        className
    );
    
    return (
        <div {...rest} className={finalClassNames}>
            {children}
        </div>
    );
}