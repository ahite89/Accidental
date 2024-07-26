import { useState } from "react";
import Modal from 'react-modal';

import { ConfirmDialogProps } from "../interfaces/confirmDialog";
import Button from "../components/parameters/Button"
import { MODAL_STYLING } from "../constants/modal";

export default function ConfirmDialog({
    dialogTitle, 
    submitButtonText, 
    onSubmit,
    openDialog,
    handleCloseConfirmDialog,
    children
}: ConfirmDialogProps) {

    return (
        <Modal isOpen={openDialog} style={MODAL_STYLING} ariaHideApp={false}>
            <div className="flex flex-col">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-10 py-4">
                    <p className="text-3xl text-white text-center">{dialogTitle}</p>
                </div>
                <div className="mt-4 p-4">               
                    <span className="flex flex-row mb-4 items-center justify-center">
                        {children}
                    </span>
                </div>
                <div className="flex justify-center mb-4">
                    <Button primary extraStyling="mr-4" onClick={onSubmit}>{submitButtonText}</Button>
                    <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
                </div>
            </div>
        </Modal>
    );
}