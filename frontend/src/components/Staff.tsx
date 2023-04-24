import { StaffProps } from "../types/staff";


function Staff({ onClickGenerate }: StaffProps) {
    return (
        <div>
            <h1>Generate</h1>
            <button onClick={onClickGenerate}>Start</button>
        </div>
    );
}

export default Staff;