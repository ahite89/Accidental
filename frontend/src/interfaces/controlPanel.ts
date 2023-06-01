import { SelectableProps } from "./selectable";

export interface ControlPanelProps {
    keySelection: string,
    scaleSelection: string,
    instrumentSelection: string,
    minPitchSelection: number,
    maxPitchSelection: number,
    tempoSelection: number,
    volumeSelection: number,
    selectedDurations: SelectableProps[],
    handleKeySelection: (key: string) => void,
    handleScaleSelection: (scale: string) => void,
    handleInstrumentSelection: (instrument: string) => void,
    handleSetPitchRange: (pitchRange: number[]) => void,
    handleTempoSelection: (tempo: number) => void,
    handleVolumeSelection: (volume: number) => void,
    onSelect: (durationObject: SelectableProps) => void
}