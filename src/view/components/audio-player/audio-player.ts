import { Control } from '../../control';

export class AudioPlayerCustomHTML extends HTMLElement {
    private audio = new Audio();
    private container: Control;
    private playButton: Control;
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
        this.container = new Control(this, 'section', 'audio-palayer', '', null);
        this.playButton = new Control(this.container.node, 'button', 'audio-palayer__button', '+', null);
        this.playButton.node.onclick = () => this.play();
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