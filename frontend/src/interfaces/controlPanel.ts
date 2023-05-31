import { SelectableProps } from "./selectable";

export interface ControlPanelProps {
    keySelection: string,
    scaleSelection: string,
    instrumentSelection: string,
    tempoSelection: number,
    volumeSelection: number,
    selectedDurations: SelectableProps[],
    handleKeySelection: (key: string) => void,
    handleScaleSelection: (scale: string) => void,
    handleInstrumentSelection: (instrument: string) => void,
    handleTempoSelection: (tempo: number) => void,
    handleVolumeSelection: (volume: number) => void,
    onSelect: (durationObject: SelectableProps) => void
}