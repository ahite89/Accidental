import { ReactNode } from 'react';

export interface SelectableOptions {
    options: DurationProps[],
    onSelect: (value: DurationProps) => void,
    children?: ReactNode
}

export interface SelectableOption {
    duration: DurationProps,
    onSelect: (value: DurationProps) => void
}

export interface DurationProps {
    noteLength: string,
    selected: boolean,
    abcSyntax: string,
    audioDuration: number,
    isRest?: boolean
}