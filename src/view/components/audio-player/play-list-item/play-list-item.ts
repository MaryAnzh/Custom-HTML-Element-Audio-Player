import { IPlayItem } from '../../../../interfaces/play-item.interface';
import { Control } from '../../../../service/control'
import { Utils } from '../utils';

export class PlayItem extends Control {
    private audio: HTMLAudioElement;
    private playIcon: Control;
    private container: Control;
    private title: Control;
    private time: Control;
    private arrowIcon: Control;

    public onClick: () => void;

    constructor(item: IPlayItem, audio: HTMLAudioElement, time: number) {
        super(null, 'li', ['items-list__item', 'play-list-item']);

        this.audio = audio;
        this.playIcon = new Control(this.node, 'div', ['items-list__item__icon', 'not-active-item']);
        const playSVG = document.createElementNS(`http://www.w3.org/2000/svg`, "svg");
        playSVG.setAttribute('viewBox', '0 0 30 15.7');
        playSVG.innerHTML = `<path d="M29.7,1.4l-14,14c-0.4,0.4-1,0.4-1.4,0l-14-14c-0.4-0.4-0.4-1,0-1.4h29.4C30.1,0.4,30.1,1,29.7,1.4z"/>
        `;
        this.playIcon.node.appendChild(playSVG);
        this.playIcon.node.onclick = () => this.onClick();

        this.container = new Control(this.node, 'div', ['items-list__item__info', 'play-list-item__info']);
        this.title = new Control(this.container.node, 'p', '', item.title);

        const timeView = Utils.viewTime(time);
        this.time = new Control(this.container.node, 'p', '', timeView);

        this.arrowIcon = new Control(this.node, 'div', ['items-list__item__icon', 'arrow-to-right']);
        const arrowSVG = document.createElementNS(`http://www.w3.org/2000/svg`, "svg");
        arrowSVG.setAttribute('viewBox', '0 0 30 15.7');
        arrowSVG.innerHTML = `<path d="M29.7,1.4l-14,14c-0.4,0.4-1,0.4-1.4,0l-14-14c-0.4-0.4-0.4-1,0-1.4h29.4C30.1,0.4,30.1,1,29.7,1.4z"/>
        `;
        this.arrowIcon.node.appendChild(arrowSVG);
        this.arrowIcon.node.onclick = () => this.onClick();
    }

    public active() {
        this.playIcon.node.classList.remove('not-active-item');
        this.playIcon.node.classList.add('active-item-pause');
    }

    public deactivate() {
        this.playIcon.node.classList.remove('active-item-pause');
        this.playIcon.node.classList.add('not-active-item');
    }

    public play() {
        this.audio.play();
        this.playIcon.node.classList.remove('active-item-pause');
        this.playIcon.node.classList.add('active-item-play');
    }

    public pause() {
        this.audio.pause();
        this.playIcon.node.classList.remove('active-item-play');
        this.playIcon.node.classList.add('active-item-pause');
    }

    public destroy(): void {
        this.arrowIcon.node.onclick = null;
        this.playIcon.node.onclick = null;
        super.destroy();
    }
}