import { NoteProps } from '../interfaces/note';
import { NotationData } from '../interfaces/notation';
import { NoteForScaleProps } from '../interfaces/scale';

export const getRandomizedNote = (notationObj: NotationData): NoteProps => {

    // Get random duration
    const selectedDurations = notationObj.randomizerParams.durationSelection.filter((duration) => {
        return duration.selected;
    });
    const randomDurationIndex = Math.floor(Math.random() * selectedDurations.length);
    const randomDuration = selectedDurations[randomDurationIndex];

    // Default object to use for rests
    let randomNameAndPitch: NoteForScaleProps = {abcName: "", noteName: ""};

    if (!randomDuration.isRest) {
        // Get random pitch
        let validNotesMultiArray = notationObj.validNotesForRandomizing;

        // Limit number of steps between notes based on steps param
        if (notationObj.previousNotePitch) {
            const previousNotePitchIndex = validNotesMultiArray.findIndex((note) => note.pitchNumber === notationObj.previousNotePitch);
            const steps = notationObj.randomizerParams.stepsSelection;
            const lowestPitchIndex = previousNotePitchIndex - steps < 0 ? 0 : previousNotePitchIndex - steps;
            const highestPitchIndex = previousNotePitchIndex + steps + 1 > validNotesMultiArray.length - 1 ?
                validNotesMultiArray.length - 1: previousNotePitchIndex + steps + 1;
            validNotesMultiArray = validNotesMultiArray.slice(lowestPitchIndex, highestPitchIndex);
            if (!notationObj.randomizerParams.repeatNoteSelection) {
            validNotesMultiArray = validNotesMultiArray.filter(note => note.pitchNumber !== notationObj.previousNotePitch);
            }
        }

        const randomPitchIndex = Math.floor(Math.random() * validNotesMultiArray.length);
        randomNameAndPitch = validNotesMultiArray[randomPitchIndex];
    }

    // Get time between notes based on selected tempo
    // Use 1 Minute (60,000 milliseconds) to calculate for quarter note
    const selectedTempo = notationObj.randomizerParams.tempoSelection;
    const eighthNoteDurationInMilliseconds = 30000 / selectedTempo
    
    return { 
        abcName: randomNameAndPitch.abcName,
        pitchNumber: randomNameAndPitch.pitchNumber,
        durationProps: randomDuration,
        timeBetweenNotes: eighthNoteDurationInMilliseconds * randomDuration.audioDuration,
        isRest: randomDuration.isRest
    };
};