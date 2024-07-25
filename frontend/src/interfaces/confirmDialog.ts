export interface ConfirmDialogProps {
    dialogTitle: string,
    dialogDescription: string,
    handleCloseConfirmDialog: () => void,
    onSubmit: () => void
}