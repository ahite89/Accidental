import { SelectableProps } from "./selectable";

export interface ControlPanelProps {
    randomizerParameters: RandomizerParameters,
    voiceNumber: number,
    onSubmit: (controlPanelParameters: RandomizerParameters, voiceNumber: number) => void,
    handleCloseControlPanel: () => void
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