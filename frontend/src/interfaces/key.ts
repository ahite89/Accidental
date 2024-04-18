import { Keys } from "../constants/keys";
import { AccidentalTypes } from "../constants/notes";

export interface KeyQuality {
    key: Keys,
    accidentalType: AccidentalTypes
}