import { NoteProps } from '../interfaces/note';
import { RandomizerParameters } from '../interfaces/controlPanel';
import { fetchValidNotes } from './noteFetcher';
import { pitchNumberAbcNameMap } from '../constants/notes';

export const getRandomizedNote = (randomizerParameters: RandomizerParameters): NoteProps => {

    // Get Random Note
    debugger;
    const keyAndScale = `${randomizerParameters.keySelection}${randomizerParameters.scaleSelection}`;
    const validNotes = fetchValidNotes(keyAndScale);
    const randomIndex = Math.floor(Math.random() * validNotes.length);
    const randomPitch = validNotes[randomIndex];
    return {abcName: pitchNumberAbcNameMap[randomPitch], pitchNumber: randomPitch, duration: 4, timeBetweenNotes: 2000};
};

// const defaultNotes: NoteProps[] = [
//     // Duration: 1 = 8th, 2 = quarter, 3 = dotted quarter, 4 = half, etc.
//     {abcName: 'C', pitchNumber: 60, duration: 1, timeBetweenNotes: 500},
//     {abcName: 'D', pitchNumber: 62, duration: 2, timeBetweenNotes: 1000},
//     {abcName: 'E', pitchNumber: 64, duration: 1, timeBetweenNotes: 500},
//     {abcName: 'F', pitchNumber: 65, duration: 2, timeBetweenNotes: 1000},
//     {abcName: 'G', pitchNumber: 67, duration: 1, timeBetweenNotes: 500},
//     {abcName: 'A', pitchNumber: 69, duration: 2, timeBetweenNotes: 1000},
//     {abcName: 'B', pitchNumber: 71, duration: 4, timeBetweenNotes: 2000},
// ];