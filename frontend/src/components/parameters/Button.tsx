import { ButtonProps } from "../../types/button";

export default function Button({ children, className, onClick, ...rest }: ButtonProps) {
    return (
        <div>
            <button className="px-3 py-1.5 border border-blue-500 bg-blue-500 text-white" onClick={onClick}>{children}</button>
        </div>
    );
}