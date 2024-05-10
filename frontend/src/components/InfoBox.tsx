import { InfoBoxProps } from "../interfaces/infoBox";
import Button from "../components/parameters/Button"
import { MdPlaylistRemove, MdOutlinePlaylistAdd } from 'react-icons/md';

export default function InfoBox({ handleCloseInfoBox }: InfoBoxProps) {

    const appDescription = `Generate fully-randomized melodies that are notated in real time. 
    Adjust the parameters for each voice to suit your specific needs. When you're done generating,
    each voice can be downloaded as a separate MIDI file.`

    const fakeButtonStyling = "mx-2 text-sm px-3 py-1 border border-cyan-500 bg-cyan-500 text-white rounded-full cursor-default";
    const instructionsStyling = "flex flex-row mb-4 items-center justify-center";

    return (
        <div className="divide-y divide-slate-300 p-2 flex flex-col items-center">
            <div>
                <p className="text-xl">Welcome to Accidental!</p>
            </div>
            <div className="my-4 pt-4">
                <div className="flex flex-row mb-8 justify-center text-center">
                    <p>{appDescription}</p>
                </div>
                <span className={instructionsStyling}>
                    Click <button className={fakeButtonStyling}>Start</button>to begin generating,
                    <button className={fakeButtonStyling}>Stop</button>to stop generating,
                    and <button className={fakeButtonStyling}>Clear</button> to clear the staves of all notes.
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
                <Button primary onClick={handleCloseInfoBox}>Got it!</Button>
            </div>
        </div>
    );
}