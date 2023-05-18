import { DropDownOption } from "../types/dropdown";

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