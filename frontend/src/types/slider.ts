import { ReactNode } from "react";

export type SliderProps = {
    minDistance: number;
    minValue: number,
    maxValue: number,
    onChangeValues: (values: number[]) => void,
    children?: ReactNode
}