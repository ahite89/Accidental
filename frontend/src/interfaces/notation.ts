import { RandomizerParameters } from "./controlPanel"
import { PlaybackNoteData } from "./note"

export interface NotationData {
    voiceNumber: number,
    randomizerParams: RandomizerParameters
    notationString: string,
    playBackNotes: PlaybackNoteData[],
    notesInBarCount: number
}