import Vex, { StaveNote, Formatter } from 'vexflow';

export const generateNotes = (stave: Vex.Stave | null, context: Vex.RenderContext | null, isGenerating: boolean): void => {
    console.log(stave);
    console.log(context);
    console.log(isGenerating);
    if (stave && context) {
        const notes: string[][] = [["c/4"], ["d/4"], ["b/4"], ["e/4"]];
        while (isGenerating) {
            notes.forEach(note => {
                const staveNote = [ new StaveNote({ 
                    keys: note,
                    duration: "q"     
                })]
                setTimeout(() => {
                    Formatter.FormatAndDraw(context, stave, staveNote);
                    console.log(note);
                }, 1000)
            });
        }
    }
}