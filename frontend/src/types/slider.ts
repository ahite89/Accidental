import { ReactNode } from "react";

export type SliderProps = {
    min: number,
    max: number,
    minDistance: number,
    minValue: number,
    maxValue: number,
    onChangeValues: (values: number[]) => void,
    map: Record<number | string, number | string>,
    children?: ReactNode
}