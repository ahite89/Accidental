import { DurationProps } from "../interfaces/selectable";
import * as NoteIcons from "../svgs/noteIconSvgs";

export const MAX_BEATS_PER_BAR = 8;
export const NONEXISTENT_DURATIONS = [5, 7];

export const durationOptions: DurationProps[] = [
    // {noteLength: 'Sixteenth', selected: false, abcSyntax: '/2', audioDuration: .5},
    {noteLength: 'Eighth', selected: false, abcSyntax: '', audioDuration: 1},
    // {noteLength: 'Dotted Eighth', selected: false, abcSyntax: '1.5', audioDuration: 1.5},
    {noteLength: 'Quarter', selected: true, abcSyntax: '2', audioDuration: 2},
    {noteLength: 'Dotted Quarter', selected: false, abcSyntax: '3', audioDuration: 3},
    {noteLength: 'Half', selected: false, abcSyntax: '4', audioDuration: 4},
    {noteLength: 'Dotted Half', selected: false, abcSyntax: '6', audioDuration: 6},
    {noteLength: 'Whole', selected: false, abcSyntax: '8', audioDuration: 8},
    {noteLength: 'Eighth Rest', selected: false, abcSyntax: 'z', audioDuration: 1, isRest: true},
    {noteLength: 'Quarter Rest', selected: false, abcSyntax: 'z2', audioDuration: 2, isRest: true},
    {noteLength: 'Dotted Quarter Rest', selected: false, abcSyntax: 'z3', audioDuration: 3, isRest: true},
    {noteLength: 'Half Rest', selected: false, abcSyntax: 'z4', audioDuration: 4, isRest: true},
    {noteLength: 'Dotted Half Rest', selected: false, abcSyntax: 'z6', audioDuration: 6, isRest: true},
    {noteLength: 'Whole Rest', selected: false, abcSyntax: 'z8', audioDuration: 8, isRest: true}
    // {noteLength: 'Dotted Whole', selected: false, abcSyntax: '12', audioDuration: 12}
];

export const noteDurationSymbolMap: Record<string, JSX.Element> = {
    'Sixteenth': NoteIcons.SixteenthNoteIcon(),
    'Eighth': NoteIcons.EighthNoteIcon(),
    'Dotted Eighth': NoteIcons.DottedEighthNoteIcon(),
    'Quarter': NoteIcons.QuarterNoteIcon(),
    'Dotted Quarter': NoteIcons.DottedQuarterNoteIcon(),
    'Half': NoteIcons.HalfNoteIcon(),
    'Dotted Half': NoteIcons.DottedHalfNoteIcon(),
    'Whole': NoteIcons.WholeNoteIcon(),
    'Dotted Whole': NoteIcons.DottedWholeNoteIcon(),
    'Eighth Rest': NoteIcons.EighthRestIcon(),
    'Quarter Rest': NoteIcons.QuarterRestIcon(),
    'Dotted Quarter Rest': NoteIcons.DottedQuarterRestIcon(),
    'Half Rest': NoteIcons.HalfRestIcon(),
    'Dotted Half Rest': NoteIcons.DottedHalfRestIcon(),
    'Whole Rest': NoteIcons.WholeRestIcon()
};