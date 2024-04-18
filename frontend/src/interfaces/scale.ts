import { NoteProps } from "./note"
import { AccidentalTypes } from "../constants/notes"

export interface NoteForScaleProps extends Pick<NoteProps, "abcName" | "pitchNumber"> {
    noteName: string,
    accidentalType: AccidentalTypes
};
