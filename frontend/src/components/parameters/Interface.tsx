import DropDown from "./Dropdown";

export default function Interface() {

    type dropDownOption = {
        label: string,
        value: string
    }

    const options: dropDownOption[] = [
        { label: 'C', value: 'c'},
        { label: 'C#', value: 'c-sharp'},
        { label: 'D', value: 'd'}
    ];

    return (
        <div>
            <DropDown options={options} />
        </div>
    );
}