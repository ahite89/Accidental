import { RandomizerParameters } from "./controlPanel"

export interface StaffProps {
    voiceNumber: number,
    randomizerParams: RandomizerParameters,
    handleOpenControlPanel: (voiceNumber: number, randomizerParams: RandomizerParameters, generating: boolean) => void,
    generating: boolean
}