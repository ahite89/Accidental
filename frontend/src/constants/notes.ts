import { NoteProps } from '../types/note';
import { DropDownOption } from '../types/dropdown';

export const MAX_BEATS_PER_BAR = 8;

export const defaultNotes: NoteProps[] = [
    // Duration: 1 = 8th, 2 = quarter, 3 = dotted quarter, 4 = half, etc.
    {name: 'C', pitchNumber: 60, duration: 1, timeBetweenNotes: 500},
    {name: 'D', pitchNumber: 62, duration: 2, timeBetweenNotes: 1000},
    {name: 'E', pitchNumber: 64, duration: 1, timeBetweenNotes: 500},
    {name: 'F', pitchNumber: 65, duration: 2, timeBetweenNotes: 1000},
    {name: 'G', pitchNumber: 67, duration: 1, timeBetweenNotes: 500},
    {name: 'A', pitchNumber: 69, duration: 2, timeBetweenNotes: 1000},
    {name: 'B', pitchNumber: 71, duration: 4, timeBetweenNotes: 2000},
]

export const noteDurationMap: Record<string, string> = {
    '.5': '16n',
    '.75': '16n.',
    '1': '8n',
    '1.5': '8n.',
    '2': '4n',
    '3': '4n.',
    '4': '2n',
    '6': '2n.',
    '8': '1n',
    '12': '1n.'
}

enum Keys {
    C = 'C',
    CSharp = 'C#',
    DFlat = 'Db',
    D = 'D',
    DSharp = 'D#',
    EFlat = 'Eb',
    E = 'E',
    F = 'F',
    FSharp = 'F#',
    GFlat = 'Gb',
    G = 'G',
    GSharp = 'G#',
    AFlat = 'Ab',
    A = 'A',
    ASharp = 'A#',
    BFlat = 'Bb',
    B = 'B'
}

export const keyOptions: DropDownOption[] = [
    { label: Keys.C, value: 'c'},
    { label: 'C#', value: 'c-sharp'},
    { label: 'D', value: 'd'},
    { label: 'D#', value: 'd-sharp'},
    { label: 'E', value: 'e'}
];

enum Scales {
    Major = 'Major',
    Minor = 'Minor',
    HarmonicMinor = 'HarmonicMinor',
    Dorian = 'Dorian',
    Phrygian = 'Phrygian',
    Lydian = 'Lydian',
    Mixolydian = 'Mixolydian',
    Locrian = 'Locrian',
    Chromatic = 'Chromatic',
    WholeTone = 'WholeTone',
    Pentatonic = 'Pentatonic'
}

export const scaleOptions: DropDownOption[] = [
    { label: 'Major', value: 'major'},
    { label: 'Minor', value: 'minor'},
    { label: 'Dorian', value: 'dorian'},
    { label: 'Phrygian', value: 'phrygian'},
    { label: 'Lydian', value: 'lydian'}
];