import { NoteProps } from '../interfaces/note';

export const defaultNotes: NoteProps[] = [
    // Duration: 1 = 8th, 2 = quarter, 3 = dotted quarter, 4 = half, etc.
    {name: 'C', pitchNumber: 60, duration: 1, timeBetweenNotes: 500},
    {name: 'D', pitchNumber: 62, duration: 2, timeBetweenNotes: 1000},
    {name: 'E', pitchNumber: 64, duration: 1, timeBetweenNotes: 500},
    {name: 'F', pitchNumber: 65, duration: 2, timeBetweenNotes: 1000},
    {name: 'G', pitchNumber: 67, duration: 1, timeBetweenNotes: 500},
    {name: 'A', pitchNumber: 69, duration: 2, timeBetweenNotes: 1000},
    {name: 'B', pitchNumber: 71, duration: 4, timeBetweenNotes: 2000},
];