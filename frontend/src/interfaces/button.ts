import { ReactNode } from 'react';

export interface ButtonProps {
    onClick: () => Promise<void> | void,
    children: ReactNode,
    disabled?: boolean
    primary?: boolean,
    secondary?: boolean,
    cancel?: boolean,
    outline?: boolean,
    rounded?: boolean,
    extraStyling?: string,
    [x: string]: any
}