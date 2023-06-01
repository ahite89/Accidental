import { ReactNode } from "react";

export interface SliderProps {
    min: number,
    max: number,
    value: number,
    interval: number,
    onChangeValue: (value: number) => void,
    children?: ReactNode
}

export interface MultiSliderProps extends Omit<SliderProps, 'value' | 'interval' | 'onChangeValue'> {
    minDistance: number,
    valueRange: number[],
    onChangeValues: (values: number[]) => void,
    map: Record<number | string, number | string>
}