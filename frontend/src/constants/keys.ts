import { DropDownOption } from "../interfaces/dropdown";
import { AccidentalTypes } from "./notes";
import { KeyQuality } from "../interfaces/key";

export const DEFAULT_KEY = 'C';

// 'Major': [2, 2, 1, 2, 2, 2, 1],      = Major Key
// 'Natural Minor': [2, 1, 2, 2, 1, 2, 2],      = Minor Key
// 'Harmonic Minor': [2, 1, 2, 2, 1, 3, 1],     = Minor Key
// 'Melodic Minor': [2, 1, 2, 2, 2, 2, 1],      = Minor Key
// 'Dorian': [2, 1, 2, 2, 2, 1, 2],     = Major Key
// 'Phrygian': [1, 2, 2, 2, 1, 2, 2],   = Major Key
// 'Lydian': [2, 2, 2, 1, 2, 2, 1],     = Major Key
// 'Mixolydian': [2, 2, 1, 2, 2, 1, 2], = Major Key
// 'Locrian': [1, 2, 2, 1, 2, 2, 2],    = Major Key
// 'Chromatic': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],   = Sharp/Flat? Major?
// 'Whole Tone': [2, 2, 2, 2, 2, 2],    = Major Key
// 'Major Pentatonic': [2, 2, 3, 2, 3],     = Major Key
// 'Minor Pentatonic': [3, 2, 2, 3, 2],     = Minor Key
// 'Major Blues': [2, 1, 1, 3, 2, 3],       = Major Key
// 'Minor Blues': [3, 2, 1, 1, 3, 2],       = Minor Key
// 'Augmented': [3, 1, 3, 1, 3, 1],         = Major Key
// 'Diminished': [2, 1, 2, 1, 2, 1, 2, 1]   = Minor Key

export enum MajorKeys {
    C = 'C',
    G = 'G',
    D = 'D',
    A = 'A',
    E = 'E',
    B = 'B',
    FSharp = 'F#',
    GFlat = 'Gb',
    DFlat = 'Db',
    AFlat = 'Ab',
    EFlat = 'A',
    BFlat = 'Bb',
    F = 'F',
}

export enum MinorKeys {
    A = 'A',
    E = 'E',
    B = 'B',
    FSharp = 'F#',
    CSharp = 'C#',
    GSharp = 'G#',
    DSharp = 'D#',
    BFlat = 'Bb',
    F = 'F',
    C = 'C',
    G = 'G',
    D = 'D'
}

// Why do I need the key here? Don't I just need major/minor?
export const scaleKeyQualityMap: Record<string, KeyQuality> = {
    'CMajor': {key: MajorKeys.C, accidentalType: AccidentalTypes.Natural},
    'DbMajor': {key: MajorKeys.DFlat, accidentalType: AccidentalTypes.Flat},
    'DMajor': {key: MajorKeys.D, accidentalType: AccidentalTypes.Natural},
    'EbMajor': {key: MajorKeys.EFlat, accidentalType: AccidentalTypes.Natural},
    'EMajor': {key: MajorKeys.E, accidentalType: AccidentalTypes.Natural},
    'FMajor': {key: MajorKeys.F, accidentalType: AccidentalTypes.Natural},
    'F#Major': {key: MajorKeys.FSharp, accidentalType: AccidentalTypes.Natural},
    'GbMajor': {key: MajorKeys.GFlat, accidentalType: AccidentalTypes.Natural},
    'GMajor': {key: MajorKeys.G, accidentalType: AccidentalTypes.Natural},
    'AbMajor': {key: MajorKeys.AFlat, accidentalType: AccidentalTypes.Natural},
    'AMajor': {key: MajorKeys.A, accidentalType: AccidentalTypes.Natural},
    'BbMajor': {key: MajorKeys.BFlat, accidentalType: AccidentalTypes.Natural},
    'BMajor': {key: MajorKeys.B, accidentalType: AccidentalTypes.Natural},
    
    'CMinor': {key: MinorKeys.C, accidentalType: AccidentalTypes.Natural},
    'C#Minor': {key: MinorKeys.CSharp, accidentalType: AccidentalTypes.Natural},
    'DMinor': {key: MinorKeys.D, accidentalType: AccidentalTypes.Natural},
    'EMinor': {key: MinorKeys.E, accidentalType: AccidentalTypes.Natural},
    'FMinor': {key: MinorKeys.F, accidentalType: AccidentalTypes.Natural},
    'F#Minor': {key: MinorKeys.FSharp, accidentalType: AccidentalTypes.Natural},
    'GMinor': {key: MinorKeys.G, accidentalType: AccidentalTypes.Natural},
    'G#Minor': {key: MinorKeys.GSharp, accidentalType: AccidentalTypes.Natural},
    'AMinor': {key: MinorKeys.A, accidentalType: AccidentalTypes.Natural},
    'BbMinor': {key: MinorKeys.BFlat, accidentalType: AccidentalTypes.Natural},
    'BMinor': {key: MinorKeys.B, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
    // 'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural},
};

// This should take in whether the scale is major or minor and then choose the right enum
export const keyOptions = (): DropDownOption[] => {
    const keys = [];
    for (let key of Object.values(MajorKeys)) {
        keys.push({ label: key, value: key })
    }
    return keys;
};