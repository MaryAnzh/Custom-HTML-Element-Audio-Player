import { Control } from '../../../service/control';

export class AudioPlayerCustomHTML extends HTMLElement {
    private audio = new Audio();
    private container: Control;
    private controls: Control;
    private playButton: Control;
    private timeBar: Control;
    private timeBarTimer: Control;
    private timeBarAudioTime: Control;
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