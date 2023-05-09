import { ReactNode } from 'react';

export type buttonProps = {
    onClick: () => Promise<void> | void,
    children?: ReactNode,
    className?: string,
    [x: string]: any
}