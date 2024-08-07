import Modal from 'react-modal';
import Button from "../components/parameters/Button"

import { InfoBoxProps } from "../interfaces/infoBox";
import { MdPlaylistRemove, MdOutlinePlaylistAdd } from 'react-icons/md';
import { MODAL_STYLING } from "../constants/modal";

export default function InfoBox({ handleCloseInfoBox, openInfoBox }: InfoBoxProps) {

    const appDescription = `Generate unique, fully-randomized melodies that are notated in real time.
    Adjust the parameters for each voice to suit your specific needs. When done,
    each voice can be downloaded as a separate MIDI file.`

    const fakeButtonStyling = "mx-2 text-sm px-3 py-1 border border-blue-500 bg-blue-500 text-white rounded-full cursor-default";
    const instructionsStyling = "flex flex-row mb-4 items-center justify-center";

    return (
        <Modal isOpen={openInfoBox} style={MODAL_STYLING} ariaHideApp={false}>
            <div className="flex flex-col">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-10 py-4">
                    <p className="text-3xl text-white text-center">Hi, Welcome to Accidental!</p>
                </div>
                <div className="mt-4 p-4">
                    <div className="flex flex-row mb-8 pb-6 justify-center text-center border-0 border-b border-slate-200">
                        <p>{appDescription}</p>
                    </div>
                    <span className={instructionsStyling}>
                        Click <button className={fakeButtonStyling}>Start</button>to begin generating,
                        <button className={fakeButtonStyling}>Stop</button>to stop generating,
                        and <button className={fakeButtonStyling}>Clear All</button> to clear the staves of all notes.
                    </span>
                    <span className={instructionsStyling}>
                        Click <MdOutlinePlaylistAdd className="text-2xl text-blue-500 mx-2" /> to add a new staff
                        and <MdPlaylistRemove className="text-2xl text-blue-500 mx-2" /> to remove a staff.
                    </span>
                    <span className={instructionsStyling}>
                        To adjust randomization parameters, simply click a staff to open up its control panel.
                    </span>
                </div>
                <div className="flex justify-center mb-4">
                    <Button primary onClick={handleCloseInfoBox}>Start Generating!</Button>
                </div>
            </div>
        </Modal>
    );
}