import { useState } from 'react';
import className from "classnames";
import '../index.css';

import Button from './parameters/Button';
import DropDown from "./parameters/Dropdown";
import MultiRangeSlider from "./parameters/MultiRangeSlider";
import RangeSlider from "./parameters/RangeSlider";
import SelectableList from './parameters/SelectableList';

import { ControlPanelProps } from "../interfaces/controlPanel";
import { DurationProps } from '../interfaces/selectable';

import { MajorKeys, MinorKeys, keyOptions } from "../constants/keys";
import { Scales, scaleOptions } from "../constants/scales";
import { instrumentOptions, Instruments } from "../constants/instruments";
import { pitchNumberMap } from "../constants/pitchRange";
import { MIN_PITCH_DISTANCE, MIN_PITCH_NUMBER, MAX_PITCH_NUMBER } from "../constants/pitchRange";
import { MIN_VOLUME, MAX_VOLUME, VOLUME_INTERVAL } from "../constants/volume";
import * as Tempo from "../constants/tempo";

export default function ControlPanel({ voiceNumber, onSubmit, handleCloseControlPanel, randomizerParameters }: ControlPanelProps) {

    const handleSubmitParameters = (): void => {
        onSubmit({
            keySelection,
            scaleSelection,
            instrumentSelection,
            pitchRangeSelection,
            tempoSelection,
            volumeSelection,
            durationSelection
        }, voiceNumber)
    };

    // Scale
    const [scaleSelection, setScaleSelection] = useState<Scales>(randomizerParameters.scaleSelection);
    const handleScaleSelection = (scale: Scales): void => {
        setScaleSelection(scale);
    };
    
    // Key
    const [keySelection, setKeySelection] = useState<MajorKeys | MinorKeys>(randomizerParameters.keySelection);
    const handleKeySelection = (key: MajorKeys | MinorKeys): void => {
        setKeySelection(key);
    };

    // Instrument
    const [instrumentSelection, setInstrumentSelection] = useState<Instruments>(randomizerParameters.instrumentSelection);
    const handleInstrumentSelection = (instrument: Instruments): void => {
        setInstrumentSelection(instrument);
    };

    // Range
    const [pitchRangeSelection, setPitchRangeSelection] = useState<number[]>(randomizerParameters.pitchRangeSelection);
    const handlePitchRangeSelection = (pitchRange: number[]): void => {
        setPitchRangeSelection([pitchRange[0], pitchRange[1]]);
    };

    // Tempo
    const [tempoSelection, setTempoSelection] = useState<number>(randomizerParameters.tempoSelection);
    const handleTempoSelection = (tempo: number): void => {
        setTempoSelection(tempo);
    };

    // Volume
    const [volumeSelection, setVolumeSelection] = useState<number>(randomizerParameters.volumeSelection);
    const handleVolumeSelection = (volume: number): void => {
        setVolumeSelection(volume);
    };

    // Duration
    const [durationSelection, setDurationSelection] = useState<DurationProps[]>(randomizerParameters.durationSelection);

    const handleDurationSelection = (durationObject: DurationProps) => {
        const updatedDurations = durationSelection.map((duration) => {
            // Toggle selected value if duration is clicked
            if (duration.noteLength === durationObject.noteLength) {
                return {
                    noteLength: duration.noteLength,
                    selected: !duration.selected,
                    abcSyntax: duration.abcSyntax,
                    audioDuration: duration.audioDuration
                };
            }
            
            return duration;
        });

        setDurationSelection(updatedDurations);
    };

    const classes = className(
        'p-2 flex flex-col items-center'
    );

    return (
        <div className={classes}>
            <div className="flex flex-row mb-8">
                <DropDown options={scaleOptions()} value={scaleSelection} onChange={handleScaleSelection}>Scale</DropDown>
                <DropDown options={keyOptions(scaleSelection)} value={keySelection} onChange={handleKeySelection}>Key</DropDown>
                <DropDown options={instrumentOptions()} value={instrumentSelection} onChange={handleInstrumentSelection}>Instrument</DropDown>
            </div>
            <div className="flex flex-col items-center mb-8">
                <SelectableList 
                    options={durationSelection}
                    onSelect={handleDurationSelection}
                >
                    Note Durations
                </SelectableList>
            </div>
            {/* Custom scale buttons */}
            <MultiRangeSlider 
                min={MIN_PITCH_NUMBER}
                max={MAX_PITCH_NUMBER}
                minDistance={MIN_PITCH_DISTANCE}
                valueRange={pitchRangeSelection}
                onChangeValues={handlePitchRangeSelection}
                map={pitchNumberMap}
            >
                Pitch Range
            </MultiRangeSlider>
            <div className="notes-on-staff-image"></div>
            <RangeSlider
                min={Tempo.MIN_TEMPO}
                max={Tempo.MAX_TEMPO}
                value={tempoSelection}
                onChangeValue={handleTempoSelection}
                interval={Tempo.TEMPO_INTERVAL}
            >
                Tempo
            </RangeSlider>
            <RangeSlider
                min={MIN_VOLUME}
                max={MAX_VOLUME}
                value={volumeSelection}
                onChangeValue={handleVolumeSelection}
                interval={VOLUME_INTERVAL}
            >
                Volume
            </RangeSlider>
            <div className="flex justify-center mb-4">
                <Button primary extraStyling="mr-4" onClick={handleSubmitParameters}>Save Changes</Button>
                <Button onClick={handleCloseControlPanel}>Cancel</Button>
          </div>
        </div>
    );
}