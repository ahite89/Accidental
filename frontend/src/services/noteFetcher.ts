import { RandomizerParameters } from "../interfaces/controlPanel";
import { NoteForScaleProps } from "../interfaces/scale";
import { allNotesAndPitchNumbers } from "../constants/notes";
import { scaleIntervalsArrayMap } from "../constants/intervals";

export const fetchValidNotes = (randomizerParams: RandomizerParameters): NoteForScaleProps[] => { 
    // First get all valid notes from the selected key and scale
    const allValidNotesFromKeyAndScale = getNotesByScaleIntervals(randomizerParams);

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

const getNotesByScaleIntervals = (randomizerParams: RandomizerParameters): NoteForScaleProps[] => {
    // Find the starting pitch, the lowest possible pitch from the selected scale
    const startingPitchObject = allNotesAndPitchNumbers.find((note) => {
        return note.noteName === randomizerParams.keySelection;
    });
    
    // Get index of first occurence of the starting pitch within the full pitch range
    let startingPitchIndex = allNotesAndPitchNumbers.indexOf(startingPitchObject!, 0);
    // Get array of scale intervals from corresponding scale name
    const scaleIntervalsArray = scaleIntervalsArrayMap[randomizerParams.scaleSelection];

    let validScaleNotes: NoteForScaleProps[] = [];

    // Iterate over scales intervals array until all valid notes from the full list have been added
    for (let i = 0; i < scaleIntervalsArray.length; i++) {
        if (startingPitchIndex >= allNotesAndPitchNumbers.length) {
            return validScaleNotes;
        }
        validScaleNotes.push(allNotesAndPitchNumbers[startingPitchIndex]);
        startingPitchIndex = startingPitchIndex + scaleIntervalsArray[i];
        
        // Reset scale intervals array loop
        if (i === scaleIntervalsArray.length - 1) {
            i = -1;
        }
    }

    return validScaleNotes;
};
