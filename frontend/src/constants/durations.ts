enum Durations {
    Sixteenth = '16',
    Eighth = '8',
    Quarter = '4',
    Half = '2',
    Whole = '1'
}

export const durationOptions = (): string[] => {
    const durations = [];
    for (let duration of Object.values(Durations)) {
        durations.push(duration)
    }
    console.log(durations);
    return durations;
};