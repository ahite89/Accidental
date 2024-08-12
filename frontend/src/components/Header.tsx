import { useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import ConfirmDialog from "./ConfirmDialog";

import Button from "./parameters/Button";
import { HeaderProps } from "../interfaces/header";

export default function Header({ 
    handleOpenInfoBox, 
    handleStartGenerating, 
    handleStopGenerating,
    handleClearStaves,
    handlePlayback,
    generating,
    notesOnStaff 
}: HeaderProps) {

    const [openClearStavesDialog, setOpenClearStavesDialog] = useState<boolean>(false);
    
    const handleSubmitClearStaves = () => {
        handleClearStaves();
        setOpenClearStavesDialog(false);
    };
    
    return (
        <>
            <header className="bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-between px-10 py-6">
                <p className="text-white text-2xl border-white border-2 border-solid p-2 rounded self-center">
                    &#9838;ccidental
                </p>
                <div className="flex flex-row justify-center self-center">
                {!generating &&
                    <Button extraStyling="mr-4 text-xl" outline rounded onClick={handleStartGenerating}>
                        Start
                    </Button>
                }
                {generating &&
                    <Button extraStyling="mr-4 text-xl" outline rounded onClick={handleStopGenerating}>
                        Stop
                    </Button>
                }
                {(!generating && notesOnStaff) &&
                    <Button extraStyling="mr-4 text-xl" outline rounded onClick={handlePlayback}>
                        Replay
                    </Button>
                }
                {(!generating && notesOnStaff) &&
                    <Button extraStyling="mr-4 text-xl" outline rounded onClick={() => setOpenClearStavesDialog(true)}>
                        Clear All
                    </Button>
                }           
                </div>
                <Button onClick={handleOpenInfoBox}>
                    <MdInfoOutline className="text-white text-4xl self-center" />
                </Button>
            </header>
            {openClearStavesDialog && 
                <ConfirmDialog 
                    openDialog={openClearStavesDialog}
                    dialogTitle="Clear Staves" 
                    submitButtonText="Clear" 
                    onSubmit={handleSubmitClearStaves} 
                    handleCloseConfirmDialog={() => setOpenClearStavesDialog(false)}>
                        Are you sure you want to clear all staves?
                </ConfirmDialog>
            }
        </>
    );
}