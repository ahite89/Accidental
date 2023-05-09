import { ReactNode } from 'react';

export type dropDownOptions = {
    options: dropDownOption[],
    value: dropDownOption | null,
    onChange: (option: dropDownOption) => void,
    children?: ReactNode
}

export type dropDownOption = {
    label: string,
    value: string
}