import { StaffProps } from "../interfaces/staff";

export default function Staff({voiceNumber, randomizerParams, generating, handleOpenControlPanel}: StaffProps) {
    const pointerType = generating ? "" : "cursor-pointer";
    const hoverBorder = generating ? "bg-white shadow" : "bg-white shadow hover:border hover:border-cyan-500"
    return (
      <div className={pointerType} onClick={() => handleOpenControlPanel(voiceNumber, randomizerParams, generating)}>
        <div 
          className={hoverBorder} id={`staff-${voiceNumber}`}>
        </div>
      </div>
    );
}