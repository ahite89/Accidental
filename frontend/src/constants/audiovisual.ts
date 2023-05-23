import abcjs, { AbcVisualParams } from 'abcjs';
import { CursorControl } from '../services/cursorcontrol';

export const synth = new abcjs.synth.CreateSynth();
export const cursorControl = new CursorControl(0, 0, null);  // temporary
export const synthControl = new abcjs.synth.SynthController();
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