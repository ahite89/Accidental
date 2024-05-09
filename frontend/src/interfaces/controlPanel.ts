import { Instruments } from "../constants/instruments";
import { MajorKeys, MinorKeys } from "../constants/keys";
import { Scales } from "../constants/scales";
import { DurationProps } from "./selectable";

export interface ControlPanelProps {
    randomizerParameters: RandomizerParameters,
    voiceNumber: number,
    onSubmit: (controlPanelParameters: RandomizerParameters, voiceNumber: number) => void,
    handleCloseControlPanel: () => void
}

export interface RandomizerParameters {
    keySelection: MajorKeys | MinorKeys,
    scaleSelection: Scales,
    pitchRangeSelection: number[],
    instrumentSelection: Instruments,
    stepsSelection: number,
    repeatNoteSelection: boolean,
    tempoSelection: number,
    volumeSelection: number,
    durationSelection: DurationProps[]
}