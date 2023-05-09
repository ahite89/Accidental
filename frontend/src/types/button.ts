import { ReactNode } from 'react';

export type ButtonProps = {
    onClick: () => Promise<void> | void,
    children: ReactNode,
    primary?: boolean,
    secondary?: boolean,
    success?: boolean,
    warning?: boolean,
    outline?: boolean,
    rounded?: boolean,
    extraStyling?: string,
    [x: string]: any
}