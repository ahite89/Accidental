import { Clefs } from "../constants/voices";

export const fetchClefBasedOnPitchRange = (pitchRangeSelection: number[]): Clefs => {
    const pitchRangeMin = pitchRangeSelection[0];
    const pitchRangeMax = pitchRangeSelection[1];

    // G3
    if (pitchRangeMin >= 55) {
        return Clefs.Treble;
    }
    // E4
    else if (pitchRangeMax <= 64) {
        return Clefs.Bass;
    }

    return Clefs.Alto;
};