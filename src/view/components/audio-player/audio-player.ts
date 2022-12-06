import { Control } from '../../../service/control';
import { IPlayItem, IWaitListItem, IPlayListItem } from '../../../interfaces/play-item.interface';
import { AudioControls } from './audio-controls/audio-controls'
import { WaiteListItem } from './wait-item/wait-item'
import { PlayItem } from './play-list-item/play-list-item';

type OnclickSet = {
    moveItemToPlayList: (item: WaiteListItem) => void,
}

export class AudioPlayerCustomHTML extends HTMLElement {
    //data
    private isAudioInPlayer: boolean = false;
    private _waitListItems: IWaitListItem[];
    private _playListItems: IPlayListItem[];

    //HTMLElements
    private container: Control;
    private controls: AudioControls;
    private lists: Control;
    private playListWrap: Control;
    private playListTitle: Control;
    private playListUl: Control;
    private waitingList: Control;
    private waitingListTitle: Control;
    private waitingListUl: Control;

    //Attributes
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

        this._playListItems = [];
        this._waitListItems = [];
    }

    async connectedCallback() {
        //audio container
        this.container = new Control(this, 'section', 'audio-player');
        //audio controls
        this.controls = new AudioControls(this.container.node);
        //audio Lists
        this.lists = new Control(this.container.node, 'div', 'audio-player__lists');
        this.playListWrap = new Control(this.lists.node, 'div', ['audio-player__lists__play-list', 'list']);
        this.playListTitle = new Control(this.playListWrap.node, 'h4', 'list__title', 'Play List');
        this.playListUl = new Control(this.playListWrap.node, 'ul', 'audio-player__lists__play-list__list');
        this.waitingList = new Control(this.lists.node, 'h3', ['audio-player__lists__waiting-list', 'list']);
        this.waitingListTitle = new Control(this.waitingList.node, 'h4', 'list__title', 'Waiting list');
        this.waitingListUl = new Control(this.waitingList.node, 'ul', 'items-list');

        for (let i = 0; i < this.playList.length; i++) {
            const audioInfo = this.playList[i];
            const audio = new Audio();
            audio.src = audioInfo.src;

            const time: number = await new Promise((resolve): void => {
                audio.onloadedmetadata = (): void => {
                    resolve(audio.duration);
                }
            })

            const li = new WaiteListItem(audioInfo, audio, time);
            li.onClick = () => this.onClick('moveItemToPlayList', li);

            const item: IWaitListItem = {
                title: audioInfo.title,
                src: audioInfo.src,
                item: li,
                audio: audio,
                time: time,
            }

            this._waitListItems.push(item);
            console.log(li.node);
            this.waitingListUl.node.appendChild(li.node);
        }
    }

    disconnectedCallback() {
        // браузер вызывает этот метод при удалении элемента из документа
        // (может вызываться много раз, если элемент многократно добавляется/удаляется)
    }

    attributeChangedCallback(name: any, oldValue: any, newValue: any) {

    }

    onClick = (type: keyof OnclickSet, item: WaiteListItem): void => {
        const onclickSet: OnclickSet = {
            moveItemToPlayList: this.moveItemToPlayList,
        }
        onclickSet[type](item);
    }

    playStopAudio = (item: IPlayItem): void => {
        // if (this.isAudioInPlayer) {
        //     item.item.play();
        // }
    }

    moveItemToPlayList = (item: WaiteListItem): void => {
        const playListItem: IPlayListItem = {
            title: item.audioInfo.title,
            src: item.audioInfo.src,
            audio: item.audio,
            time: item.audioTime,
            item: new PlayItem({ title: item.audioInfo.title, src: item.audioInfo.src }, item.audio, item.audioTime),
        }

        this._waitListItems = this._waitListItems.filter(el => el.src !== item.audioInfo.src);
        item.destroy();

        this.playListUl.node.appendChild(playListItem.item.node);
        this._playListItems.push(playListItem);

        if (this._playListItems.length === 1) {
            playListItem.item.active();
        }
    }
}