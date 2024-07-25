import { MdInfoOutline } from "react-icons/md";
import Modal from 'react-modal';
import ConfirmDialog from "./ConfirmDialog";
import { MODAL_STYLING } from "../constants/modal";
import Button from "./parameters/Button";
import className from 'classnames';
import { HeaderProps } from "../interfaces/header";

export default function Header({ 
    handleOpenInfoBox, 
    handleStartGenerating, 
    handleStopGenerating,
    handleOpenConfirmDialog,
    handleCloseConfirmDialog,
    openConfirmDialog,
    handleClearStaves,
    generating,
    notesOnStaff 
}: HeaderProps) {

    const classes = className({
        'button-info': !generating,
        'button-disabled': generating      
    });
    
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
                    <Button extraStyling="mr-4 text-xl" outline rounded onClick={handleOpenConfirmDialog}>
                        Clear All
                    </Button>
                }
            {/* <Button disabled={isGenerating.current} extraStyling="mr-4 border border-2 border-white" primary rounded onClick={handlePlayback}>
                Play
            </Button> */}
            </div>
                <Button onClick={handleOpenInfoBox} extraStyling={classes}>
                    <MdInfoOutline className="text-white text-4xl self-center" />
                </Button>
            </header>
            <Modal isOpen={openConfirmDialog} style={MODAL_STYLING} ariaHideApp={false}>
                {openConfirmDialog && 
                <ConfirmDialog 
                    dialogTitle="Clear Staves" 
                    dialogDescription="Are you sure you want to clear all staves?" 
                    onSubmit={handleClearStaves} 
                    handleCloseConfirmDialog={handleCloseConfirmDialog} />
                }
            </Modal>
        </>
    );
}