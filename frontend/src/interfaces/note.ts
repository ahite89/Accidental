import { DurationProps } from "./selectable";

export interface NoteProps {
    abcName: string,
    pitchNumber?: number,
    durationProps: DurationProps,
    timeBetweenNotes: number,
    isRest?: boolean
}