import { ReactNode } from 'react';

export interface SelectableOptions {
    options: SelectableProps[],
    onSelect: (value: SelectableProps) => void,
    children?: ReactNode
}

export interface SelectableOption {
    value: string,
    selected: boolean,
    onSelect: (value: SelectableProps) => void
}

export interface SelectableProps {
    value: string,
    selected: boolean
}