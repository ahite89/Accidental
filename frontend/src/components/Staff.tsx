import { useEffect } from "react";
import abcjs from "abcjs"; 

export default function Staff() {
    useEffect(() => {
        const abcjsInit = async () => {
            const note = 'b4'
            abcjs.renderAbc("staff", `X:1\nK:F\naaz2BBb''|cDd_d,,f^|\nabBe2g^4`)
        };
        abcjsInit();
    }, []);

    return (
        <div style={{border: '1px solid gray'}} id="staff"></div>
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