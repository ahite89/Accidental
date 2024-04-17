import { RandomizerParameters } from "../interfaces/controlPanel";
import { NoteForScaleProps } from "../interfaces/scale";
import { allNotesAndPitchNumbersFlatKeys, allNotesAndPitchNumbersSharpKeys } from "../constants/notes";

export const fetchValidNotes = (randomizerParams: RandomizerParameters): NoteForScaleProps[] => { 
    // First get all valid notes from the selected key and scale
    const allValidNotesFromKeyAndScale = getNotesFromScale(randomizerParams);

    // Narrow down to only valid notes within selected pitch range
    const pitchRangeMin = randomizerParams.pitchRangeSelection[0];
    const pitchRangeMax = randomizerParams.pitchRangeSelection[1];
    
    let validNotesForRandomizing: NoteForScaleProps[] = [];
    allValidNotesFromKeyAndScale.map((noteObject) => {
        if (noteObject.pitchNumber >= pitchRangeMin && noteObject.pitchNumber <= pitchRangeMax) {
            validNotesForRandomizing.push(noteObject);
        }
        return validNotesForRandomizing;
    });

    return validNotesForRandomizing;
};

// Could add two flags for key - isSharp and isFlat
const getNotesFromScale = (randomizerParams: RandomizerParameters): NoteForScaleProps[] => {
    // Create an algorithm here that returns the notes from a scale    
    // Find the starting pitch, the lowest possible pitch from the selected scale
    const startingPitchArray = allNotesAndPitchNumbersFlatKeys().find((note) => {
        return note.noteName === randomizerParams.keySelection;
    });
    const startingPitchInterval = allNotesAndPitchNumbersFlatKeys().indexOf(startingPitchArray!, 0)

    // ...if sharp key, use sharp scale; if flat key, use flat scale
    // Depending on the scale, the algo will search for the pitches that align with the intervals between notes
    
    // Make this a record
    return [{noteName: 'C', abcName: 'C', pitchNumber: 60}];
};
