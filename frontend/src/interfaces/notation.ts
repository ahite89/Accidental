import { RandomizerParameters } from "./controlPanel"

export interface NotationData {
    voiceNumber: number,
    randomizerParams: RandomizerParameters
    notationString: string,
    volume: number,
    notesInBarCount: number
}