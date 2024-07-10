import { durationOptions } from "../constants/durations";
import { DEFAULT_INSTRUMENT } from "../constants/instruments";
import { DEFAULT_KEY } from "../constants/keys";
import { DEFAULT_PITCH_RANGE } from "../constants/pitchRange";
import { DEFAULT_SCALE } from "../constants/scales";
import { DEFAULT_STEPS, DEFAULT_REPEAT_NOTE } from "./steps";
import { DEFAULT_TEMPO } from "../constants/tempo";
import { DEFAULT_VOLUME } from "../constants/volume";

import { RandomizerParameters } from "../interfaces/controlPanel";

// Voice Notation
export const FIRST_EIGHT_BARS = "xxxx|xxxx|xxxx|xxxx|xxxx|xxxx|xxxx|xxxx|\n";

export const VOICE_NUMBERS = [1, 2, 3, 4];

// Clefs
export enum Clefs {
    Treble = 'treble',
    Alto = 'alto',
    Bass = 'bass'
}

export const DEFAULT_CLEF = "treble";

// Control Panel Parameters
export const DEFAULT_RANDOMIZER_PARAMS: RandomizerParameters = {
    keySelection: DEFAULT_KEY,
    scaleSelection: DEFAULT_SCALE,
    pitchRangeSelection: DEFAULT_PITCH_RANGE,
    stepsSelection: DEFAULT_STEPS,
    repeatNoteSelection: DEFAULT_REPEAT_NOTE,
    instrumentSelection: DEFAULT_INSTRUMENT,
    tempoSelection: DEFAULT_TEMPO,
    volumeSelection: DEFAULT_VOLUME,
    durationSelection: durationOptions
 } 