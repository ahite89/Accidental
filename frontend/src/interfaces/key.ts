import { MajorKeys, MinorKeys } from "../constants/keys";
import { AccidentalTypes } from "../constants/notes";

export interface KeyQuality {
    key: MajorKeys | MinorKeys,
    accidentalType: AccidentalTypes
}