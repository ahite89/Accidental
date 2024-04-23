import { DropDownOption } from "../interfaces/dropdown";

export enum Scales {
    Major = 'Major',
    NaturalMinor = 'Natural Minor',
    HarmonicMinor = 'Harmonic Minor',
    MelodicMinor = 'Melodic Minor',
    Dorian = 'Dorian',
    Phrygian = 'Phrygian',
    Lydian = 'Lydian',
    Mixolydian = 'Mixolydian',
    Locrian = 'Locrian',
    Chromatic = 'Chromatic',
    WholeTone = 'Whole Tone',
    MajorPentatonic = 'Major Pentatonic',
    MinorPentatonic = 'Minor Pentatonic',
    MajorBlues = 'Major Blues',
    MinorBlues = 'Minor Blues',
    Augmented = 'Augmented',
    Diminished = 'Diminished'
}

export const DEFAULT_SCALE = Scales.Major;

// Move this elsewhere
export const scaleOptions = (): DropDownOption[] => {
    const scales = [];
    for (let scale of Object.values(Scales)) {
        scales.push({ label: scale, value: scale })
    }
    return scales;
};