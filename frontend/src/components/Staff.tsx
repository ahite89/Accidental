import { StaffProps } from "../types/staff";


function Staff({ onClickGenerate }: StaffProps) {
    return (
        <div>
            <h1>Hiiiiiiii</h1>
            <button onClick={onClickGenerate}>Start</button>
        </div>
    );
}

export default Staff;