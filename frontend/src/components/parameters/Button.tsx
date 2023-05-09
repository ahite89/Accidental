import { buttonProps } from "../../types/button";

export default function Button({ children, className, onClick, ...rest }: buttonProps) {
    return (
        <div>
            <button className="px-3 py-1.5 border border-blue-500 bg-blue-500 text-white" onClick={onClick}>{children}</button>
        </div>
    );
}