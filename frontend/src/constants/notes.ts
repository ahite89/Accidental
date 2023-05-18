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
];

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
};

export const pitchNumberMap: Record<number, string> = {
    21: 'A0',
    22: 'A#0',
    23: 'B0',
    24: 'C1',
    25: 'C#1',
    26: 'D1',
    27: 'D#1',
    28: 'E1',
    29: 'F1',
    30: 'F#1',
    31: 'G1',
    32: 'G#1',
    33: 'A1',
    34: 'A#1',
    35: 'B1',
    36: 'C2',
    37: 'C#2',
    38: 'D2',
    39: 'D#2',
    40: 'E2',
    41: 'F2',
    42: 'F#2',
    43: 'G2',
    44: 'G#2',
    45: 'A2',
    46: 'A#2',
    47: 'B2',
    48: 'C3',
    49: 'C#3',
    50: 'D3',
    51: 'D#3',
    52: 'E3',
    53: 'F3',
    54: 'F#3',
    55: 'G3',
    56: 'G#3',
    57: 'A3',
    58: 'A#3',
    59: 'B3',
    60: 'C4',
    61: 'C#4',
    62: 'D4',
    63: 'D#4',
    64: 'E4',
    65: 'F4',
    66: 'F#4',
    67: 'G4',
    68: 'G#4',
    69: 'A4',
    70: 'A#4',
    71: 'B4',
    72: 'C5',
    73: 'C#5',
    74: 'D5',
    75: 'D#5',
    76: 'E5',
    77: 'F5',
    78: 'F#5',
    79: 'G5',
    80: 'G#5',
    81: 'A5',
    82: 'A#5',
    83: 'B5',
    84: 'C6',
    85: 'C#6',
    86: 'D6',
    87: 'D#6',
    88: 'E6',
    89: 'F6',
    90: 'F#6',
    91: 'G6',
    92: 'G#6',
    93: 'A6',
    94: 'A#6',
    95: 'B6',
    96: 'C7',
    97: 'C#7',
    98: 'D7',
    99: 'D#7',
    100: 'E7',
    101: 'F7',
    102: 'F#7',
    103: 'G7',
    104: 'G#7',
    105: 'A7',
    106: 'A#7',
    107: 'B7',
    108: 'C8'
};

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

export const keyOptions = (): DropDownOption[] => {
    const keys = [];
    for (let key of Object.values(Keys)) {
        keys.push({ label: key, value: key })
    }
    return keys;
};

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

export const scaleOptions = (): DropDownOption[] => {
    const scales = [];
    for (let scale of Object.values(Scales)) {
        scales.push({ label: scale, value: scale })
    }
    return scales;
};

enum Instruments {
    GrandPiano = 'Grand Piano',
    ElectricPiano = 'Electric Piano',
    Organ = 'Organ',
    AcousticGuitar = 'Acoustic Guitar',
    ElectricGuitar = 'Electric Guitar',
    Violin = 'Violin',
    Viola = 'Viola',
    Cello = 'Cello',
    Trumpet = 'Trumpet',
    Trombone = 'Trombone',
    Tuba = 'Tuba',
    FrenchHorn = 'French Horn',
    Saxophone = 'Saxophone',
    Oboe = 'Oboe',
    Bassoon = 'Bassoon',
    Clarinet = 'Clarinet',
    Flute = 'Flute',
    SquareLead = 'Square Lead',
    SawtoothLead = 'Sawtooth Lead',
    VoiceLead = 'Voice Lead',
    WarmPad = 'Warm Pad',
    ChoirPad = 'Choir Pad',
    HaloPad = 'Halo Pad'
}

// Grand Piano = 0,
// Electric Piano = 2,
// Organ = 16,
// AcousticGuitar = 24,
// ElectricGuitar = 27,
// Violin = 40,
// Viola = 41,
// Cello = 42,
// Trumpet = 56,
// Trombone = 57,
// Tuba = 58,
// FrenchHorn = 60,
// Saxophone = 66,
// Oboe = 68,
// Bassoon = 70,
// Clarinet = 71,
// Flute = 73,
// SquareLead = 80,
// SawtoothLead = 81,
// VoiceLead = 85,
// WarmPad = 89,
// ChoirPad = 91,
// HaloPad = 94

export const instrumentOptions = (): DropDownOption[] => {
    const instruments = [];
    for (let instrument of Object.values(Instruments)) {
        instruments.push({ label: instrument, value: instrument })
    }
    return instruments;
};