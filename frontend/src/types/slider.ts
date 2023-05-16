export type SliderProps = {
    min: number,
    max: number,
    minValue: number,
    maxValue: number,
    onChangeMin: (minPitch: number) => void,
    onChangeMax: (maxPitch: number) => void,
    minRef: React.MutableRefObject<null>,
    maxRef: React.MutableRefObject<null>
}