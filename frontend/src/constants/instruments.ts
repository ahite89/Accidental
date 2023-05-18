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

export const instrumentOptions = (): DropDownOption[] => {
    const instruments = [];
    for (let instrument of Object.values(Instruments)) {
        instruments.push({ label: instrument, value: instrument })
    }
    return instruments;
};