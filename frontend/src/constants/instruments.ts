import { DropDownOption } from "../interfaces/dropdown";

export enum Instruments {
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

export const instrumentOptions = (): DropDownOption[] => {
    const instruments = [];
    for (let instrument of Object.values(Instruments)) {
        instruments.push({ label: instrument, value: instrument })
    }
    return instruments;
};

export const DEFAULT_INSTRUMENT = Instruments.GrandPiano;

export const instrumentMap: Record<string, number> = {
    'Grand Piano': 0,
    'Electric Piano': 2,
    'Organ': 16,
    'Acoustic Guitar': 24,
    'Electric Guitar': 27,
    'Violin': 40,
    'Viola': 41,
    'Cello': 42,
    'Trumpet': 56,
    'Trombone': 57,
    'Tuba': 58,
    'French Horn': 60,
    'Saxophone': 66,
    'Oboe': 68,
    'Bassoon': 70,
    'Clarinet': 71,
    'Flute': 73,
    'Square Lead': 80,
    'Sawtooth Lead': 81,
    'Voice Lead': 85,
    'Warm Pad': 89,
    'Choir Pad': 91,
    'Halo Pad': 94
}