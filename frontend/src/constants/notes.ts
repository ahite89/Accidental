import { noteProps } from '../types/note';

export const defaultNotes: noteProps[] = [
    // Duration: 1 = 8th, 2 = quarter, 3 = dotted quarter, 4 = half, etc.
    {name: 'C', duration: '2', timeBetweenNotes: 250},
    {name: 'D', duration: '2', timeBetweenNotes: 250},
    {name: 'E', duration: '2', timeBetweenNotes: 250},
    {name: 'F', duration: '2', timeBetweenNotes: 250},
    {name: 'G', duration: '2', timeBetweenNotes: 250},
    {name: 'A', duration: '2', timeBetweenNotes: 250},
    {name: 'B', duration: '2', timeBetweenNotes: 250},
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
    '8': '1n'
}

export enum keys {
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