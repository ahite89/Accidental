import ReactSlider from "react-slider";
import './range-slider.css';
import { MultiSliderProps } from "../../interfaces/slider";

export default function MultiRangeSlider({ min, max, minDistance, valueRange, onChangeValues, map, children}: MultiSliderProps) {
    return (
        <>
            <label>{children}</label>
            <ReactSlider
                className="horizontal-slider"
                min={min}
                max={max}
                thumbClassName="slider-thumb"
                trackClassName="multi-slider-track"
                defaultValue={valueRange}
                ariaLabel={['Lower thumb', 'Upper thumb']}
                ariaValuetext={state => `Thumb value ${state.valueNow}`}
                renderThumb={(props, state) => {
                    return <div {...props}>{map[state.valueNow]}</div>
                }}
                onChange={(values) => onChangeValues(values)}
                pearling
                minDistance={minDistance}
            />
        </>
    );
}