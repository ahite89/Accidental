import abcjs, { AbcVisualParams } from 'abcjs';
import { CursorControl } from '../services/cursorcontrol';

export const synthOne = new abcjs.synth.CreateSynth();
// export const synthTwo = new abcjs.synth.CreateSynth();

//export const cursorControl = new CursorControl(0, 0, null);  // temporary
export const synthControlOne = new abcjs.synth.SynthController();
// export const synthControlTwo = new abcjs.synth.SynthController();
// export const synthControlThree = new abcjs.synth.SynthController();
// export const synthControlFour = new abcjs.synth.SynthController();

export const audioContext = new AudioContext();
export const notationOptions: AbcVisualParams = {
    add_classes: true, 
    wrap: { 
        minSpacing: 1.8,
        maxSpacing: 2.7,
        preferredMeasuresPerLine: 4
    }, 
    viewportHorizontal: true,
    staffwidth: 800,
    scrollHorizontal: true 
};