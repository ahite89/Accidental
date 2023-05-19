import { DropDownOption } from "../types/dropdown";

enum Keys {
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

export const keyOptions = (): DropDownOption[] => {
    const keys = [];
    for (let key of Object.values(Keys)) {
        keys.push({ label: key, value: key })
    }
    return keys;
};