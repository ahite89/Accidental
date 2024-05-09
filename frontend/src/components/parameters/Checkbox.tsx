import { CheckboxProps } from "../../interfaces/checkbox";

export default function Checkbox({checked, onCheck, label}: CheckboxProps) {

    const handleCheck = () => {
        onCheck(!checked);
    }

    return (
        <label>
            <input type="checkbox" checked={checked} onChange={handleCheck} />
            {label}
        </label>
    );
};