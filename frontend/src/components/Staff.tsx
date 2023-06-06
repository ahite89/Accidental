import { StaffProps } from "../interfaces/staff";

export default function Staff({voiceNumber}: StaffProps) {     // change to STAVES
    return (
      <div>
        <div className="bg-white shadow" id={`staff-${voiceNumber}`}></div>
        {/* <div className="bg-white shadow mt-1" id="staff-2"></div>
        <div className="bg-white shadow mt-1" id="staff-3"></div>
        <div className="bg-white shadow mt-1" id="staff-4"></div> */}
      </div>
    );
}