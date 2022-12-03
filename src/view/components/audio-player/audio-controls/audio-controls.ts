import { Control } from '../../../../service/control';

export class AudioControls extends Control {
    private _audio = new Audio();

    get audio(): HTMLAudioElement {
        return this._audio;
    }

    set audio(audio: HTMLAudioElement) {
        this._audio = audio;
    }

    private audioControls: Control;
    private playButton: Control;
    private timeBar: Control;
    private timeBarRunner: Control;
    private times: Control;
    private timesTimer: Control;
    private timesAudioTime: Control;
    private soundBar: Control;
    private soundBarRunner: Control;

    public isPlay = false;

    constructor(parent: HTMLElement) {
        super(parent, 'div', 'audio');

        this.audioControls = new Control(this.node, 'div', 'audio__controls');
        this.playButton = new Control(this.audioControls.node, 'button', 'audio__controls__button', '+');
        //this.playButton.node.onclick = () => this.play();

        this.timeBar = new Control(this.audioControls.node, 'div', 'audio__controls__time-bar');
        this.timeBarRunner = new Control(this.timeBar.node, 'div', 'audio__controls__time-bar__runner');

        this.times = new Control(this.audioControls.node, 'div', 'audio__controls__times');
        this.timesTimer = new Control(this.times.node, 'p', 'audio__controls__times__timer', '00:00');
        this.timesAudioTime = new Control(this.times.node, 'p', 'audio__controls__times__audio-time', '00:00');

        this.soundBar = new Control(this.audioControls.node, 'div', 'audio__controls__sound-bar');
        this.soundBarRunner = new Control(this.soundBar.node, 'div', 'audio__controls__sound-bar__runner');
    }
}