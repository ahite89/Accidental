import { NoteProps } from '../interfaces/note';
import { NotationData } from '../interfaces/notation';

export const getRandomizedNote = (notationObj: NotationData): NoteProps => {

    // WHEN ITERATING, GET PREVIOUS NOTE AND STORE IT IN THE REF OR SOME OBJECT
    // AFTER EACH ITERATION, RESET PREVIOUS NOTE VALUE TO THE CURRENT NOTE
    // CHECK IF A PREVIOUS NOTE EXISTS
    // USE THE PREVIOUS NOTE'S PITCH NUMBER AND THE RANDOMIZER'S STEPS PARAM TO LIMIT THE DISTANCE THE NEXT NOTE CAN TRAVEL
    // EX:
    // PREVIOUS PITCH = 60
    // STEPS = 5
    // IDENTITY THE INDEX OF THE ARRAY ELEMENT THAT HAS A VALUE OF 60
    // THEN SET THE RANGE OF THE OPTIONS SO THAT THE MIN IS THE INDEX - 5 AND THE MAX IS INDEX + 5
    // MIGHT NEED TO MAP STEPS TO INTERVAL NUMBERS




    // Get random duration
    const selectedDurations = notationObj.randomizerParams.durationSelection.filter((duration) => {
        return duration.selected;
    });
    const randomDurationIndex = Math.floor(Math.random() * selectedDurations.length);
    const randomDuration = selectedDurations[randomDurationIndex];

    // Get random pitch
    const validNotesMultiArray = notationObj.validNotesForRandomizing;

    // THE STEPS FUNCTIONALITY IS GOING TO GO RIGHT AROUND HERE

    const randomPitchIndex = Math.floor(Math.random() * validNotesMultiArray.length);
    const randomNameAndPitch = validNotesMultiArray[randomPitchIndex];

    // Get time between notes based on selected tempo
    // Use 1 Minute (60,000 milliseconds) to calculate for quarter note
    const selectedTempo = notationObj.randomizerParams.tempoSelection;
    const eighthNoteDurationInMilliseconds = 30000 / selectedTempo
    
    return { 
        abcName: randomNameAndPitch.abcName,
        pitchNumber: randomNameAndPitch.pitchNumber,
        durationProps: randomDuration,
        timeBetweenNotes: eighthNoteDurationInMilliseconds * randomDuration.audioDuration
    };
};