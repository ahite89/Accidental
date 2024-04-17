import { RandomizerParameters } from '../interfaces/controlPanel';
import { NoteForScaleProps } from '../interfaces/scale';

export const DEFAULT_VALID_NOTES = [['C', 60], ['D', 62], ['E', 64], ['F', 65], ['G', 67], ['A', 69], ['B', 71], ['c', 72]];

export const allNotesAndPitchNumbersSharpKeys = (): NoteForScaleProps[] => [
    {noteName: "A", abcName: "A,,,", pitchNumber: 33},
    {noteName: "A#", abcName: "^A,,,", pitchNumber: 34},
    {noteName: "B", abcName: "B,,,", pitchNumber: 35},
    {noteName: "C", abcName: "C,,", pitchNumber: 36},
    {noteName: "C#", abcName: "^C,,", pitchNumber: 37},
    {noteName: "D", abcName: "D,,", pitchNumber: 38},
    {noteName: "D#", abcName: "^D,,", pitchNumber: 39},
    {noteName: "E", abcName: "E,,", pitchNumber: 40},
    {noteName: "F", abcName: "F,,", pitchNumber: 41},
    {noteName: "F#", abcName: "^F,,", pitchNumber: 42},
    {noteName: "G", abcName: "G,,", pitchNumber: 43},
    {noteName: "G#", abcName: "^G,,", pitchNumber: 44},
    {noteName: "A", abcName: "A,,", pitchNumber: 45},
    {noteName: "A#", abcName: "^A,,", pitchNumber: 46},
    {noteName: "B", abcName: "B,,", pitchNumber: 47},
    {noteName: "C", abcName: "C,", pitchNumber: 48},
    {noteName: "C#", abcName: "^C,", pitchNumber: 49},
    {noteName: "D", abcName: "D,", pitchNumber: 50},
    {noteName: "D#", abcName: "^D,", pitchNumber: 51},
    {noteName: "E", abcName: "E,", pitchNumber: 52},
    {noteName: "F", abcName: "F,", pitchNumber: 53},
    {noteName: "F#", abcName: "^F,", pitchNumber: 54},
    {noteName: "G", abcName: "G,", pitchNumber: 55},
    {noteName: "G#", abcName: "^G,", pitchNumber: 56},
    {noteName: "A", abcName: "A,", pitchNumber: 57},
    {noteName: "A#", abcName: "^A,", pitchNumber: 58},
    {noteName: "B", abcName: "B,", pitchNumber: 59},
    {noteName: "C", abcName: "C", pitchNumber: 60},
    {noteName: "C#", abcName: "^C", pitchNumber: 61},
    {noteName: "D", abcName: "D", pitchNumber: 62},
    {noteName: "D#", abcName: "^D", pitchNumber: 63},
    {noteName: "E", abcName: "E", pitchNumber: 64},
    {noteName: "F", abcName: "F", pitchNumber: 65},
    {noteName: "F#", abcName: "^F", pitchNumber: 66},
    {noteName: "G", abcName: "G", pitchNumber: 67},
    {noteName: "G#", abcName: "^G", pitchNumber: 68},
    {noteName: "A", abcName: "A", pitchNumber: 69},
    {noteName: "A#", abcName: "^A", pitchNumber: 70},
    {noteName: "B", abcName: "B", pitchNumber: 71},
    {noteName: "C", abcName: "c", pitchNumber: 72},
    {noteName: "C#", abcName: "^c", pitchNumber: 73},
    {noteName: "D", abcName: "d", pitchNumber: 74},
    {noteName: "D#", abcName: "^d", pitchNumber: 75},
    {noteName: "E", abcName: "e", pitchNumber: 76},
    {noteName: "F", abcName: "f", pitchNumber: 77},
    {noteName: "F#", abcName: "^f", pitchNumber: 78},
    {noteName: "G", abcName: "g", pitchNumber: 79},
    {noteName: "G#", abcName: "^g", pitchNumber: 80},
    {noteName: "A", abcName: "a", pitchNumber: 81},
    {noteName: "A#", abcName: "^a", pitchNumber: 82},
    {noteName: "B", abcName: "b", pitchNumber: 83},
    {noteName: "C", abcName: "c'", pitchNumber: 84},
    {noteName: "C#", abcName: "^c'", pitchNumber: 85},
    {noteName: "D", abcName: "d'", pitchNumber: 86},
    {noteName: "D#", abcName: "^d'", pitchNumber: 87},
    {noteName: "E", abcName: "e'", pitchNumber: 88},
    {noteName: "F", abcName: "f'", pitchNumber: 89},
    {noteName: "F#", abcName: "^f'", pitchNumber: 90},
    {noteName: "G", abcName: "g'", pitchNumber: 91},
    {noteName: "G#", abcName: "^g'", pitchNumber: 92},
    {noteName: "A", abcName: "a'", pitchNumber: 93},
    {noteName: "A#", abcName: "^a'", pitchNumber: 94},
    {noteName: "B", abcName: "b'", pitchNumber: 95},
    {noteName: "C", abcName: "c''", pitchNumber: 96},
    {noteName: "C#", abcName: "^c''", pitchNumber: 97},
    {noteName: "D", abcName: "d''", pitchNumber: 98},
    {noteName: "D#", abcName: "^d''", pitchNumber: 99},
    {noteName: "E", abcName: "e''", pitchNumber: 100}
]

