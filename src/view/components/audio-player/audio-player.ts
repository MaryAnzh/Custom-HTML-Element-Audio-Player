import { Control } from '../../../service/control';

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
    private playList: Control;
    isPlay = false;

    static observedAttributes = [
        'playButtonSize',
    ];

    get playButtonSize(): number {
        return +this.getAttribute('playButtonSize');
    }

    set playButtonSize(value: number) {
        this.setAttribute('playButtonSize', value.toString());
    }

    constructor() {
        super();

        this.audio.src = 'assets/audio/Christmas_Time_-_Jingle_Bell_Rock_(musmore.com).mp3';
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
        this.playList = new Control(this.container.node, 'div', 'audio-player__play-list');
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