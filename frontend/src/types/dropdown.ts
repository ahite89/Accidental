import { ReactNode } from 'react';

export type DropDownOptions = {
    options: DropDownOption[],
    value: string | null,
    onChange: (value: string) => void,
    children?: ReactNode
}

export type DropDownOption = {
    label: string,
    value: string
}