import { Control } from '../../../service/control';
import { IPlayList } from '../../../data/play-list';

export class AudioPlayerCustomHTML extends HTMLElement {
    private audio = new Audio();
    private container: Control;

    private controls: Control;

    private playButton: Control;
    private timeBar: Control;
    private timeBarRunner: Control;

    private times: Control;
    private timesTimer: Control;
    private timesAudioTime: Control;

    private soundBar: Control;
    private soundBarRunner: Control;

    private playListWrap: Control;
    private playListTitle: Control;

    isPlay = false;
    static observedAttributes = [
        'playList',

    ];

    get playList(): IPlayList[] {
        const list = JSON.parse(this.getAttribute('playList'));
        return list;
    }

    set playList(value: IPlayList[]) {
        this.setAttribute('playList', JSON.stringify(value));
    }

    constructor() {
        super();

        //this.audio.src = 'assets/audio/Christmas_Time_-_Jingle_Bell_Rock_(musmore.com).mp3';
    }

    connectedCallback() {
        this.container = new Control(this, 'section', 'audio-player');
        this.controls = new Control(this.container.node, 'div', 'audio-player__controls');
        this.playButton = new Control(this.controls.node, 'button', 'audio-player__controls__button', '+');
        this.playButton.node.onclick = () => this.play();

        this.timeBar = new Control(this.controls.node, 'div', 'audio-player__controls__time-bar');
        this.timeBarRunner = new Control(this.timeBar.node, 'div', 'audio-player__controls__time-bar__runner');

        this.times = new Control(this.controls.node, 'div', 'audio-player__controls__times');
        this.timesTimer = new Control(this.times.node, 'p', 'audio-player__controls__times__timer', '00:00');
        this.timesAudioTime = new Control(this.times.node, 'p', 'audio-player__controls__times__audio-time', '00:00');

        this.soundBar = new Control(this.controls.node, 'div', 'audio-player__controls__sound-bar');
        this.soundBarRunner = new Control(this.soundBar.node, 'div', 'audio-player__controls__sound-bar__runner');

        this.playListWrap = new Control(this.container.node, 'div', 'audio-player__play-list');
        this.playListTitle = new Control(this.playListWrap.node, 'h3', 'audio-player__play-list__title', 'Play List');
    }

    disconnectedCallback() {
        // браузер вызывает этот метод при удалении элемента из документа
        // (может вызываться много раз, если элемент многократно добавляется/удаляется)
    }

    attributeChangedCallback(name: any, oldValue: any, newValue: any) {

    }

    update() { }

    play() {
        if (this.isPlay) {
            this.audio.pause();
        } else {
            this.audio.play();
        }
        this.isPlay = !this.isPlay;
    }
}