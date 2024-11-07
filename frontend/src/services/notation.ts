import { MAX_BEATS_PER_BAR, NONEXISTENT_DURATIONS, durationOptions } from "../constants/durations";
import { NotationData } from "../interfaces/notation";
import { NoteProps } from "../interfaces/note";

export const addNoteTiesAndBarLines = (note: NoteProps, notationObj: NotationData): NotationData => {
    let newNote = '', tieNoteLeftover = '';
    
    // If max beats have been reached, append a bar line to note
    if (notationObj.notesInBarCount + note.durationProps.audioDuration === MAX_BEATS_PER_BAR) {
      newNote = note.abcName + note.durationProps.abcSyntax + '|';
      notationObj.notesInBarCount = 0;
      notationObj.notationString += newNote;
    }
    // If note is too long for current bar, split it into two and tie it over the bar
    else if (notationObj.notesInBarCount + note.durationProps.audioDuration > MAX_BEATS_PER_BAR) {
      const firstNoteOfTieLength = MAX_BEATS_PER_BAR - notationObj.notesInBarCount;

      // Check for note durations that don't exist (e.g. half + eighth)
      if (!NONEXISTENT_DURATIONS.includes(firstNoteOfTieLength)) {
        const firstNoteOfTie = getTiedNote(true, firstNoteOfTieLength, note);
        notationObj.notationString += firstNoteOfTie;
      }
      else {
        // If non-existent duration, add eighth note first so that the resulting duration is a half or dotted half
        newNote = note.abcName + (note.isRest ? 'z' : '-');
        notationObj.notationString += newNote;

        // Add the remainder of the duration
        tieNoteLeftover = getTiedNote(true, firstNoteOfTieLength - 1, note);
        notationObj.notationString += tieNoteLeftover;
      }
      
      // Reset bar count before second tie note
      notationObj.notesInBarCount = 0;   
      
      const secondNoteOfTieLength = note.durationProps.audioDuration - firstNoteOfTieLength;

      // Repeat process for second note of tie
      if (!NONEXISTENT_DURATIONS.includes(secondNoteOfTieLength)) {
        const secondNoteOfTie = getTiedNote(false, secondNoteOfTieLength, note)
        notationObj.notationString += secondNoteOfTie;
      }
      else {
        newNote = note.abcName + (note.isRest ? 'z' : '-');
        notationObj.notationString += newNote;

        tieNoteLeftover = getTiedNote(false, secondNoteOfTieLength - 1, note);
        notationObj.notationString += tieNoteLeftover;
      }
      notationObj.notesInBarCount = secondNoteOfTieLength;
    }
    else {
      // Create normal note syntax and add to notation string
      newNote = note.abcName + note.durationProps.abcSyntax;
      notationObj.notationString += newNote;
      notationObj.notesInBarCount += note.durationProps.audioDuration;
    }

    // Push notes for playback functionality
    // *** ADD NOTES WITH BAR LINES SYNTAX? *** //
    notationObj.playBackNotes.push(note);
    
    return notationObj;
};

const getTiedNote = (firstNote: boolean, tieLength: number, note: NoteProps): string => {
    const tieNoteDuration = durationOptions.filter(duration => note.isRest ? duration.isRest : duration)
          .find(duration => duration.audioDuration ===  tieLength);

    return note.abcName + tieNoteDuration?.abcSyntax + (firstNote ? (note.isRest ? '|' : '-|') : '');
};