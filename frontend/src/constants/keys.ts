import { DropDownOption } from "../interfaces/dropdown";
import { AccidentalTypes } from "./notes";
import { KeyProps, Key } from "../interfaces/key";
import { Scales } from "./scales";

export enum KeyQuality {
    Major,
    Minor
}

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
    EFlat = 'Eb',
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
    EFlat = 'Eb',
    BFlat = 'Bb',
    F = 'F',
    C = 'C',
    G = 'G',
    D = 'D'
}

export const DEFAULT_KEY = MajorKeys.C;

export const majorKeys: Key[] = [
    {name: MajorKeys.C, accidentalType: AccidentalTypes.Natural},
    {name: MajorKeys.G, accidentalType: AccidentalTypes.Sharp},
    {name: MajorKeys.D, accidentalType: AccidentalTypes.Sharp},
    {name: MajorKeys.A, accidentalType: AccidentalTypes.Sharp},
    {name: MajorKeys.E, accidentalType: AccidentalTypes.Sharp},
    {name: MajorKeys.B, accidentalType: AccidentalTypes.Sharp},
    {name: MajorKeys.FSharp, accidentalType: AccidentalTypes.Sharp},
    {name: MajorKeys.GFlat, accidentalType: AccidentalTypes.Flat},
    {name: MajorKeys.DFlat, accidentalType: AccidentalTypes.Flat},
    {name: MajorKeys.AFlat, accidentalType: AccidentalTypes.Flat},
    {name: MajorKeys.EFlat, accidentalType: AccidentalTypes.Flat},
    {name: MajorKeys.BFlat, accidentalType: AccidentalTypes.Flat},
    {name: MajorKeys.F, accidentalType: AccidentalTypes.Flat}
];

export const minorKeys: Key[] = [
    {name: MinorKeys.A, accidentalType: AccidentalTypes.Natural, relativeMajorKey: MajorKeys.C},
    {name: MinorKeys.E, accidentalType: AccidentalTypes.Sharp, relativeMajorKey: MajorKeys.G},
    {name: MinorKeys.B, accidentalType: AccidentalTypes.Sharp, relativeMajorKey: MajorKeys.D},
    {name: MinorKeys.FSharp, accidentalType: AccidentalTypes.Sharp, relativeMajorKey: MajorKeys.A},
    {name: MinorKeys.CSharp, accidentalType: AccidentalTypes.Sharp, relativeMajorKey: MajorKeys.E},
    {name: MinorKeys.GSharp, accidentalType: AccidentalTypes.Sharp, relativeMajorKey: MajorKeys.B},
    {name: MinorKeys.DSharp, accidentalType: AccidentalTypes.Sharp, relativeMajorKey: MajorKeys.FSharp},
    {name: MinorKeys.EFlat, accidentalType: AccidentalTypes.Flat, relativeMajorKey: MajorKeys.GFlat},
    {name: MinorKeys.BFlat, accidentalType: AccidentalTypes.Flat, relativeMajorKey: MajorKeys.DFlat},
    {name: MinorKeys.F, accidentalType: AccidentalTypes.Flat, relativeMajorKey: MajorKeys.AFlat},
    {name: MinorKeys.C, accidentalType: AccidentalTypes.Flat, relativeMajorKey: MajorKeys.EFlat},
    {name: MinorKeys.G, accidentalType: AccidentalTypes.Flat, relativeMajorKey: MajorKeys.BFlat},
    {name: MinorKeys.D, accidentalType: AccidentalTypes.Flat, relativeMajorKey: MajorKeys.F},
];

export const scaleKeyQualityMap: Record<Scales, KeyProps> = {
    'Major': {quality: KeyQuality.Major, keys: majorKeys},
    'Natural Minor': {quality: KeyQuality.Minor, keys: minorKeys},
    'Harmonic Minor': {quality: KeyQuality.Minor, keys: minorKeys},
    'Melodic Minor': {quality: KeyQuality.Minor, keys: minorKeys},
    'Dorian': {quality: KeyQuality.Major, keys: majorKeys},
    'Phrygian': {quality: KeyQuality.Major, keys: majorKeys},
    'Lydian': {quality: KeyQuality.Major, keys: majorKeys},
    'Mixolydian': {quality: KeyQuality.Major, keys: majorKeys},
    'Locrian': {quality: KeyQuality.Major, keys: majorKeys},
    'Chromatic': {quality: KeyQuality.Major, keys: majorKeys},
    'Whole Tone': {quality: KeyQuality.Major, keys: majorKeys},
    'Major Pentatonic': {quality: KeyQuality.Major, keys: majorKeys},
    'Minor Pentatonic': {quality: KeyQuality.Minor, keys: minorKeys},
    'Major Blues': {quality: KeyQuality.Major, keys: majorKeys},
    'Minor Blues': {quality: KeyQuality.Minor, keys: minorKeys},
    'Augmented': {quality: KeyQuality.Major, keys: majorKeys},
    'Diminished': {quality: KeyQuality.Minor, keys: minorKeys}
};

// Move this elsewhere
export const keyOptions = (scale: Scales): DropDownOption[] => {
    const keys = [];
    const keyProps = scaleKeyQualityMap[scale];
    const keyQuality = keyProps.quality === KeyQuality.Major ? MajorKeys : MinorKeys;
    for (let key of Object.values(keyQuality)) {
        keys.push({ label: key, value: key })
    }

    return keys;
};