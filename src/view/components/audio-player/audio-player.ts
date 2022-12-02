import { Control } from '../../../service/control';
import { IPlayItem } from '../../../interfaces/play-item.interface';

type AudioItem = {
    item: IPlayItem,
    icon: SVGSVGElement,
    list: Control,
    time: number;
}

type onclickSet = {
    playStopAudio: () => void
}

export class AudioPlayerCustomHTML extends HTMLElement {
    private audio = new Audio();
    private currwntAudioInfo: null | IPlayItem = null;
    private waitListItems: AudioItem[] = [];
    private playListItems: IPlayItem[] = [];

    //HTMLElements
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
    private lists: Control;
    private playListWrap: Control;
    private playListTitle: Control;
    private playListUl: Control;
    private waitingList: Control;
    private waitingListTitle: Control;

    isPlay = false;
    static observedAttributes = [
        'playList',

    ];

    get playList(): IPlayItem[] {
        const list = JSON.parse(this.getAttribute('playList'));
        return list;
    }

    set playList(value: IPlayItem[]) {
        this.setAttribute('playList', JSON.stringify(value));
    }

    constructor() {
        super();
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

        this.lists = new Control(this.container.node, 'div', 'audio-player__lists');
        this.playListWrap = new Control(this.lists.node, 'div', ['audio-player__lists__play-list', 'list']);
        this.playListTitle = new Control(this.playListWrap.node, 'h4', 'list__title', 'Play List');
        this.playListUl = new Control(this.playListWrap.node, 'ul', 'audio-player__lists__play-list__list');
        this.waitingList = new Control(this.lists.node, 'h3', ['audio-player__lists__waiting-list', 'list']);
        this.waitingListTitle = new Control(this.waitingList.node, 'h4', 'list__title', 'Waiting list');
    }

    disconnectedCallback() {
        // браузер вызывает этот метод при удалении элемента из документа
        // (может вызываться много раз, если элемент многократно добавляется/удаляется)
    }

    attributeChangedCallback(name: any, oldValue: any, newValue: any) {

    }

    update() {

    }

    play() {
        this.audio.play();
        this.isPlay = true;
    }

    pause() {
        this.audio.pause();
        this.isPlay = false;
    }

    onClick = (type: keyof onclickSet, item: IPlayItem, audio: HTMLAudioElement): void => {
        const onclics = {
            playStopAudio: this.playStopAudio,
        }
        onclics[type](item, audio);
    }

    playStopAudio = (item: IPlayItem, audio: HTMLAudioElement): void => {
        if (this.audio === audio) {
            if (this.isPlay) {
                this.play();
            } else {
                this.pause();
            }
        } else {
            if (this.isPlay) {
                this.audio.pause();
                this.audio.currentTime = 0;
            }
            this.currwntAudioInfo = item;
            this.audio = audio;
            this.update();
            this.play();
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
}