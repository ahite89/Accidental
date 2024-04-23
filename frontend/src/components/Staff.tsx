import { StaffProps } from "../interfaces/staff";

export default function Staff({voiceNumber, randomizerParams, isGenerating, handleOpenControlPanel}: StaffProps) {
    return (
      <div className="cursor-pointer" onClick={() => handleOpenControlPanel(voiceNumber, randomizerParams)}>
        <div 
          className="bg-white shadow hover:border hover: border-cyan-500" id={`staff-${voiceNumber}`}>
        </div>
      </div>
    );
}