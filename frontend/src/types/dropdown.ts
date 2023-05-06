export interface dropDownOptions {
    options: dropDownOption[],
    value: dropDownOption | null,
    onChange: (option: any) => void
}

export type dropDownOption = {
    label: string,
    value: string
}