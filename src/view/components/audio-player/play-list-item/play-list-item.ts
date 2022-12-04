import { IPlayItem } from '../../../../interfaces/play-item.interface';
import { Control } from '../../../../service/control'
import { Utils } from '../utils';

export class PlayItem extends Control {
    private playIcon: Control;
    private container: Control;
    private title: Control;
    private time: Control;
    private arroyIcon: Control;

    public onClick: () => void;

    constructor(item: IPlayItem) {
        super(null, 'li', 'items-list__item');

        this.playIcon = new Control(this.node, 'div', ['items-list__item__icon', 'not-active-atem']);
        const svg2 = document.createElementNS(`http://www.w3.org/2000/svg`, "svg");
        svg2.setAttribute('viewBox', '0 0 30 15.7');
        svg2.innerHTML = `<path d="M29.7,1.4l-14,14c-0.4,0.4-1,0.4-1.4,0l-14-14c-0.4-0.4-0.4-1,0-1.4h29.4C30.1,0.4,30.1,1,29.7,1.4z"/>
        `;
        this.playIcon.node.appendChild(svg2);
        this.playIcon.node.onclick = () => this.onClick();

        this.container = new Control(this.node, 'div', 'items-list__item__info');
        this.title = new Control(this.container.node, 'p', '', item.title);

        const timeView = item.time ? Utils.viewTime(item.time) : '00:00';
        this.time = new Control(this.container.node, 'p', '', timeView);

        this.arroyIcon = new Control(this.node, 'div', ['items-list__item__icon', 'arrow-to-right']);
        const svg = document.createElementNS(`http://www.w3.org/2000/svg`, "svg");
        svg.setAttribute('viewBox', '0 0 30 15.7');
        svg.innerHTML = `<path d="M29.7,1.4l-14,14c-0.4,0.4-1,0.4-1.4,0l-14-14c-0.4-0.4-0.4-1,0-1.4h29.4C30.1,0.4,30.1,1,29.7,1.4z"/>
        `;
        this.arroyIcon.node.appendChild(svg);
        this.arroyIcon.node.onclick = () => this.onClick();
    }

    update() {

    }

    destroy(): void {
        this.arroyIcon.node.onclick = null;
        this.playIcon.node.onclick = null;
        super.destroy();
    }
}