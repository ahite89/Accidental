import { ReactNode } from "react";

export interface SliderProps {
    min: number,
    max: number,
    value: number,
    onChangeValue: (value: number) => void,
    children?: ReactNode
}

// NEED TO OMIT SOME PROPS FROM THIS INHERITANCE (VALUE, ONCHANGEVALUE)
export interface MultiSliderProps extends Omit<SliderProps, 'value' | 'onChangeValue'> {
    minDistance: number,
    minValue: number,
    maxValue: number,
    onChangeValues: (values: number[]) => void,
    map: Record<number | string, number | string>,
}