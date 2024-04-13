import { DurationProps } from "../interfaces/selectable";

export const MAX_BEATS_PER_BAR = 8;

export const durationOptions: DurationProps[] = [
    {noteLength: 'Sixteenth', selected: false, abcSyntax: '/2', audioDuration: .5},
    {noteLength: 'Eighth', selected: false, abcSyntax: '', audioDuration: 1},
    {noteLength: 'Quarter', selected: true, abcSyntax: '2', audioDuration: 2},
    {noteLength: 'Half', selected: false, abcSyntax: '4', audioDuration: 4},
    {noteLength: 'Whole', selected: false, abcSyntax: '8', audioDuration: 8}
];

// TODO: Map to note icons
export const noteDurationSymbolMap: Record<string, string> = {
    'Sixteenth': "16",
    'Eighth': "8",
    'Quarter': "4",
    'Half': "2",
    'Whole': "1"
};

// export const noteDurationMap: Record<string, string> = {
//     '.5': '16n',
//     '.75': '16n.',
//     '1': '8n',
//     '1.5': '8n.',
//     '2': '4n',
//     '3': '4n.',
//     '4': '2n',
//     '6': '2n.',
//     '8': '1n',
//     '12': '1n.'
// };