import { ConfirmDialogProps } from "../interfaces/confirmDialog";
import Button from "../components/parameters/Button"

export default function ConfirmDialog({dialogTitle, dialogDescription, onSubmit, handleCloseConfirmDialog}: ConfirmDialogProps) {

    return (
        <div className="flex flex-col">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-10 py-4">
                <p className="text-3xl text-white text-center">{dialogTitle}</p>
            </div>
            <div className="mt-4 p-4">               
                <span className="flex flex-row mb-4 items-center justify-center">
                    {dialogDescription}
                </span>
            </div>
            <div className="flex justify-center mb-4">
                <Button primary extraStyling="mr-4" onClick={onSubmit}>Clear</Button>
                <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
            </div>
        </div>
    );
}