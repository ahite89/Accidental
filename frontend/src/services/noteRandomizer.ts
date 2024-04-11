import { NoteProps } from '../interfaces/note';
import { RandomizerParameters } from '../interfaces/controlPanel';
import { fetchValidNotes } from './noteFetcher';

export const getRandomizedNote = (randomizerParameters: RandomizerParameters): NoteProps => {

    // Get Random Note
    debugger;
    const keyAndScale = `${randomizerParameters.keySelection}${randomizerParameters.scaleSelection}`;
    const validNotesMultiArray = fetchValidNotes(keyAndScale);
    const randomIndex = Math.floor(Math.random() * validNotesMultiArray.length);
    const randomNameAndPitch = validNotesMultiArray[randomIndex];
    return { abcName: randomNameAndPitch[0] as string, pitchNumber: randomNameAndPitch[1] as number, duration: 4, timeBetweenNotes: 2000 };
};