import { KeyQuality, MajorKeys, MinorKeys } from "../constants/keys";
import { AccidentalTypes } from "../constants/notes";

export interface KeyProps {
    quality: KeyQuality,
    keys: Key[]
}

export interface Key {
    name: MajorKeys | MinorKeys,
    accidentalType: AccidentalTypes,
    relativeMajorKey?: MajorKeys
}