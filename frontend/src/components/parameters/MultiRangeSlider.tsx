import ReactSlider from "react-slider";
import './range-slider.css';
import { MultiSliderProps } from "../../types/slider";

export default function MultiRangeSlider({ min, max, minDistance, minValue, maxValue, onChangeValues, map, children}: MultiSliderProps) {
    return (
        <>
            <label>{children}</label>
            <ReactSlider
                className="horizontal-slider"
                min={min}
                max={max}
                thumbClassName="slider-thumb"
                trackClassName="slider-track"
                defaultValue={[minValue, maxValue]}
                ariaLabel={['Lower thumb', 'Upper thumb']}
                ariaValuetext={state => `Thumb value ${state.valueNow}`}
                renderThumb={(props, state) => {
                    return <div {...props}>{map[state.valueNow]}</div>
                }}
                onChange={(values) => {                
                    onChangeValues(values);
                }}
                pearling
                minDistance={minDistance}
            />
        </>
    );
}