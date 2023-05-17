import { ReactNode } from "react";

export type SliderProps = {
    min: number,
    max: number,
    minDistance: number,
    minValue: number,
    maxValue: number,
    onChangeValues: (values: number[]) => void,
    children?: ReactNode
}