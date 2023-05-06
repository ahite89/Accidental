import { noteProps } from '../types/note';

export const MAX_BEATS_PER_BAR = 8;

export const defaultNotes: noteProps[] = [
    // Duration: 1 = 8th, 2 = quarter, 3 = dotted quarter, 4 = half, etc.
    {name: 'C', duration: 2, timeBetweenNotes: 500},
    {name: 'D', duration: 2, timeBetweenNotes: 500},
    {name: 'E', duration: 2, timeBetweenNotes: 500},
    {name: 'F', duration: 2, timeBetweenNotes: 500},
    {name: 'G', duration: 2, timeBetweenNotes: 500},
    {name: 'A', duration: 2, timeBetweenNotes: 500},
    {name: 'B', duration: 2, timeBetweenNotes: 500},
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

export enum Scales {
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

export enum Keys {
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