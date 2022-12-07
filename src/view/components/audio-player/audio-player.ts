import { Control } from '../../../service/control';
import { IPlayItem, IWaitListItem, IPlayListItem, IAudioPlayerItem } from '../../../interfaces/play-item.interface';
import { AudioControls } from './audio-controls/audio-controls'
import { WaiteListItem } from './wait-item/wait-item'
import { PlayItem } from './play-list-item/play-list-item';

type Lists = {
    waitList: WaiteListItem[],
    playList: PlayItem[],
}

export class AudioPlayerCustomHTML extends HTMLElement {
    //data
    private _audioList: IAudioPlayerItem[];
    private _waitListItems: WaiteListItem[];
    private _playListItems: PlayItem[];
    private _lists: Lists;

    private isAudioPlay: boolean = false;
    private audioItem: PlayItem | null = null;

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

        this._audioList = [];
        this._playListItems = [];
        this._waitListItems = [];
        this._lists = {
            waitList: this._waitListItems,
            playList: this._playListItems,
        }
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

            const id = `audioItem_${i}`;

            const li = new WaiteListItem(audioInfo.title, time, id);
            li.onClick = () => this.onClick('moveItemToPlayList', li);

            const item: IAudioPlayerItem = {
                id: id,
                location: 'waitList',
                title: audioInfo.title,
                src: audioInfo.src,
                audio: audio,
                time: time,
            }

            this._waitListItems.push(li);
            this.waitingListUl.node.appendChild(li.node);

            this._audioList.push(item);
        }
    }

    disconnectedCallback() {
        // браузер вызывает этот метод при удалении элемента из документа
        // (может вызываться много раз, если элемент многократно добавляется/удаляется)
    }

    attributeChangedCallback(name: any, oldValue: any, newValue: any) {

    }

    onClick = (type: 'moveItemToPlayList' |
        'playStopAudio' |
        'moveItemToWaitList',
        item: WaiteListItem | PlayItem): void => {

        if (type === 'moveItemToPlayList') {
            this.moveItemToPlayList(item as WaiteListItem);
        }
        if (type === 'playStopAudio') {
            this.playStopAudio(item as PlayItem);
        }
        if (type === 'moveItemToWaitList') {
            this.moveItemToWaitList(item as PlayItem);
        }
    }

    moveItemToPlayList = (item: WaiteListItem): void => {
        this._waitListItems = this._waitListItems.filter(el => el !== item);
        const id = item.id;
        item.destroy();

        const audioItem = this._audioList.filter(el => el.id === id)[0];
        audioItem.location = 'playList';
        const playListItem = new PlayItem(audioItem.title, audioItem.time, id);

        this.playListUl.node.appendChild(playListItem.node);
        this._playListItems.push(playListItem);

        if (this._playListItems.length === 1) {
            playListItem.active();
            this.audioItem = playListItem;
            this.controls.update(audioItem.title, audioItem.time, audioItem.audio);
        }
        playListItem.onClickPlayPause = () => this.onClick('playStopAudio', playListItem);
        playListItem.onClickMoveToWaitList = () => this.onClick('moveItemToWaitList', playListItem);
    }

    moveItemToWaitList = (item: PlayItem): void => {
        const id = item.id;

        let prevItem: null | PlayItem;
        let currentItemIndex: number;
        this._playListItems.forEach((el, i) => {
            if (el.id == id) {
                prevItem = (i === 0 && this._playListItems.length === 1) ? null : (i === 0 ? this._playListItems[1] : this._playListItems[i - 1]);
                currentItemIndex = i;
            }
        });
        this._playListItems.splice(currentItemIndex, 1);

        item.destroy();
        if (this.isAudioPlay) {
            this.controls.pause();
            this.controls.resetAudioTime();
            this.isAudioPlay = false;
        }

        const audioItem: IAudioPlayerItem = this._audioList.find(el => el.id === id);
        audioItem.location = 'waitList';
        const listItem = new WaiteListItem(audioItem.title, audioItem.time, id);

        this.waitingListUl.node.appendChild(listItem.node);
        this._waitListItems.push(listItem);
        listItem.onClick = () => this.onClick('moveItemToPlayList', listItem);

        if (prevItem !== null) {
            prevItem.active();
            const prevItemInfo = this._audioList.find(el => el.id == prevItem.id);
            this.controls.update(prevItemInfo.title, prevItemInfo.time, prevItemInfo.audio);
        } else {
            this.controls.resetAudioData();
        }
    }

    playStopAudio = (item: PlayItem): void => {
        if (this.audioItem === item) {
            if (this.isAudioPlay) {
                this.audioItem.viewPause();
                this.isAudioPlay = false;
                this.controls.pause();
            } else {
                this.audioItem.viewPlay();
                this.isAudioPlay = true;
                this.controls.play();
            }

        } else {
            const id: string = item.id;
            const audioInfo: IAudioPlayerItem = this._audioList.filter(el => el.id === id)[0];

            //деактивируем аудио
            this.audioItem.deactivate();
            this.controls.pause();
            this.controls.resetAudioTime();

            this.audioItem = item;
            this.controls.update(audioInfo.title, audioInfo.time, audioInfo.audio);
            item.active();
            item.viewPlay();
            this.controls.play();
            this.isAudioPlay = true;

        }
    }
}