import { IPlayItem } from '../../../../interfaces/play-item.interface';
import { Control } from '../../../../service/control'
import { Utils } from '../utils';

export class WaiteListItem extends Control {
    public name: string = 'waitList';
    public id: string;

    private icon: Control;
    private container: Control;
    private title: Control;
    private time: Control;

    public onClick: () => void;

    constructor(item: IPlayItem, time: number, id: string) {
        super(null, 'li', 'items-list__item');
        this.id = id;

        this.icon = new Control(this.node, 'div', ['items-list__item__icon', 'arrow-to-left']);
        const svg = document.createElementNS(`http://www.w3.org/2000/svg`, "svg");
        svg.setAttribute('viewBox', '0 0 30 15.7');
        svg.innerHTML = `<path d="M29.7,1.4l-14,14c-0.4,0.4-1,0.4-1.4,0l-14-14c-0.4-0.4-0.4-1,0-1.4h29.4C30.1,0.4,30.1,1,29.7,1.4z"/>
        `;
        this.icon.node.appendChild(svg);
        this.icon.node.onclick = () => this.onClick();

        this.container = new Control(this.node, 'div', 'items-list__item__info');
        this.title = new Control(this.container.node, 'p', '', item.title);

        this.time = new Control(this.container.node, 'p', '', Utils.viewTime(time));
    }

    destroy(): void {
        this.icon.node.onclick = null;
        super.destroy();
    }
}