import { keyAndScalePitchesMap } from "../constants/notes";

export const fetchValidNotes = (keyAndScale: string): number[] => {
    
    const validNotes = keyAndScalePitchesMap[keyAndScale];
    return validNotes;
}