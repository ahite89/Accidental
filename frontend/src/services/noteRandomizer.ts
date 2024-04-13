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
    // 1 Minute or 60,000 milliseconds for quarter note
    const selectedTempo = notationObj.randomizerParams.tempoSelection;
    const eighthNoteDurationInMilliseconds = 30000 / selectedTempo
    
    return { 
        abcName: randomNameAndPitch[0] as string,
        pitchNumber: +randomNameAndPitch[1],
        durationProps: randomDuration,
        timeBetweenNotes: eighthNoteDurationInMilliseconds * randomDuration.audioDuration
    };
};