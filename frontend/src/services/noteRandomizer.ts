import { NoteProps } from '../interfaces/note';
import { NotationData } from '../interfaces/notation';

export const getRandomizedNote = (notationObj: NotationData): NoteProps => {

    // Get Random Note
    debugger;
    const validNotesMultiArray = notationObj.validNotesForRandomizing;
    const randomIndex = Math.floor(Math.random() * validNotesMultiArray.length);
    const randomNameAndPitch = validNotesMultiArray[randomIndex];
    return { abcName: randomNameAndPitch[0] as string, pitchNumber: randomNameAndPitch[1] as number, duration: 4, timeBetweenNotes: 2000 };
};