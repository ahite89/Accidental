import { ReactNode } from 'react';

export interface PanelProps {
    children?: ReactNode,
    extraStyling?: string,
    [x: string]: any
}