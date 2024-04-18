import { RandomizerParameters } from "../interfaces/controlPanel";
import { NoteForScaleProps } from "../interfaces/scale";
import { allNotesAndPitchNumbersFlatKeys, allNotesAndPitchNumbersSharpKeys } from "../constants/notes";
import { scaleIntervalsArrayMap } from "../constants/intervals";

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

const getNotesFromScale = (randomizerParams: RandomizerParameters): NoteForScaleProps[] => {

    // in notes.ts....
    // TRY RECOMBINING THE SHARPS AND FLATS TO SEE IF IT ACTUALLY WORKS (TEST WITH MULTIPLE MAJOR AND MINOR SCALES)

    // Find the starting pitch, the lowest possible pitch from the selected scale
    const startingPitchObject = allNotesAndPitchNumbersFlatKeys().find((note) => {
        return note.noteName === randomizerParams.keySelection;
    });
    
    // ** NOT WORKING ** Get index of first occurence of the starting pitch within the full pitch range
    const startingPitchIndex = allNotesAndPitchNumbersFlatKeys().indexOf(startingPitchObject!, 0);
    // Get array of scale intervals from corresponding scale name
    const scaleIntervalsArray = scaleIntervalsArrayMap[randomizerParams.scaleSelection];

    let validScaleNotes: NoteForScaleProps[] = [startingPitchObject!];

    // NOW ITERATE
    // Starting at startingPitchIndex, continuously increment the count by the values in the scaleIntervalsArray until you get to the end of it
    // then continue moving through scaleIntervalsArray until you've reached the end of the allNotesAndPitchNumbersArray
    // for each iteration, push the note object into the validScaleNotes array
    // while (i = startingPitchIndex; i < allNotesAndPitchNumbersArray.length; i++;)
    // ...


    return validScaleNotes;
};