// Note names for notation (lowest to highest)
// C,, D,, E,, F,, G,, A,, B,, C, D, E, F, G, A, B, C D E F G A B c d e f g a b c' d' e' f' g' a' b', c''
// Sharp: ^c (double = ^^)
// Flat: _B (double = __)
// Natural: =c

export const allNotesAndPitchNumbersFlatKeys = (): NoteForScaleProps[] => [
    {noteName: "A", abcName: "A,,,", pitchNumber: 33},
    {noteName: "Bb", abcName: "_B,,,", pitchNumber: 34},
    {noteName: "B", abcName: "B,,,", pitchNumber: 35},
    {noteName: "C", abcName: "C,,", pitchNumber: 36},
    {noteName: "Db", abcName: "_D,,", pitchNumber: 37},
    {noteName: "D", abcName: "D,,", pitchNumber: 38},
    {noteName: "Eb", abcName: "_E,,", pitchNumber: 39},
    {noteName: "E", abcName: "E,,", pitchNumber: 40},
    {noteName: "F", abcName: "F,,", pitchNumber: 41},
    {noteName: "Gb", abcName: "_G,,", pitchNumber: 42},
    {noteName: "G", abcName: "G,,", pitchNumber: 43},
    {noteName: "Ab", abcName: "_A,,", pitchNumber: 44},
    {noteName: "A", abcName: "A,,", pitchNumber: 45},
    {noteName: "Bb", abcName: "_B,,", pitchNumber: 46},
    {noteName: "B", abcName: "B,,", pitchNumber: 47},
    {noteName: "C", abcName: "C,", pitchNumber: 48},
    {noteName: "Db", abcName: "_D,", pitchNumber: 49},
    {noteName: "D", abcName: "D,", pitchNumber: 50},
    {noteName: "Eb", abcName: "_E,", pitchNumber: 51},
    {noteName: "E", abcName: "E,", pitchNumber: 52},
    {noteName: "F", abcName: "F,", pitchNumber: 53},
    {noteName: "Gb", abcName: "_G,", pitchNumber: 54},
    {noteName: "G", abcName: "G,", pitchNumber: 55},
    {noteName: "Ab", abcName: "_A,", pitchNumber: 56},
    {noteName: "A", abcName: "A,", pitchNumber: 57},
    {noteName: "Bb", abcName: "_B,", pitchNumber: 58},
    {noteName: "B", abcName: "B,", pitchNumber: 59},
    {noteName: "C", abcName: "C", pitchNumber: 60},
    {noteName: "Db", abcName: "_D", pitchNumber: 61},
    {noteName: "D", abcName: "D", pitchNumber: 62},
    {noteName: "Eb", abcName: "_E", pitchNumber: 63},
    {noteName: "E", abcName: "E", pitchNumber: 64},
    {noteName: "F", abcName: "F", pitchNumber: 65},
    {noteName: "Gb", abcName: "_G", pitchNumber: 66},
    {noteName: "G", abcName: "G", pitchNumber: 67},
    {noteName: "Ab", abcName: "_A", pitchNumber: 68},
    {noteName: "A", abcName: "A", pitchNumber: 69},
    {noteName: "Bb", abcName: "_B", pitchNumber: 70},
    {noteName: "B", abcName: "B", pitchNumber: 71},
    {noteName: "C", abcName: "c", pitchNumber: 72},
    {noteName: "Db", abcName: "_d", pitchNumber: 73},
    {noteName: "D", abcName: "d", pitchNumber: 74},
    {noteName: "Eb", abcName: "_e", pitchNumber: 75},
    {noteName: "E", abcName: "e", pitchNumber: 76},
    {noteName: "F", abcName: "f", pitchNumber: 77},
    {noteName: "Gb", abcName: "_g", pitchNumber: 78},
    {noteName: "G", abcName: "g", pitchNumber: 79},
    {noteName: "Ab", abcName: "_a", pitchNumber: 80},
    {noteName: "A", abcName: "a", pitchNumber: 81},
    {noteName: "Bb", abcName: "_b", pitchNumber: 82},
    {noteName: "B", abcName: "b", pitchNumber: 83},
    {noteName: "C", abcName: "c'", pitchNumber: 84},
    {noteName: "Db", abcName: "_d'", pitchNumber: 85},
    {noteName: "D", abcName: "d'", pitchNumber: 86},
    {noteName: "Eb", abcName: "_e'", pitchNumber: 87},
    {noteName: "E", abcName: "e'", pitchNumber: 88},
    {noteName: "F", abcName: "f'", pitchNumber: 89},
    {noteName: "Gb", abcName: "_g'", pitchNumber: 90},
    {noteName: "G", abcName: "g'", pitchNumber: 91},
    {noteName: "Ab", abcName: "_a'", pitchNumber: 92},
    {noteName: "A", abcName: "a'", pitchNumber: 93},
    {noteName: "Bb", abcName: "_b'", pitchNumber: 94},
    {noteName: "B", abcName: "b'", pitchNumber: 95},
    {noteName: "C", abcName: "c''", pitchNumber: 96},
    {noteName: "Db", abcName: "_d''", pitchNumber: 97},
    {noteName: "D", abcName: "d''", pitchNumber: 98},
    {noteName: "Eb", abcName: "_e''", pitchNumber: 99},
    {noteName: "E", abcName: "e''", pitchNumber: 100}
]

// Take in an array of [key, scale] instead?
// Can just use randomizerParams as argument
// Move to noteFetcher service
// Could add two flags for key - isSharp and isFlat
export const getNotesFromScale = (randomizerParams: RandomizerParameters): (string | number)[][] => {
    // Create an algorithm here that returns the notes from a scale    
    // Find the starting pitch, the lowest possible pitch from the selected scale
    const startingPitchArray = allNotesAndPitchNumbersFlatKeys().find((note) => {
        return note.noteName === randomizerParams.keySelection;
    });
    const startingPitchInterval = allNotesAndPitchNumbersFlatKeys().indexOf(startingPitchArray!, 0)

    // ...if sharp key, use sharp scale; if flat key, use flat scale
    // Depending on the scale, the algo will search for the pitches that align with the intervals between notes
    
    // Make this a record
    return DEFAULT_VALID_NOTES;
};

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