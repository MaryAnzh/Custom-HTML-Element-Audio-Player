import { IPlayItem } from '../../../../interfaces/play-item.interface';
import { Control } from '../../../../service/control'

export class WaiteListItem extends Control {
    private icon: Control;
    private container: Control;
    private title: Control;
    private time: Control;
    public onClick: () => void;

    constructor(item: IPlayItem) {
        super(null, 'li', 'wait-item');

        this.icon = new Control(this.node, 'div', 'wait-item__icon');
        const svg = document.createElementNS(`http://www.w3.org/2000/svg`, "svg");
        svg.setAttribute('viewBox', '0 0 30 15.7');
        svg.innerHTML = `<path d="M29.7,1.4l-14,14c-0.4,0.4-1,0.4-1.4,0l-14-14c-0.4-0.4-0.4-1,0-1.4h29.4C30.1,0.4,30.1,1,29.7,1.4z"/>
        `;
        this.icon.node.appendChild(svg);
        this.icon.node.onclick = () => this.onClick();

        this.container = new Control(this.node, 'div', ['wait-item__container', 'item-container']);
        this.title = new Control(this.node, 'p', 'item-container__title');
        this.time = new Control(this.node, 'p', 'item-container__time');
    }
}


// addWaitAudioItem(perent: HTMLElement, item: IPlayItem, i: number) {
//     const li = new Control(perent, 'li', 'items-list__item');
//     const audio = new Audio();
//     audio.src = item.src;
//     const svg = document.createElementNS(`http://www.w3.org/2000/svg`, "svg");
//     svg.setAttribute('viewBox', '0 0 30 15.7');
//     svg.innerHTML = `<path d="M29.7,1.4l-14,14c-0.4,0.4-1,0.4-1.4,0l-14-14c-0.4-0.4-0.4-1,0-1.4h29.4C30.1,0.4,30.1,1,29.7,1.4z"/>
//     `;
//     li.node.appendChild(svg);
//     const itemInfo = new Control(li.node, 'div', 'items-list__item__info');
//     const name = new Control(itemInfo.node, 'p', '', item.title);
//     const time = new Control(itemInfo.node, 'p', '');
//     let audioTime = 0;
//     audio.onloadedmetadata = () => {
//         audioTime = audio.duration;
//         time.node.textContent = this.viewTime(audioTime);
//         audio.onloadedmetadata = null;
//     }

//     const info: AudioItem = {
//         item: item,
//         icon: svg,
//         list: li,
//         time: audioTime,
//     };

//     this.waitListItems.push(info);
//     svg.onclick = () => this.onClick(info);
// }