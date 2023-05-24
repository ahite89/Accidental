import { SelectableProps } from "../types/selectable";

// export const durationOptions: SelectableProps[] = [
//     {label:'16', value: '16'},
//     {label:'8', value: '8'},
//     {label:'4', value: '4'},
//     {label:'2', value: '2'},
//     {label:'1', value: '1'}
// ];

enum Durations {
    Sixteenth = '16',
    Eighth = '8',
    Quarter = '4',
    Half = '2',
    Whole = '1'
}

export const durationOptions = (): SelectableProps[] => {
    const durations = [];
    for (let duration of Object.values(Durations)) {
        durations.push({ value: duration })
    }
    return durations;
};