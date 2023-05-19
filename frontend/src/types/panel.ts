import { ReactNode } from 'react';

export interface PanelProps {
    children?: ReactNode,
    className: string,
    [x: string]: any
}