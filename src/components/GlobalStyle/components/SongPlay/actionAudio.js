export const secondsToMinutes = (seconds) => {
    const [mins, secs] = [Math.floor(seconds / 60), Math.ceil(seconds % 60)];
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};
