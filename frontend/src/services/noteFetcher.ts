import { scaleToAbcNamePitchNumberMap } from "../constants/notes";

export const fetchValidNotes = (keyAndScale: string): (string | number)[][] => { 
    const validNotes = scaleToAbcNamePitchNumberMap[keyAndScale];
    return validNotes;
}