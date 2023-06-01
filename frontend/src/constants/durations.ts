import { SelectableProps } from "../interfaces/selectable";

export const MAX_BEATS_PER_BAR = 8;

export const durationOptions: SelectableProps[] = [
    {value: 16, selected: false},
    {value: 8, selected: false},
    {value: 4, selected: true},
    {value: 2, selected: false},
    {value: 1, selected: false}
];

export const noteDurationMap: Record<string, string> = {
    '.5': '16n',
    '.75': '16n.',
    '1': '8n',
    '1.5': '8n.',
    '2': '4n',
    '3': '4n.',
    '4': '2n',
    '6': '2n.',
    '8': '1n',
    '12': '1n.'
};