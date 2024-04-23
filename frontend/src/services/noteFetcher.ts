import { RandomizerParameters } from "../interfaces/controlPanel";
import { NoteForScaleProps } from "../interfaces/scale";
import { AccidentalTypes, allNotesAndPitchNumbers } from "../constants/notes";
import { scaleIntervalsArrayMap } from "../constants/intervals";
import { scaleKeyQualityMap } from "../constants/keys";

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

    // Start by filtering out the notes with undesired accidentals (based on key and scale)
    debugger
    const keyProps = scaleKeyQualityMap[randomizerParams.scaleSelection];
    const keyObject = keyProps.keys.find(k => k.name === randomizerParams.keySelection)!;
    const filteredNotesAndPitchNumbers = allNotesAndPitchNumbers.filter((noteObject) => {
        switch (keyObject.accidentalType) {
            case AccidentalTypes.Natural:
                return noteObject.accidentalType === AccidentalTypes.Natural || noteObject.accidentalType === AccidentalTypes.Sharp;
            case AccidentalTypes.Sharp:
                return noteObject.accidentalType === AccidentalTypes.Natural || noteObject.accidentalType === AccidentalTypes.Sharp;
            case AccidentalTypes.Flat:
                return noteObject.accidentalType === AccidentalTypes.Natural || noteObject.accidentalType === AccidentalTypes.Flat;
            default:
                return allNotesAndPitchNumbers;
        }
    });

    // Find the starting pitch, the lowest possible pitch from the selected scale
    const startingPitchObject = filteredNotesAndPitchNumbers.find((note) => {
        return note.noteName === randomizerParams.keySelection;
    });
    
    // Get index of first occurence of the starting pitch within the full pitch range
    let startingPitchIndex = filteredNotesAndPitchNumbers.indexOf(startingPitchObject!, 0);
    
    // Get array of scale intervals from corresponding scale name
    const scaleIntervalsArray = scaleIntervalsArrayMap[randomizerParams.scaleSelection];

    // Iterate over scales intervals array until all valid notes from the full list have been added
    let validScaleNotes: NoteForScaleProps[] = [];
    for (let i = 0; i < scaleIntervalsArray.length; i++) {
        if (startingPitchIndex >= filteredNotesAndPitchNumbers.length) {
            return validScaleNotes;
        }
        validScaleNotes.push(filteredNotesAndPitchNumbers[startingPitchIndex]);
        startingPitchIndex = startingPitchIndex + scaleIntervalsArray[i];
        
        // Reset scale intervals array loop
        if (i === scaleIntervalsArray.length - 1) {
            i = -1;
        }
    }

    return validScaleNotes;
};
