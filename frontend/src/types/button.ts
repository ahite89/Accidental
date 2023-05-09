import { ReactNode } from 'react';

export type ButtonProps = {
    onClick: () => Promise<void> | void,
    children?: ReactNode,
    className?: string,
    [x: string]: any
}