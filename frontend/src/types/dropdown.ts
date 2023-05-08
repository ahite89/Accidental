export type dropDownOptions = {
    options: dropDownOption[],
    value: dropDownOption | null,
    onChange: (option: dropDownOption) => void
}

export type dropDownOption = {
    label: string,
    value: string
}