import ReactSlider from "react-slider";
import './range-slider.css';
import { SliderProps } from "../../types/slider";

export default function RangeSlider({minDistance, minValue, maxValue, onChangeValues, minRef, maxRef}: SliderProps) {
    return (
        <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            defaultValue={[minValue, maxValue]}
            ariaLabel={['Lower thumb', 'Upper thumb']}
            ariaValuetext={state => `Thumb value ${state.valueNow}`}
            renderThumb={(props, state) => {
                return <div {...props}>{state.valueNow}</div>
            }}
            onChange={(values) => {                
                onChangeValues(values);
            }}
            pearling
            minDistance={minDistance}
        />
    );
}