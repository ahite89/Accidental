import { ReactNode } from 'react';

export interface SelectableOptions {
    options: SelectableProps[],
    onSelect: (value: SelectableProps) => void,
    children?: ReactNode
}

export interface SelectableOption {
    value: number,
    selected: boolean,
    onSelect: (value: SelectableProps) => void
}

export interface SelectableProps {
    value: number,
    selected: boolean
}