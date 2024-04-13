import { DurationProps } from "./selectable";

export interface NoteProps {
    abcName: string,
    pitchNumber: number,
    durationProps: DurationProps,
    timeBetweenNotes: number
}

export interface PlaybackNoteData extends Pick<NoteProps, "pitchNumber" | "durationProps">{};
