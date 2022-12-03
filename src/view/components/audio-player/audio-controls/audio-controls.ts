import { IPlayItem } from '../../../../interfaces/play-item.interface';
import { Control } from '../../../../service/control';
import { Utils } from '../utils';

export class AudioControls extends Control {
    private _audio = new Audio();

    private audioControls: Control;

    private topContainar: Control;
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

    constructor(parent: HTMLElement) {
        super(parent, 'div', 'audio');

        this.audioControls = new Control(this.node, 'div', 'audio__controls');
        this.topContainar = new Control(this.audioControls.node, 'div', 'audio__controls__top');
        this.playButton = new Control(this.topContainar.node, 'button', 'audio__controls__top__button', '+');
        this.audioTitle = new Control(this.topContainar.node, 'h4', 'audio__controls__top__title', 'Title');
        //this.playButton.node.onclick = () => this.play();

        this.timeBar = new Control(this.audioControls.node, 'div', 'audio__controls__time-bar');
        this.timeBarRunner = new Control(this.timeBar.node, 'div', 'audio__controls__time-bar__runner');

        this.times = new Control(this.audioControls.node, 'div', 'audio__controls__times');
        this.timesTimer = new Control(this.times.node, 'p', 'audio__controls__times__timer', '00:00');
        this.audioTime = new Control(this.times.node, 'p', 'audio__controls__times__audio-time', '00:00');

        this.soundBar = new Control(this.audioControls.node, 'div', 'audio__controls__sound-bar');
        this.soundBarRunner = new Control(this.soundBar.node, 'div', 'audio__controls__sound-bar__runner');
    }

    public update(item: IPlayItem) {
        this._audio.src = item.src;
        this.audioTime.node.textContent = item.time ? Utils.viewTime(item.time) : '00:00';
        this.audioTitle.node.textContent = item.title;
    }

    public play(): void {
        this._audio.play();
        this.isPlay = true;
    }

    public pause(): void {
        this._audio.pause();
        this.isPlay = false;
    }

    private startTimer(): void { }

    private stopTimer(): void {}
}