import { NoteProps } from "./note"
import { AccidentalType } from "../constants/notes"

export interface NoteForScaleProps extends Pick<NoteProps, "abcName" | "pitchNumber"> {
    noteName: string,
    accidentalType: AccidentalType
};
