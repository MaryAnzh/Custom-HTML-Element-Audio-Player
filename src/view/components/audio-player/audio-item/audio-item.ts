import { Control } from '../../../../service/control';
import { IPlayList } from '../../../../data/play-list';

export class AudioItem extends Control {
    private item: IPlayList;
    private icon: SVGSVGElement;
    private audio = new Audio();
    private itemInfo: Control;
    private name: Control;
    private time: Control;
    public onClick: (item: IPlayList) => IPlayList;

    constructor(item: IPlayList) {
        super(null, 'li', 'audio-item');

        this.item = item;
        this.icon = document.createElementNS(`http://www.w3.org/2000/svg`, "svg");
        this.icon.setAttribute('viewBox', '0 0 30 15.7');
        this.icon.innerHTML = `<path d="M29.7,1.4l-14,14c-0.4,0.4-1,0.4-1.4,0l-14-14c-0.4-0.4-0.4-1,0-1.4h29.4C30.1,0.4,30.1,1,29.7,1.4z"/>
        `;
        this.node.appendChild(this.icon);

        this.itemInfo = new Control(this.node, 'div', 'item__info');
        this.name = new Control(this.itemInfo.node, 'p', '', item.title);
        this.time = new Control(this.itemInfo.node, 'p', '');
        this.audio.onloadedmetadata = () => {
            this.time.node.textContent = this.viewTime(this.audio.duration);
            this.audio.onloadedmetadata = null;
        }
    }

    viewTime(time: number): string {
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

    destroy: () => void = () => {
        this.node.remove();
    };
}