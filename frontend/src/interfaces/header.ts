export interface HeaderProps {
    handleOpenInfoBox: () => void,
    generating: boolean,
    handleStopGenerating: () => void,
    handleOpenConfirmDialog: () => void,
    handleStartGenerating: () => Promise<void>
}