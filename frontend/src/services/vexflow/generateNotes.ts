import Vex, { StaveNote, Formatter } from 'vexflow';

interface createStaffProps {
    stave: Vex.Stave;
    context: Vex.RenderContext;
}

export const createStaff = (): createStaffProps => {
    const { Renderer, Stave } = Vex.Flow;

    // Create an SVG renderer and attach it to the DIV element.
    const div = document.getElementById("staff") as HTMLDivElement;
    const renderer = new Renderer(div, Renderer.Backends.SVG);

    // Configure the rendering context.
    renderer.resize(720, 130);
    const context = renderer.getContext();

    const stave = new Stave(10, 0, 300);

    // Add a clef and time signature.
    stave.addClef("treble");
    stave.addTimeSignature("4/4");

    return {stave, context}
}

export const generateNotes = (stave: Vex.Stave, context: Vex.RenderContext): void => {
    const notes: string[][] = [["c/4"], ["d/4"], ["b/4"], ["e/4"]];
    notes.forEach(note => {
        const staveNote = [ new StaveNote({ 
            keys: note,
            duration: "q"     
        })]
        setTimeout(() => {
            Formatter.FormatAndDraw(context, stave, staveNote)
        }, 1000)
    });
}