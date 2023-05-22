import { ReactNode } from 'react';

export interface PanelProps {
    children?: ReactNode,
    extraStyling?: string,
    clicked?: boolean,
    [x: string]: any
}