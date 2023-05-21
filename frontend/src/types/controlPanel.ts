export interface ControlPanelProps {
    keySelection: string,
    scaleSelection: string,
    instrumentSelection: string,
    tempoSelection: number,
    volumeSelection: number,
    handleKeySelection: (key: string) => void,
    handleScaleSelection: (scale: string) => void,
    handleInstrumentSelection: (instrument: string) => void,
    handleTempoSelection: (tempo: number) => void,
    handleVolumeSelection: (volume: number) => void,
    handleUpdateStaff: () => void
}