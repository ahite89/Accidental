import { NoteProps } from '../interfaces/note';

export const DEFAULT_VALID_NOTES = [['C', 60], ['D', 62], ['E', 64], ['F', 65], ['G', 67], ['A', 69], ['B', 71], ['c', 72]];

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

export const noteDurationSymbolMap: Record<number, string> = {
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

// https://stackoverflow.com/questions/70695492/javascript-map-object-with-multiple-keys-to-one-value
export const scaleToAbcNamePitchNumberMap: Record<string, (string | number)[][]> = {
    'CMajor': DEFAULT_VALID_NOTES,
    'C#Major': [['^C', 61], ['^D', 63], ['^E', 65], ['^F', 66], ['^G', 68], ['^A', 70], ['^B', 72], ['^c', 73]],
    'DbMajor': [['_D', 61], ['_E', 63], ['F', 65], ['_G', 66], ['_A', 68], ['_B', 70], ['c', 72], ['_d', 73]],
    'DMajor': [['D', 62], ['E', 64], ['^F', 66], ['G', 67], ['A', 69], ['B', 71], ['^c', 73], ['d', 74]],
    'EbMajor': [['_E', 63], ['F', 65], ['G', 67], ['_A', 68], ['_B', 70], ['c', 72], ['d', 74], ['_e', 75]],
    'EMajor': [['D', 62], ['E', 64], ['^F', 66], ['G', 67], ['A', 69], ['B', 71], ['^c', 73], ['^d', 75], ['e', 76]],
    'FMajor': [['F', 65], ['G', 67], ['A', 69], ['_B', 70], ['c', 72], ['d', 74], ['e', 76], ['f', 77]],
    'F#Major': [['^F', 66], ['^G', 68], ['^A', 70], ['B', 71], ['^c', 73], ['^d', 75], ['^e', 77], ['^f', 78]],
    'GbMajor': [['_G', 66], ['_A', 68], ['_B', 70], ['_c', 71], ['_d', 73], ['_e', 75], ['f', 77], ['_g', 78]],
    'GMajor': [['G', 67], ['A', 69], ['B', 71], ['c', 72], ['d', 74], ['e', 76], ['^f', 78], ['g', 79]],
    'AbMajor': [['_A', 68], ['_B', 70], ['c', 72], ['_d', 73], ['_e', 75], ['f', 77], ['g', 79], ['_a', 80]],
    'AMajor': [['A', 69], ['B', 71], ['^c', 73], ['d', 74], ['e', 76], ['^f', 78], ['^g', 80], ['a', 81]],
    'BbMajor': [['_B', 70], ['c', 72], ['d', 74], ['_e', 75], ['f', 77], ['g', 79], ['a', 81], ['_b', 82]],
    'BMajor': [['B', 71], ['^c', 73], ['^d', 75], ['e', 76], ['^f', 78], ['^g', 80], ['^a', 82], ['b', 83]],
    'CMinor': [['_E', 63], ['F', 65], ['G', 67], ['_A', 68], ['_B', 70], ['c', 72], ['d', 74], ['_e', 75]],
    'C#Minor': [['D', 62], ['E', 64], ['^F', 66], ['G', 67], ['A', 69], ['B', 71], ['^c', 73], ['d', 74]],
    'DbMinor': [],
    'DMinor': [['F', 65], ['G', 67], ['A', 69], ['_B', 70], ['c', 72], ['d', 74], ['e', 76], ['f', 77]],
    'EbMinor': [['_G', 66], ['_A', 68], ['_B', 70], ['_c', 71], ['_d', 73], ['_e', 75], ['f', 77], ['_g', 78]],
    'EMinor': [['G', 67], ['A', 69], ['B', 71], ['c', 72], ['d', 74], ['e', 76], ['^f', 78], ['g', 79]],
    'FMinor': [['_A', 68], ['_B', 70], ['c', 72], ['_d', 73], ['_e', 75], ['f', 77], ['g', 79], ['_a', 80]],
    'F#Minor': [['A', 69], ['B', 71], ['^c', 73], ['d', 74], ['e', 76], ['^f', 78], ['^g', 80], ['a', 81]],
    'GbMinor': [],
    'GMinor': [['_B', 70], ['c', 72], ['d', 74], ['_e', 75], ['f', 77], ['g', 79], ['a', 81], ['_b', 82]],
    'AbMinor': [],
    'AMinor': DEFAULT_VALID_NOTES,
    'BbMinor': [['_D', 61], ['_E', 63], ['F', 65], ['_G', 66], ['_A', 68], ['_B', 70], ['c', 72], ['_d', 73]],
    'BMinor': [['D', 62], ['E', 64], ['^F', 66], ['G', 67], ['A', 69], ['B', 71], ['^c', 73], ['d', 74]]
};