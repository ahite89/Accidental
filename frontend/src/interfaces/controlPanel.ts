import { SelectableProps } from "./selectable";

export interface ControlPanelProps {
    keySelection: string,
    scaleSelection: string,
    instrumentSelection: string,
    pitchRangeSelection: number[],
    tempoSelection: number,
    volumeSelection: number,
    selectedDurations: SelectableProps[],
    handleKeySelection: (key: string) => void,
    handleScaleSelection: (scale: string) => void,
    handleInstrumentSelection: (instrument: string) => void,
    handlePitchRangeSelection: (pitchRange: number[]) => void,
    handleTempoSelection: (tempo: number) => void,
    handleVolumeSelection: (volume: number) => void,
    handleDurationSelection: (durationObject: SelectableProps) => void
}

export interface RandomizerParameters extends Pick<ControlPanelProps,
 "keySelection" | "scaleSelection" | "pitchRangeSelection" | "selectedDurations">{};