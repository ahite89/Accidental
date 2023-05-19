import ReactSlider from "react-slider";
import './range-slider.css';
import { SliderProps } from "../../types/slider";

export default function RangeSlider({ min, max, value, onChangeValue, children}: SliderProps) {
    return (
        <>
            <label>{children}</label>
            <ReactSlider
                className="horizontal-slider"
                min={min}
                max={max}
                thumbClassName="slider-thumb"
                trackClassName="slider-track"
                defaultValue={value}
                ariaLabel={'Thumb'}
                ariaValuetext={state => `Thumb value ${state.valueNow}`}
                renderThumb={(props, state) => {
                    return <div {...props}>{state.valueNow}</div>
                }}
                onChange={(value) => onChangeValue(value)}
                pearling
            />
        </>
    );
}