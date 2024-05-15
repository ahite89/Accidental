import { StaffProps } from "../interfaces/staff";

export default function Staff({voiceNumber, randomizerParams, generating, handleOpenControlPanel}: StaffProps) {
    const pointerType = generating ? "" : "cursor-pointer hover:opacity-50";
    return (
      <div className={pointerType} onClick={() => handleOpenControlPanel(voiceNumber, randomizerParams, generating)}>
        <div 
          className="bg-white shadow-md shadow-slate-300 border border-cyan-500" id={`staff-${voiceNumber}`}>
        </div>
      </div>
    );
}