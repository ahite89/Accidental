import { DropDownOption } from "../types/dropdown";

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