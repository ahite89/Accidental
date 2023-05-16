import { SliderProps } from "../../types/slider";
import className from 'classnames';

export default function MultiRangeSlider({ min, max, minValue, maxValue, onChangeMin, onChangeMax, minRef, maxRef }: SliderProps) {

    return (
        <>
          <input
            type="range"
            min={min}
            max={max}
            value={minValue}
            ref={minRef}
            onChange={(event) => {
              const newMinValue = Math.min(+event.target.value, maxValue - 1);
              onChangeMin(newMinValue);
              event.target.value = newMinValue.toString();
            }}
            className={className("thumb thumb--zindex-3", {
              "thumb--zindex-5": minValue > maxValue
            })}
          />
          <input
            type="range"
            min={min}
            max={max}
            value={maxValue}
            ref={maxRef}
            onChange={(event) => {
              const newMaxValue = Math.max(+event.target.value, minValue + 1);
              onChangeMax(newMaxValue);
              event.target.value = newMaxValue.toString();
            }}
            className="thumb thumb--zindex-4"
          />
        </>
      );
}