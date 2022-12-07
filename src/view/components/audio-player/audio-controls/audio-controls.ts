import { IPlayItem } from '../../../../interfaces/play-item.interface';
import { Control } from '../../../../service/control';
import { Utils } from '../utils';

export class AudioControls extends Control {
    private _audio: null | HTMLAudioElement = null;

    private audioControls: Control;

    private topContainer: Control;
    private playButton: Control;
    private audioTitle: Control;

    private timeBar: Control;
    private timeBarRunner: Control;
    private times: Control;
    private timesTimer: Control;
    private audioTime: Control;
    private soundBar: Control;
    private soundBarRunner: Control;

    private isPlay = false;
    public onEnded: () => void;

    constructor(parent: HTMLElement) {
        super(parent, 'div', 'audio');

        this.audioControls = new Control(this.node, 'div', 'audio__controls');
        this.topContainer = new Control(this.audioControls.node, 'div', 'audio__controls__top');
        this.playButton = new Control(this.topContainer.node, 'button', 'audio__controls__top__button', '+');
        this.audioTitle = new Control(this.topContainer.node, 'h4', 'audio__controls__top__title', 'Title');
        //this.playButton.node.onclick = () => this.play();

        this.timeBar = new Control(this.audioControls.node, 'div', 'audio__controls__time-bar');
        this.timeBarRunner = new Control(this.timeBar.node, 'div', 'audio__controls__time-bar__runner');

        this.times = new Control(this.audioControls.node, 'div', 'audio__controls__times');
        this.timesTimer = new Control(this.times.node, 'p', 'audio__controls__times__timer', '00:00');
        this.audioTime = new Control(this.times.node, 'p', 'audio__controls__times__audio-time', '00:00');

        this.soundBar = new Control(this.audioControls.node, 'div', 'audio__controls__sound-bar');
        this.soundBarRunner = new Control(this.soundBar.node, 'div', 'audio__controls__sound-bar__runner');
    }

    public update(title: string, time: number, audio: HTMLAudioElement) {
        this.audioTime.node.textContent = Utils.viewTime(time);
        this.audioTitle.node.textContent = title;
        this._audio = audio;
    }

    public play(): void {
        this._audio.play();
        this.isPlay = true;
        this._audio.onended = () => this.onEnded();
    }

    public pause(): void {
        this._audio.pause();
        this.isPlay = false;
        this._audio.onended = null;
    }

    public resetAudioTime() {
        this._audio.currentTime = 0;
        this._audio.onended = null;
    }

    public resetAudioData() {
        this.audioTime.node.textContent = Utils.viewTime(0);
        this.audioTitle.node.textContent = 'Title';
        this._audio = null;
        this._audio.onended = null;
    }

    private startTimer(): void { }

    private(): void { }
}