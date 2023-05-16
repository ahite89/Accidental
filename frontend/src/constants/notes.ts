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