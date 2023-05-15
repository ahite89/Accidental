export class CursorControl {
    beatNumber: number;
    beatSubdivisions: number;
    event: Event | null;

    constructor(beatNumber: number, beatSubdivisions: number, event: Event | null) {
      this.beatNumber = beatNumber;
      this.beatSubdivisions = beatSubdivisions;
      this.event = event;
    }
    
    onStart() {
      console.log("The tune has started playing.");
    }

    onFinished() {
      console.log("The tune has stopped playing.");
    }

    onBeat() {
      console.log("Beat " + this.beatNumber + " is happening.");
    }
    
    onEvent() {
      console.log("An event is happening", this.event);
    }
};