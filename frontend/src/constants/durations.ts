import { DurationProps } from "../interfaces/selectable";

export const MAX_BEATS_PER_BAR = 8;

// export const defaultNotes: NoteProps[] = [
//     // Duration: 1 = 8th, 2 = quarter, 3 = dotted quarter, 4 = half, etc.
//     {abcName: 'C', pitchNumber: 60, duration: 1, timeBetweenNotes: 500},
//     {abcName: 'D', pitchNumber: 62, duration: 2, timeBetweenNotes: 1000},
//     {abcName: 'E', pitchNumber: 64, duration: 1, timeBetweenNotes: 500},
//     {abcName: 'F', pitchNumber: 65, duration: 2, timeBetweenNotes: 1000},
//     {abcName: 'G', pitchNumber: 67, duration: 1, timeBetweenNotes: 500},
//     {abcName: 'A', pitchNumber: 69, duration: 2, timeBetweenNotes: 1000},
//     {abcName: 'B', pitchNumber: 71, duration: 4, timeBetweenNotes: 2000},
// ];

// Should probably add duration as a number to the DurationProps below - this is used for the audio

export const durationOptions: DurationProps[] = [
    {noteLength: 'Sixteenth', selected: false, abcSyntax: '/2', audioDuration: .5},
    {noteLength: 'Eighth', selected: false, abcSyntax: '', audioDuration: 1},
    {noteLength: 'Quarter', selected: true, abcSyntax: '2', audioDuration: 2},
    {noteLength: 'Half', selected: false, abcSyntax: '4', audioDuration: 4},
    {noteLength: 'Whole', selected: false, abcSyntax: '8', audioDuration: 8}
];

export const noteDurationSymbolMap: Record<string, string> = {
    'Sixteenth': "\uD834\uDD61",
    'Eighth': "\uD834\uDD60",
    'Quarter': "\uD834\uDD5F",
    'Half': "\uD834\uDD5E",
    'Whole': "\uD834\uDD5D"
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