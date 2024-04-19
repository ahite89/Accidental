import { DropDownOption } from "../interfaces/dropdown";
import { AccidentalTypes } from "./notes";
import { KeyQuality } from "../interfaces/key";

export const DEFAULT_KEY = 'C';

export enum Keys {
    C = 'C',
    CSharp = 'C#',
    DFlat = 'Db',
    D = 'D',
    EFlat = 'Eb',
    E = 'E',
    F = 'F',
    FSharp = 'F#',
    GFlat = 'Gb',
    G = 'G',
    AFlat = 'Ab',
    A = 'A',
    BFlat = 'Bb',
    B = 'B'
}

export const scaleKeyQualityMap: Record<string, KeyQuality> = {
    'CMajor': {key: Keys.C, accidentalType: AccidentalTypes.Natural}
    // Expand this...
};

export const keyOptions = (): DropDownOption[] => {
    const keys = [];
    for (let key of Object.values(Keys)) {
        keys.push({ label: key, value: key })
    }
    return keys;
};