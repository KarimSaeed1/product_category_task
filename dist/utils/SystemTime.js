export const nanoSystemTime = () => {
    const systemTimeMs = Date.now();
    const [seconds, nanoseconds] = process.hrtime();
    const timeInNano = systemTimeMs * 1e6 + nanoseconds;
    return timeInNano;
};
export const microSystemTime = () => {
    const systemTimeMs = Date.now();
    const [seconds, nanoseconds] = process.hrtime();
    const systemTimeMicro = systemTimeMs * 1e3;
    const nanosecondsToMicro = nanoseconds / 1000;
    const timeInMicro = systemTimeMicro + nanosecondsToMicro;
    return Math.floor(timeInMicro);
};
