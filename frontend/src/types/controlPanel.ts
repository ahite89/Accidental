export interface ControlPanelProps {
    keySelection: string,
    scaleSelection: string,
    instrumentSelection: string,
    tempoSelection: number,
    volumeSelection: number,
    selectedDurations: string[],
    handleKeySelection: (key: string) => void,
    handleScaleSelection: (scale: string) => void,
    handleInstrumentSelection: (instrument: string) => void,
    handleTempoSelection: (tempo: number) => void,
    handleVolumeSelection: (volume: number) => void,
    handleDurationSelection: (duration: string, selected: boolean) => void,
    handleUpdateStaff: () => void
}