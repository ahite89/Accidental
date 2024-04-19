import { StaffProps } from "../interfaces/staff";

export default function Staff({voiceNumber}: StaffProps) {
    return (
      <div>
        <div className="bg-white shadow" id={`staff-${voiceNumber}`}></div>
      </div>
    );
}