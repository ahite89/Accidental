import { ReactNode } from 'react';

export interface SelectableProps {
    onClick: () => void,
    children?: ReactNode,
    selected?: boolean,
    selectedStyling?: string
}