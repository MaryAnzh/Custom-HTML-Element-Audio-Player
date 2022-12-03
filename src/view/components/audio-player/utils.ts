export class Utils {
    constructor() {

    }
    
    static viewTime(time: number): string {
        const t = time * 1000;
        let min = Math.floor(t / 1000 / 60);
        let sec = Math.floor((t - (min * 1000 * 60)) / 1000);
        if (sec > 59) {
            min += 1;
            sec = sec - 60;
        }
        const minView = min < 10 ? `0${min}` : min;
        const secView = sec < 10 ? `0${sec}` : sec;
        return minView + ':' + secView;
    }
}