export interface ControlPanelProps {
    keySelection: string,
    scaleSelection: string,
    instrumentSelection: string,
    tempoSelection: number,
    handleKeySelection: (key: string) => void,
    handleScaleSelection: (scale: string) => void,
    handleInstrumentSelection: (instrument: string) => void,
    handleTempoSelection: (tempo: number) => void,
    handleUpdateStaff: () => void
}