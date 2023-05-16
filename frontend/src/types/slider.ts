export type SliderProps = {
    minValue: number,
    maxValue: number,
    onChangeMin: () => void,
    onChangeMax: () => void,
    minRef?: React.RefObject<number>,
    maxRef?: React.RefObject<number>
}