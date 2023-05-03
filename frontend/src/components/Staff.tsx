import { useEffect } from "react";
import './Staff.scss'

interface staffProps {
    notationString: string
}

export default function Staff({ notationString }: staffProps) {

    useEffect(() => {
    }, []);

    return (
        <div className='staff-container'>
          <div id="staff"></div>
        </div>
    );
}