import { ReactNode } from "react";

export interface ConfirmDialogProps {
    dialogTitle: string,
    submitButtonText: string,
    handleCloseConfirmDialog: () => void,
    onSubmit: () => void,
    openDialog: boolean,
    children: ReactNode;
}