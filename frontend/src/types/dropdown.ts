import { ReactNode } from 'react';

export type DropDownOptions = {
    options: DropDownOption[],
    value: DropDownOption | null,
    onChange: (option: DropDownOption) => void,
    children?: ReactNode
}

export type DropDownOption = {
    label: string,
    value: string
}