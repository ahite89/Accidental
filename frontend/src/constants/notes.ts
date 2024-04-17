import { RandomizerParameters } from '../interfaces/controlPanel';
import { NoteProps } from '../interfaces/note';

export const DEFAULT_VALID_NOTES = [['C', 60], ['D', 62], ['E', 64], ['F', 65], ['G', 67], ['A', 69], ['B', 71], ['c', 72]];

export const allNotesAndPitchNumbers = [
    ['A', 33],
    ['#A', 34],
    ['B', 34],
    ['bB', 35],
    ['C', 36],
    ['#C', 37],
    ['bD', 37],
    ['D', 38],
    ['#D', 39],
    ['bE', 39],
    ['E', 40],
    ['F', 41],
    ['#F', 42],
    ['bG', 42],
    ['G', 43],
    ['#G', 44],
    ['Ab', 44],
    ['A', 45],
    ['#A', 46],
    ['bB', 46],
    ['B', 47],
    ['C', 48],
    ['#C', 49],
    ['bD', 49],
    ['D', 50],
    ['#D', 51],
    ['bE', 51],
    ['E', 52],
    ['F', 53],
    ['#F', 54],
    ['bG', 54],
    ['G', 55],
    ['#G', 56],
    ['bA', 56],
    ['A', 57],
    ['#A', 58],
    ['bB', 58],
    ['B', 59],
    ['C', 60],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
]


// Note names for notation (lowest to highest)
// C,, D,, E,, F,, G,, A,, B,, C, D, E, F, G, A, B, C D E F G A B c d e f g a b c' d' e' f' g' a' b', c''
// Sharp: ^c (double = ^^)
// Flat: _B (double = __)
// Natural: =c

// Take in an array of [key, scale] instead?
// Can just use randomizerParams as argument
// Move to noteFetcher service
// Might have to do two multi-arrays; one with sharps and one with flats
// Could add two flags for key - isSharp and isFlat
export const getNotesFromScale = (randomizerParams: RandomizerParameters): (string | number)[][] => {
    // Create an algorithm here that returns the notes from a scale    
    // Find the starting pitch, the lowest possible pitch from the selected scale
    const startingPitchArray = allNotesAndPitchNumbers.find((note) => {
        return note[0].toString() === randomizerParams.keySelection;
    });
    const startingPitchInterval = allNotesAndPitchNumbers.indexOf(startingPitchArray!, 0)

    // ...if sharp key, use sharp scale; if flat key, use flat scale
    // Depending on the scale, the algo will search for the pitches that align with the intervals between notes
    // Ex: Major scale - W,W,H,W,W,W,H => startingPitch + 2 + 2 + 1 + 2 + 2 + 2 + 1
    // Add intervals.ts file to constants folder
    // ...probably contains a record, mapping scale to interval array
    // Search based on lowercase version of abc name?
    // Add abc name to array?
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