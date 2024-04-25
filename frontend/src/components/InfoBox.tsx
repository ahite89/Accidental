import { InfoBoxProps } from "../interfaces/infoBox";
import Button from "../components/parameters/Button"

export default function InfoBox({ handleCloseInfoBox }: InfoBoxProps) {

    const appDescription = `This application takes in parameters set by the user
    (key, pitch range, note durations, etc.) and produces a randomized melodic line.
    The melody is audible as it generates, and the notes appear as music notation on the page in real time.
    The user can then download the melodies as MIDI files and use them however they wish.
    This app is intended to test the dichotomy between randomness and control - 
    while potentially making pleasant music in the process.`

    return (
        <div className="p-2 flex flex-col items-center">
            <div className="mb-8">
                <h3>Welcome to Accidental!</h3>
            </div>
            <div className="mb-8">
                <p>{appDescription}</p>
            </div>
            <div className="flex justify-center mb-4">
                <Button primary onClick={handleCloseInfoBox}>Got it!</Button>
            </div>
        </div>
    );
}