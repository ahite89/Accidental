import { NoteProps } from '../interfaces/note';

export const defaultNotes: NoteProps[] = [
    // Duration: 1 = 8th, 2 = quarter, 3 = dotted quarter, 4 = half, etc.
    {abcName: 'C', pitchNumber: 60, duration: 1, timeBetweenNotes: 500},
    {abcName: 'D', pitchNumber: 62, duration: 2, timeBetweenNotes: 1000},
    {abcName: 'E', pitchNumber: 64, duration: 1, timeBetweenNotes: 500},
    {abcName: 'F', pitchNumber: 65, duration: 2, timeBetweenNotes: 1000},
    {abcName: 'G', pitchNumber: 67, duration: 1, timeBetweenNotes: 500},
    {abcName: 'A', pitchNumber: 69, duration: 2, timeBetweenNotes: 1000},
    {abcName: 'B', pitchNumber: 71, duration: 4, timeBetweenNotes: 2000},
];

export const noteSymbolMap: Record<number, string> = {
    16: "\uD834\uDD61",
    8: "\uD834\uDD60",
    4: "\uD834\uDD5F",
    2: "\uD834\uDD5E",
    1: "\uD834\uDD5D"
};

// Note names for notation (lowest to highest)
// C,, D,, E,, F,, G,, A,, B,, C, D, E, F, G, A, B, C D E F G A B c d e f g a b c' d' e' f' g' a' b', c''
// Sharp: ^c (double = ^^)
// Flat: _B (double = __)
// Natural: =c