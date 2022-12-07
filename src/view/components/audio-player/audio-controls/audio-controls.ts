import { IPlayItem } from '../../../../interfaces/play-item.interface';
import { Control } from '../../../../service/control';
import { Utils } from '../utils';

export class AudioControls extends Control {
    private _audio: null | HTMLAudioElement = null;
    private _timer: NodeJS.Timer;

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
    onClick: () => void;

    constructor(parent: HTMLElement) {
        super(parent, 'div', 'audio');

        this.audioControls = new Control(this.node, 'div', 'audio__controls');
        this.topContainer = new Control(this.audioControls.node, 'div', 'audio__controls__top');
        this.playButton = new Control(this.topContainer.node, 'button', ['audio__controls__top__button', 'play-button']);
        const svg = document.createElementNS(`http://www.w3.org/2000/svg`, "svg");
        svg.setAttribute('viewBox', '0 0 30 15.7');
        svg.innerHTML = `<path d="M29.7,1.4l-14,14c-0.4,0.4-1,0.4-1.4,0l-14-14c-0.4-0.4-0.4-1,0-1.4h29.4C30.1,0.4,30.1,1,29.7,1.4z"/>
        `;
        this.playButton.node.appendChild(svg);
        this.playButton.node.onclick = () => this.onClick();

        this.audioTitle = new Control(this.topContainer.node, 'h4', 'audio__controls__top__title', 'Title');

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
        if (this._audio !== null) {
            this._audio.play();
            this.isPlay = true;
            this._audio.onended = () => this.onEnded();
            this.playButton.node.classList.add('pause-button');
            this.playButton.node.classList.remove('play-button');
            this.startTimer();
        } else {
            this.audioTitle.node.textContent = 'Add audio in playlist';
        }
    }

    public pause(): void {
        this._audio.pause();
        this.isPlay = false;
        this._audio.onended = null;
        this.playButton.node.classList.remove('pause-button');
        this.playButton.node.classList.add('play-button');
        this.stopTimer();
    }

    public resetAudioTime() {
        this._audio.currentTime = 0;
        this._audio.onended = null;
    }

    public resetAudioData() {
        this.audioTime.node.textContent = Utils.viewTime(0);
        this.audioTitle.node.textContent = 'Title';
        this._audio = null;
    }

    private startTimer(): void {
        this._timer = setInterval(() => {
            const time = this._audio.currentTime;
            this.timesTimer.node.textContent = Utils.viewTime(time);
        }, 250);
    }

    private stopTimer(): void {
        clearInterval(this._timer);
    }

    destroy(): void {
        this.playButton.node.onclick = null;
        clearInterval(this._timer);
        super.destroy();
    }
}