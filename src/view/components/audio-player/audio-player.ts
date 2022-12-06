import { Control } from '../../../service/control';
import { IPlayItem, IWaitListItem, IPlayListItem, IAudioPlayerItem } from '../../../interfaces/play-item.interface';
import { AudioControls } from './audio-controls/audio-controls'
import { WaiteListItem } from './wait-item/wait-item'
import { PlayItem } from './play-list-item/play-list-item';

type OnclickSet = {
    moveItemToPlayList: (item: WaiteListItem) => void,
}

export class AudioPlayerCustomHTML extends HTMLElement {
    //data
    private _audioList: IAudioPlayerItem[];
    private _waitListItems: WaiteListItem[];
    private _playListItems: PlayItem[];

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

            const li = new WaiteListItem(audioInfo, time, id);
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

    onClick = (type: string, item: WaiteListItem | PlayItem): void => {
        if (type === 'moveItemToPlayList') {
            const i = <WaiteListItem>item;
            this.moveItemToPlayList(i);
        }

        if (type === 'playStopAudio') {
            const i = <PlayItem>item;
            this.playStopAudio(i);
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

            this.audioItem.deactivate();
            if (this.isAudioPlay) {
                this.controls.pause();
                this.controls.resetAudioTime();
            }
            this.audioItem = item;
            this.controls.update(audioInfo.title, audioInfo.time, audioInfo.audio);
            item.active();
            if (this.isAudioPlay) {
                this.controls.play();
            }
        }
    }
}