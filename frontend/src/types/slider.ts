export type SliderProps = {
    minDistance: number;
    minValue: number,
    maxValue: number,
    onChangeValues: (values: number[]) => void,
    minRef?: React.MutableRefObject<null>,
    maxRef?: React.MutableRefObject<null>
}