export interface HeaderProps {
    handleOpenInfoBox: () => void,
    generating: boolean,
    notesOnStaff: boolean,
    handleStopGenerating: () => void,
    handleStartGenerating: () => Promise<void>,
    handleClearStaves: () => void
}