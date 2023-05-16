import { SliderProps } from "../../types/slider";
import className from 'classnames';

export default function Slider({ minValue, maxValue, onChangeMin, onChangeMax, minRef, maxRef }: SliderProps) {

    return (
        <>
          <input
            type="range"
            min="0"
            max="1000"
            className="thumb thumb--zindex-3"
          />
          <input
            type="range"
            min="0"
            max="1000"
            className="thumb thumb--zindex-4"
          />
        </>
      );
}