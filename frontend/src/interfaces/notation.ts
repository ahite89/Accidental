import { RandomizerParameters } from "./controlPanel"
import { PlaybackNoteData } from "./note"
import { Clefs } from "../constants/voices"
import { NoteForScaleProps } from "./scale"

export interface NotationData {
    voiceNumber: number,
    randomizerParams: RandomizerParameters
    notationString: string,
    playBackNotes: PlaybackNoteData[],
    notesInBarCount: number,
    instrumentMidiNumber: number,
    validNotesForRandomizing: NoteForScaleProps[],
    previousNotePitch?: number,
    clef: Clefs
}