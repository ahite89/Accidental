import { ReactNode } from 'react';

export interface DropDownOptions {
    options: DropDownOption[],
    value: string | null,
    onChange: (value: any) => void,
    children?: ReactNode
}

export interface DropDownOption {
    label: string,
    value: string
}