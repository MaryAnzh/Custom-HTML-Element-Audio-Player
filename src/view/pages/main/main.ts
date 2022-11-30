import { Control } from "../../../service/control";
import { playListData } from '../../../data/play-list';
import { AudioPlayerCustomHTML } from "../../components/audio-player/audio-player";

export class Main extends Control {
    public name: string = 'main-page';
    private perentKey = 'MAIN';

    private title: Control;
    private audio: AudioPlayerCustomHTML;
    private playList = playListData;

    constructor() {
        super(null, 'div', ['main-page', 'page']);

        this.title = new Control(this.node, 'h2', `main-page__title`, 'Custom HTML Element');
        this.audio = <AudioPlayerCustomHTML>document.createElement('audio-player');
        this.audio.classList.add('main-page__audio-player');
        this.node.appendChild(this.audio);
        this.audio.playList = playListData;
    }

    translate(config: any): void {
        this.title.node.textContent = config[this.perentKey]['TITLE'];
    }

    destroy: () => void = () => {
        this.node.remove();
    };
}