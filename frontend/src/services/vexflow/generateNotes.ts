import Vex, { StaveNote, Formatter } from 'vexflow';

export const generateNotes = (stave: Vex.Stave | null, context: Vex.RenderContext | null): void => {
    console.log(stave);
    console.log(context);
    if (stave && context) {
        const notes = [
            [new StaveNote({ keys: ["c/4"], duration: "q" }), new StaveNote({ keys: ["d/4"], duration: "q" }), new StaveNote({ keys: ["b/4"], duration: "qr" }), new StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "q" })],
            [new StaveNote({ keys: ["a/4"], duration: "q" }), new StaveNote({ keys: ["g/4"], duration: "q" }), new StaveNote({ keys: ["b/4"], duration: "qr" }), new StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "q" })]
        ];
        //const notes: string[][] = [["c/4"], ["d/4"], ["b/4"], ["e/4"]];
            notes.forEach(note => {
                // create new stave note with note name
                setTimeout(() => {
                    Formatter.FormatAndDraw(context, stave, note);
                    console.log(note);
                }, 1000)
            });
    }
}