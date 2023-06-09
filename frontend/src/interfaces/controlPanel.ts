import { durationOptions } from "../constants/durations";
import { DEFAULT_KEY } from "../constants/keys";
import { DEFAULT_PITCH_RANGE } from "../constants/pitchRange";
import { DEFAULT_SCALE } from "../constants/scales";
import { SelectableProps } from "./selectable";

export interface ControlPanelProps {
    keySelection: string,
    scaleSelection: string,
    instrumentSelection: string,
    pitchRangeSelection: number[],
    volumeSelection: number,
    selectedDurations: SelectableProps[],
    handleKeySelection: (key: string) => void,
    handleScaleSelection: (scale: string) => void,
    handleInstrumentSelection: (instrument: string) => void,
    handlePitchRangeSelection: (pitchRange: number[]) => void,
    handleVolumeSelection: (volume: number) => void,
    handleDurationSelection: (durationObject: SelectableProps) => void
}

export interface RandomizerParameters extends Pick<ControlPanelProps,
 "keySelection" | "scaleSelection" | "pitchRangeSelection" | "selectedDurations">{};

 export const DEFAULT_RANDOMIZER_PARAMS: RandomizerParameters = {
    keySelection: DEFAULT_KEY,
    scaleSelection: DEFAULT_SCALE,
    pitchRangeSelection: DEFAULT_PITCH_RANGE,
    selectedDurations: durationOptions
 } 