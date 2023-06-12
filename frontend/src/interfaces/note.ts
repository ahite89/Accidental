export interface NoteProps {
    abcName: string,
    pitchNumber: number,
    duration: number,
    timeBetweenNotes: number
}

export interface PlaybackNoteData extends Pick<NoteProps, "pitchNumber" | "duration">{};
