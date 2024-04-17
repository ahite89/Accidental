import { NoteProps } from "./note"

export interface NoteForScaleProps extends Pick<NoteProps, "abcName" | "pitchNumber"> {
    noteName: string
};
