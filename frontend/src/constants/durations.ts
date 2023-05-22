import { PanelProps } from "../types/panel";

enum Durations {
    Sixteenth = '16',
    Eighth = '8',
    Quarter = '4',
    Half = '2',
    Whole = '1'
}

export const durationOptions = (): PanelProps[] => {
    const durations = [];
    for (let duration of Object.values(Durations)) {
        durations.push({ label: duration, value: duration })
    }
    return durations;
};