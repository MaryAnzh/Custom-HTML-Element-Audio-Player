import { Control } from "../../../service/control";
import { playListData } from '../../../data/play-list';
import { AudioPlayerCustomHTML } from "../../components/audio-player/audio-player";
import { IDictionary } from "../../../service/translator/dictionary.interface";

export class Main extends Control {
    public name: string = 'main-page';
    private perentKey: keyof IDictionary = 'MAIN';

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

    translate(dictionary: IDictionary): void {
        const titleKey: keyof IDictionary['MAIN'] = 'TITLE';
        this.title.node.textContent = dictionary.MAIN[titleKey];
    }

    destroy: () => void = () => {
        this.node.remove();
    };
}