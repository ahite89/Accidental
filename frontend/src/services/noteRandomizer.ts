import { NoteProps } from '../interfaces/note';
import { RandomizerParameters } from '../interfaces/controlPanel';
import { fetchValidNotes } from './noteFetcher';

export const getRandomizedNote = (randomizerParameters: RandomizerParameters): NoteProps => {

    // Default parameters coming in:
    // Key: C (string)
    // Scale: Major (string)
    // Durations: Quarter Note (number) = 2
    // Range: 48-84 aka C3-C6 (number[])
    // Volume: 40 (number)
    // Tempo: 100 (number)

    // Get Random Note

    // let randomIndex: number
    // randomIndex = Math.floor(Math.random() * currentIndex);

    debugger;
    const keyAndScale = `${randomizerParameters.keySelection}${randomizerParameters.scaleSelection}`;
    const validNotes = fetchValidNotes(keyAndScale);
    const randomNote: NoteProps = {abcName: 'C', pitchNumber: 60, duration: 4, timeBetweenNotes: 2000};

    // Result from parameters
    // const notesForRandomization: NoteProps[] = [
        // {abcName: 'C,', pitchNumber: 48, duration: 2, timeBetweenNotes: 1000},
        // {abcName: 'D,', pitchNumber: 50, duration: 2, timeBetweenNotes: 1000},
        // {abcName: 'E,', pitchNumber: 52, duration: 2, timeBetweenNotes: 1000},
        // {abcName: 'F,', pitchNumber: 53, duration: 2, timeBetweenNotes: 1000},
        // {abcName: 'G,', pitchNumber: 55, duration: 2, timeBetweenNotes: 1000},
        // {abcName: 'A,', pitchNumber: 57, duration: 2, timeBetweenNotes: 1000},
        // {abcName: 'B,', pitchNumber: 59, duration: 4, timeBetweenNotes: 2000},
        // {abcName: 'C', pitchNumber: 60, duration: 4, timeBetweenNotes: 2000},
        // {abcName: 'D', pitchNumber: 62, duration: 2, timeBetweenNotes: 1000},
        // {abcName: 'E', pitchNumber: 64, duration: 2, timeBetweenNotes: 1000},
        // {abcName: 'F', pitchNumber: 65, duration: 2, timeBetweenNotes: 1000},
        // {abcName: 'G', pitchNumber: 67, duration: 2, timeBetweenNotes: 1000},
        // {abcName: 'A', pitchNumber: 69, duration: 2, timeBetweenNotes: 1000},
        // {abcName: 'B', pitchNumber: 71, duration: 1, timeBetweenNotes: 500},
        // {abcName: 'c', pitchNumber: 72, duration: 1, timeBetweenNotes: 500},
        // {abcName: 'd', pitchNumber: 74, duration: 1, timeBetweenNotes: 500},
        // {abcName: 'e', pitchNumber: 76, duration: 1, timeBetweenNotes: 500},
        // {abcName: 'f', pitchNumber: 77, duration: 1, timeBetweenNotes: 500},
        // {abcName: 'g', pitchNumber: 79, duration: 2, timeBetweenNotes: 1000},
        // {abcName: 'a', pitchNumber: 81, duration: 2, timeBetweenNotes: 1000},
        // {abcName: 'b', pitchNumber: 83, duration: 2, timeBetweenNotes: 1000},
        // {abcName: "c'", pitchNumber: 84, duration: 2, timeBetweenNotes: 1000}
    // ];

    return randomNote;
};

// Note names for notation (lowest to highest)
// C,, D,, E,, F,, G,, A,, B,, C, D, E, F, G, A, B, C D E F G A B c d e f g a b c' d' e' f' g' a' b', c''
// Sharp: ^c (double = ^^)
// Flat: _B (double = __)
// Natural: =c

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

// export const pitchNumberMap: Record<number, string> = {
//     36: 'C2',
//     37: 'C#2',
//     38: 'D2',
//     39: 'D#2',
//     40: 'E2',
//     41: 'F2',
//     42: 'F#2',
//     43: 'G2',
//     44: 'G#2',
//     45: 'A2',
//     46: 'A#2',
//     47: 'B2',
//     48: 'C3',
//     49: 'C#3',
//     50: 'D3',
//     51: 'D#3',
//     52: 'E3',
//     53: 'F3',
//     54: 'F#3',
//     55: 'G3',
//     56: 'G#3',
//     57: 'A3',
//     58: 'A#3',
//     59: 'B3',
//     60: 'C4',
//     61: 'C#4',
//     62: 'D4',
//     63: 'D#4',
//     64: 'E4',
//     65: 'F4',
//     66: 'F#4',
//     67: 'G4',
//     68: 'G#4',
//     69: 'A4',
//     70: 'A#4',
//     71: 'B4',
//     72: 'C5',
//     73: 'C#5',
//     74: 'D5',
//     75: 'D#5',
//     76: 'E5',
//     77: 'F5',
//     78: 'F#5',
//     79: 'G5',
//     80: 'G#5',
//     81: 'A5',
//     82: 'A#5',
//     83: 'B5',
//     84: 'C6',
//     85: 'C#6',
//     86: 'D6',
//     87: 'D#6',
//     88: 'E6',
//     89: 'F6',
//     90: 'F#6',
//     91: 'G6',
//     92: 'G#6',
//     93: 'A6',
//     94: 'A#6',
//     95: 'B6',
//     96: 'C7'
// };