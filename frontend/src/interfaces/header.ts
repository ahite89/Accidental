export interface HeaderProps {
    handleOpenInfoBox: () => void,
    generating: boolean,
    handleStopGenerating: () => void,
    handleClearAllStaves: () => void,
    handleOpenConfirmDialog: () => void,
    handleStartGenerating: () => Promise<void>
}