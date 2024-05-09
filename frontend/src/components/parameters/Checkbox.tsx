import { CheckboxProps } from "../../interfaces/checkbox";

export default function Checkbox({checked, onCheck, label, extraStyling}: CheckboxProps) {

    const handleCheck = () => {
        onCheck(!checked);
    }

    return (
        <div className={extraStyling}>
            <label>
                <input className="scale-125" type="checkbox" checked={checked} onChange={handleCheck} />
                <span className="mx-2">
                    {label}
                </span>
            </label>
        </div>
    );
};