import { ButtonProps } from "../../types/button";

export default function Button({ children, className, onClick, ...rest }: ButtonProps) {
    return (
        <div>
            <button className="px-3 py-1.5 border border-blue-400 bg-blue-400 text-white" onClick={onClick}>{children}</button>
        </div>
    );
}