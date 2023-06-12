import { durationOptions } from "../constants/durations";
import { DEFAULT_INSTRUMENT } from "../constants/instruments";
import { DEFAULT_KEY } from "../constants/keys";
import { DEFAULT_PITCH_RANGE } from "../constants/pitchRange";
import { DEFAULT_SCALE } from "../constants/scales";
import { DEFAULT_TEMPO } from "../constants/tempo";
import { DEFAULT_VOLUME } from "../constants/volume";
import { SelectableProps } from "./selectable";

export interface ControlPanelProps {
    randomizerParameters: RandomizerParameters
}

export interface RandomizerParameters {
    keySelection: string,
    scaleSelection: string,
    pitchRangeSelection: number[],
    instrumentSelection: string,
    tempoSelection: number,
    volumeSelection: number,
    selectedDurations: SelectableProps[]
}

 export const DEFAULT_RANDOMIZER_PARAMS: RandomizerParameters = {
    keySelection: DEFAULT_KEY,
    scaleSelection: DEFAULT_SCALE,
    pitchRangeSelection: DEFAULT_PITCH_RANGE,
    instrumentSelection: DEFAULT_INSTRUMENT,
    tempoSelection: DEFAULT_TEMPO,
    volumeSelection: DEFAULT_VOLUME,
    selectedDurations: durationOptions
 } 