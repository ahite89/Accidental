import { scaleToAbcNamePitchNumberMap } from "../constants/notes";
import { RandomizerParameters } from "../interfaces/controlPanel";

export const fetchValidNotes = (randomizerParams: RandomizerParameters): (string | number)[][] => { 
    // First get all valid notes from the selected key and scale
    const keyAndScale = `${randomizerParams.keySelection}${randomizerParams.scaleSelection}`;
    const allValidNotesFromKeyAndScale = scaleToAbcNamePitchNumberMap[keyAndScale];

    // Narrow down to only valid notes within selected pitch range
    const pitchRangeMin = randomizerParams.pitchRangeSelection[0];
    const pitchRangeMax = randomizerParams.pitchRangeSelection[1];
    
    let validNotesForRandomizing: (string | number)[][] = [];
    allValidNotesFromKeyAndScale.map((noteArray) => {
        if (+noteArray[1] >= pitchRangeMin && +noteArray[1] <= pitchRangeMax) {
            validNotesForRandomizing.push(noteArray);
        }
        return validNotesForRandomizing;
    });

    return validNotesForRandomizing;
};
