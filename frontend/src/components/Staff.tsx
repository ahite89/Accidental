import { useEffect, useState } from "react";
//import abcjs from "abcjs"; 

interface staffProps {
    onClickGenerate: () => void;
}

export default function Staff({ onClickGenerate }: staffProps) {

    //const [notationString, setNotationString] = useState('')

    useEffect(() => {
    }, []);

    

    return (
        //<div style={{border: '1px solid gray', padding: '10px'}}>
        //    <button onClick={onClickGenerate}>Make those notes happen!</button>
        //    <div id="staff"></div>
        //</div>
        <div>hi</div>
    );
}

// Function: while generating, feed array of note objects into rendering loop
//
// create an array of note objects
// create a starting string with the clef, key, and some hidden notes (do so in useEffect)
// in click event handler, call a function that iterates over the array
// while looping, continuously append notes to the end of the string, re-rendering after each addition
// use string interpolation to add note name, duration, etc. to the string
// use setTimeout or setInterval to handle how quickly the rendering occurs
// put in a barline after four beats 
// put in a newline regularly
// if (first beat of current bar note == last beat of previous bar note) => use tie
// make the newest note a different color?
// loop => until end of array
// this can lead to replay functionality, since full string of notes is saved