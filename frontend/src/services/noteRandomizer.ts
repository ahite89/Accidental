import { NoteProps } from '../interfaces/note';
import { defaultNotes } from '../constants/notes';

export const getRandomizedNotes = (): NoteProps[] => {
    return defaultNotes;
};