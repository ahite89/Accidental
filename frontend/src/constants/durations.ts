import { DurationProps } from "../interfaces/selectable";
import * as NoteIcons from "../svgs/noteIconSvgs";

export const MAX_BEATS_PER_BAR = 8;

export const durationOptions: DurationProps[] = [
    {noteLength: 'Sixteenth', selected: false, abcSyntax: '/2', audioDuration: .5},
    // {noteLength: 'Dotted Sixteenth', selected: false, abcSyntax: '/3', audioDuration: .75},
    {noteLength: 'Eighth', selected: false, abcSyntax: '', audioDuration: 1},
    // {noteLength: 'Dotted Eighth', selected: false, abcSyntax: '1.5', audioDuration: 1.5},
    {noteLength: 'Quarter', selected: true, abcSyntax: '2', audioDuration: 2},
    {noteLength: 'Dotted Quarter', selected: false, abcSyntax: '3', audioDuration: 3},
    {noteLength: 'Half', selected: false, abcSyntax: '4', audioDuration: 4},
    {noteLength: 'Dotted Half', selected: false, abcSyntax: '6', audioDuration: 6},
    {noteLength: 'Whole', selected: false, abcSyntax: '8', audioDuration: 8}
    // {noteLength: 'Dotted Whole', selected: false, abcSyntax: '12', audioDuration: 12}
];

// TODO: Map to note icons
export const noteDurationSymbolMap: Record<string, JSX.Element> = {
    'Sixteenth': NoteIcons.SixteenthNoteIcon(),
    'Dotted Sixteenth': NoteIcons.QuarterNoteIcon(),
    'Eighth': NoteIcons.QuarterNoteIcon(),
    'Dotted Eighth': NoteIcons.QuarterNoteIcon(),
    'Quarter': NoteIcons.QuarterNoteIcon(),
    'Dotted Quarter': NoteIcons.QuarterNoteIcon(),
    'Half': NoteIcons.HalfNoteIcon(),
    'Dotted Half': NoteIcons.QuarterNoteIcon(),
    'Whole': NoteIcons.WholeNoteIcon(),
    'Dotted Whole': NoteIcons.QuarterNoteIcon()
};