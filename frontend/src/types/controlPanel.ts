export type ControlPanelProps = {
    keySelection: string,
    scaleSelection: string,
    instrumentSelection: string,
    handleKeySelection: (key: string) => void,
    handleScaleSelection: (scale: string) => void,
    handleInstrumentSelection: (instrument: string) => void,
    handleUpdateStaff: () => void
}