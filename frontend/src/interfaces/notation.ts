import { RandomizerParameters } from "./controlPanel"
import { Clefs } from "../constants/voices"
import { NoteForScaleProps } from "./scale"
import { NoteProps } from "./note"

export interface NotationData {
    voiceNumber: number,
    randomizerParams: RandomizerParameters
    notationString: string,
    playBackNotes: NoteProps[],
    notesInBarCount: number,
    instrumentMidiNumber: number,
    validNotesForRandomizing: NoteForScaleProps[],
    previousNotePitch?: number,
    clef: Clefs
}