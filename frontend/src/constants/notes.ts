import { NoteProps } from '../types/note';
import { DropDownOption } from '../types/dropdown';

export const MAX_BEATS_PER_BAR = 8;
export const MIN_PITCH_NUMBER = 21;
export const MAX_PITCH_NUMBER = 108;
export const MIN_PITCH_DISTANCE = 5;

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

enum Scales {
    Major = 'Major',
    Minor = 'Minor',
    HarmonicMinor = 'Harmonic Minor',
    NaturalMinor = 'Natural Minor',
    Dorian = 'Dorian',
    Phrygian = 'Phrygian',
    Lydian = 'Lydian',
    Mixolydian = 'Mixolydian',
    Locrian = 'Locrian',
    Chromatic = 'Chromatic',
    WholeTone = 'Whole Tone',
    Pentatonic = 'Pentatonic'
}

enum Instruments {
    Piano,
    Organ,
    Flute,
    Clarinet,
    Trumpet,
    Guitar
}

export const keyOptions = (): DropDownOption[] => {
    const keys = [];
    for (let key of Object.values(Keys)) {
        keys.push({ label: key, value: key })
    }
    return keys;
};

export const scaleOptions = (): DropDownOption[] => {
    const scales = [];
    for (let scale of Object.values(Scales)) {
        scales.push({ label: scale, value: scale })
    }
    return scales;
};

export const instrumentOptions = (): DropDownOption[] => {
    const instruments = [];
    for (let instrument of Object.keys(Instruments)) {
        instruments.push({ label: instrument, value: instrument })
    }
    return instruments;
};