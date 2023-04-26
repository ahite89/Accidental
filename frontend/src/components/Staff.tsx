import { useEffect } from "react";
import abcjs from "abcjs"; 

export default function Staff() {
    useEffect(() => {
        const abcjsInit = async () => {
            //const abcjs = await import("abcjs");
            const note = 'b4'
            abcjs.renderAbc("staff", `X:1\nK:F\nEEA2|bbA2G${note}eFGA|\nAAABBDD|gA4`)
        };
        abcjsInit();
    }, []);

    return (
        <div id="staff"></div>
    );
}