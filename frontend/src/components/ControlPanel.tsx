import { useState } from "react";
import classNames from "classnames";

import DropDown from "./parameters/Dropdown";
import MultiRangeSlider from "./parameters/MultiRangeSlider";
import RangeSlider from "./parameters/RangeSlider";
import Button from "./parameters/Button";
import Panel from "./parameters/Panel";

import { ControlPanelProps } from "../types/controlPanel";
import { keyOptions } from "../constants/keys";
import { scaleOptions } from "../constants/scales";
import { instrumentOptions } from "../constants/instruments";
import { durationOptions } from "../constants/durations";
import { pitchNumberMap } from "../constants/maps";
import { 
    MIN_PITCH_DISTANCE,
    MIN_PITCH_NUMBER,
    MAX_PITCH_NUMBER,
    MIN_TEMPO,
    MAX_TEMPO,
    TEMPO_INTERVAL,
    MIN_VOLUME,
    MAX_VOLUME,
    VOLUME_INTERVAL
} from "../constants/integers";
import { PanelProps } from "../types/panel";

export default function ControlPanel({ 
        keySelection,
        scaleSelection,
        instrumentSelection,
        tempoSelection,
        volumeSelection,
        handleKeySelection,
        handleScaleSelection,
        handleInstrumentSelection,
        handleTempoSelection,
        handleVolumeSelection,
        handleUpdateStaff 
    }: ControlPanelProps) {

    // Sliders
    // move to app.tsx
    const [minAssignedPitch, setMinAssignedPitch] = useState<number>(MIN_PITCH_NUMBER);
    const [maxAssignedPitch, setMaxAssignedPitch] = useState<number>(MAX_PITCH_NUMBER);

    const handleSetPitchRange = (pitchRange: number[]): void => {
        setMinAssignedPitch(pitchRange[0]);
        setMaxAssignedPitch(pitchRange[1]);
    };

    const [durationSelected, setDurationSelected] = useState<boolean>(false);
    const [durationPanelStyling, setDurationPanelStyling] = useState<string>('');

    const handleDurationClick = (): void => {
        setDurationSelected(!durationSelected);
        setDurationPanelStyling('bg-slate-200');
        // add selected duration to object

        // GONNA NEED TO CREATE NEW COMPONENT FOR THIS
    };

    const renderedDurations = durationOptions().map((duration) => {
        return (
            <Panel extraStyling={`bg-slate-100 border-slate-300 w-10 text-center cursor-pointer ${durationPanelStyling}`} clicked={durationSelected}
                onClick={handleDurationClick} key={duration.value}>
                {duration.value}
            </Panel>
        );         
     });

    const finalClassNames = classNames(
        'border rounded p-2 shadow bg-white flex flex-col items-center mx-2 my-10'
    );

    return (
        <div className={finalClassNames}>
            <div className="flex flex-row my-8">
                <DropDown options={keyOptions()} value={keySelection} onChange={handleKeySelection}>Key</DropDown>
                <DropDown options={scaleOptions()} value={scaleSelection} onChange={handleScaleSelection}>Scale</DropDown>
                <DropDown options={instrumentOptions()} value={instrumentSelection} onChange={handleInstrumentSelection}>Instrument</DropDown>
            </div>
            <MultiRangeSlider 
                min={MIN_PITCH_NUMBER}
                max={MAX_PITCH_NUMBER}
                minDistance={MIN_PITCH_DISTANCE}
                minValue={minAssignedPitch}
                maxValue={maxAssignedPitch}
                onChangeValues={handleSetPitchRange}
                map={pitchNumberMap}
            >
                Pitch Range
            </MultiRangeSlider>
            <RangeSlider
                min={MIN_TEMPO}
                max={MAX_TEMPO}
                value={tempoSelection}
                onChangeValue={handleTempoSelection}
                interval={TEMPO_INTERVAL}
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
            <label className="mb-4">Durations</label>
            <div className="flex flex-row">
                {renderedDurations}
            </div>
            {/* Note duration buttons (assemble values in object of bools) */}
            {/* Custom scale buttons */}
            <Button save rounded extraStyling="my-8" onClick={handleUpdateStaff}>Save Changes</Button>
        </div>
    );
}