import { RandomizerParameters } from "./controlPanel"
import { PlaybackNoteData } from "./note"
import { Clefs } from "../constants/voices"

export interface NotationData {
    voiceNumber: number,
    randomizerParams: RandomizerParameters
    notationString: string,
    playBackNotes: PlaybackNoteData[],
    notesInBarCount: number,
    instrumentMidiNumber: number,
    validNotesForRandomizing: (string | number)[][],
    clef: Clefs
}