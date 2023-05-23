import { ReactNode } from 'react';

export interface SelectableOptions {
    options: SelectableOption[],
    handleSelectableClick: (value: string, selected: boolean) => void,
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