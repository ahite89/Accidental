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

    debugger

    // Get random pitch
    const validNotesMultiArray = notationObj.validNotesForRandomizing;
    const randomPitchIndex = Math.floor(Math.random() * validNotesMultiArray.length);
    const randomNameAndPitch = validNotesMultiArray[randomPitchIndex];
    
    return { 
        abcName: randomNameAndPitch[0] as string,
        pitchNumber: +randomNameAndPitch[1],
        durationProps: randomDuration,
        timeBetweenNotes: 500 
    };
};