export interface HeaderProps {
    handleOpenInfoBox: () => void,
    generating: boolean,
    handleStopGenerating: () => void,
    handleClearAllStaves: () => void,
    handleStartGenerating: () => Promise<void>
}