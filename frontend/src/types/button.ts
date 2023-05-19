import { ReactNode } from 'react';

export interface ButtonProps {
    onClick: () => Promise<void> | void,
    children: ReactNode,
    primary?: boolean,
    secondary?: boolean,
    save?: boolean,
    outline?: boolean,
    rounded?: boolean,
    extraStyling?: string,
    [x: string]: any
}