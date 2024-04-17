import { NoteProps } from '../interfaces/note';
import { NotationData } from '../interfaces/notation';

export const getRandomizedNote = (notationObj: NotationData): NoteProps => {

    // Get random duration
    debugger
    const selectedDurations = notationObj.randomizerParams.durationSelection.filter((duration) => {
        return duration.selected;
    });
    const randomDurationIndex = Math.floor(Math.random() * selectedDurations.length);
    const randomDuration = selectedDurations[randomDurationIndex];

    // Get random pitch
    const validNotesMultiArray = notationObj.validNotesForRandomizing;
    const randomPitchIndex = Math.floor(Math.random() * validNotesMultiArray.length);
    const randomNameAndPitch = validNotesMultiArray[randomPitchIndex];

    // Get time between notes based on selected tempo
    // Use 1 Minute (60,000 milliseconds) to calculate for quarter note
    const selectedTempo = notationObj.randomizerParams.tempoSelection;
    const eighthNoteDurationInMilliseconds = 30000 / selectedTempo
    
    return { 
        abcName: randomNameAndPitch.abcName,
        pitchNumber: randomNameAndPitch.pitchNumber,
        durationProps: randomDuration,
        timeBetweenNotes: eighthNoteDurationInMilliseconds * randomDuration.audioDuration
    };
};