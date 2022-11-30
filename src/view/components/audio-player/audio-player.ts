import { Control } from '../../../service/control';
import { IPlayList } from '../../../data/play-list';

type AudioItem = {
    item: IPlayList,
    icon: SVGSVGElement,
    list: Control,
    time: number;
}

export class AudioPlayerCustomHTML extends HTMLElement {
    private audio = new Audio();
    private currwntAudioInfo: null | IPlayList = null;
    private waitListItems: AudioItem[] = [];
    private playListItems: IPlayList[] = [];

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

    get playList(): IPlayList[] {
        const list = JSON.parse(this.getAttribute('playList'));
        return list;
    }

    set playList(value: IPlayList[]) {
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
        this.addWaitAudioList(this.waitingList.node, this.playList);
    }

    disconnectedCallback() {
        // браузер вызывает этот метод при удалении элемента из документа
        // (может вызываться много раз, если элемент многократно добавляется/удаляется)

    }

    attributeChangedCallback(name: any, oldValue: any, newValue: any) {

    }

    addWaitAudioList(perent: HTMLElement, items: IPlayList[]): void {
        const ul = new Control(perent, 'ul', 'items-list');
        items.forEach((item, i) => {
            this.addWaitAudioItem(ul.node, item, i);
        });
    }

    addWaitAudioItem(perent: HTMLElement, item: IPlayList, i: number) {
        const li = new Control(perent, 'li', 'items-list__item');
        const audio = new Audio();
        audio.src = item.src;
        const svg = document.createElementNS(`http://www.w3.org/2000/svg`, "svg");
        svg.setAttribute('viewBox', '0 0 30 15.7');
        svg.innerHTML = `<path d="M29.7,1.4l-14,14c-0.4,0.4-1,0.4-1.4,0l-14-14c-0.4-0.4-0.4-1,0-1.4h29.4C30.1,0.4,30.1,1,29.7,1.4z"/>
        `;
        li.node.appendChild(svg);
        const itemInfo = new Control(li.node, 'div', 'items-list__item__info');
        const name = new Control(itemInfo.node, 'p', '', item.title);
        const time = new Control(itemInfo.node, 'p', '');
        let audioTime = 0;
        audio.onloadedmetadata = () => {
            audioTime = audio.duration;
            time.node.textContent = this.viewTime(audioTime);
            audio.onloadedmetadata = null;
        }

        const info: AudioItem = {
            item: item,
            icon: svg,
            list: li,
            time: audioTime,
        };

        this.waitListItems.push(info);
        svg.onclick = () => this.onClick(info);
    }

    addAudioItem(perent: HTMLElement, item: IPlayList) {
        const li = new Control(perent, 'li', 'play-list-item');
        const audio = new Audio();
        audio.src = item.src;
        const icon = new Control(li.node, 'div', 'play-list-item__icon');

        const itemInfo = new Control(li.node, 'div', 'play-list-item__info');
        const name = new Control(itemInfo.node, 'p', '', item.title);
        const text = item.time ? this.viewTime(item.time) : '';
        const time = new Control(itemInfo.node, 'p', '', text);
        const svg = document.createElementNS(`http://www.w3.org/2000/svg`, "svg");
        svg.setAttribute('viewBox', '0 0 30 15.7');
        svg.innerHTML = `<path d="M29.7,1.4l-14,14c-0.4,0.4-1,0.4-1.4,0l-14-14c-0.4-0.4-0.4-1,0-1.4h29.4C30.1,0.4,30.1,1,29.7,1.4z"/>
        `;
        li.node.appendChild(svg);
        icon.node.onclick = () => this.onClickPlay(item, audio);

    }


    update() {
        if (this.currwntAudioInfo) {
            if (this.currwntAudioInfo.time) {
                this.timesAudioTime.node.textContent = this.viewTime(this.currwntAudioInfo.time);
            }
        }
    }

    play() {
        if (this.isPlay) {
            this.audio.pause();
        } else {
            this.audio.play();
        }
        this.isPlay = !this.isPlay;
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

    onClick = (info: AudioItem): void => {
        info.icon.onclick = null;
        info.list.destroy();
        const item: IPlayList = info.item;
        item.time = info.time;
        this.playListItems.push(item);

        this.waitListItems = this.waitListItems.filter(el => el !== info);
        this.addAudioItem(this.playListUl.node, info.item);
    }

    onClickPlay = (item: IPlayList, audio: HTMLAudioElement): void => {
        if (this.audio === audio) {
            this.play();
        } else {
            if (this.isPlay) {
                this.audio.pause();
                this.audio.currentTime = 0;
            }
            this.currwntAudioInfo = item;
            this.audio = audio;
            this.update();
            this.audio.play();
            this.isPlay = true;
        }
    }
}