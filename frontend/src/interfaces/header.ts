export interface HeaderProps {
    handleOpenInfoBox: () => void,
    generating: boolean,
    notesOnStaff: boolean,
    handleStopGenerating: () => void,
    handleOpenConfirmDialog: () => void,
    handleStartGenerating: () => Promise<void>
}