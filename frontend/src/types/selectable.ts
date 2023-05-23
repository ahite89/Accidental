import { ReactNode } from 'react';

export interface SelectableOptions {
    options: SelectableOption[],
    value: string | null,
    onSelect: (value: string) => void,
    children?: ReactNode,
}

export interface SelectableOption {
    label: string,
    value: string,
    selected: boolean
}

export interface SelectableProps {
    children?: ReactNode,
    extraStyling?: string,
    [x: string]: any
}