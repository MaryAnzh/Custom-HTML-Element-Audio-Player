import { Control } from '../../../service/control';
import { IPlayItem } from '../../../interfaces/play-item.interface';
import { AudioControls } from './audio-controls/audio-controls'
import { WaiteListItem } from './wait-item/wait-item'
import { PlayItem } from './play-list-item/play-list-item';

type OnclickSet = {
    moveItemToPlayList: (item: IPlayItem) => void,
    playStopAudio: (item: IPlayItem) => void,
}

export class AudioPlayerCustomHTML extends HTMLElement {
    //data
    private currentAudioItem: null | IPlayItem = null;
    private waitListItems: IPlayItem[] = [];
    private playListItems: IPlayItem[];

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
        this.playListItems = [];
    }

    async connectedCallback() {
        this.waitListItems = await this.updateAudioList(this.playList);

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

        this.waitListItems.forEach(item => {
            const li = new WaiteListItem(item);
            item.item = li;
            li.onClick = () => this.onClick('moveItemToPlayList', item);
            this.waitingListUl.node.appendChild(li.node);
        });
        console.log(this.waitListItems)
    }

    disconnectedCallback() {
        // браузер вызывает этот метод при удалении элемента из документа
        // (может вызываться много раз, если элемент многократно добавляется/удаляется)
    }

    attributeChangedCallback(name: any, oldValue: any, newValue: any) {

    }

    onClick = (type: keyof OnclickSet, item: IPlayItem): void => {
        const onclics: OnclickSet = {
            moveItemToPlayList: this.moveItemToPlayList,
            playStopAudio: this.playStopAudio,
        }
        onclics[type](item);
    }

    playStopAudio = (item: IPlayItem): void => {
        // if (this.audio === audio) {
        //     if (this.isPlay) {
        //         this.play();
        //     } else {
        //         this.pause();
        //     }
        // } else {
        //     if (this.isPlay) {
        //         this.audio.pause();
        //         this.audio.currentTime = 0;
        //     }
        //     this.currwntAudioInfo = item;
        //     this.audio = audio;
        //     this.update();
        //     this.play();
        // }
    }

    moveItemToPlayList = (item: IPlayItem): void => {
        console.log(this.waitListItems);
        this.waitListItems = this.waitListItems.filter(el => el !== item);
        // this.playListItems.push(item);
        // const li = new PlayItem(item);
        // const waitListOtem = item.item;
        // item.item = li;
        // waitListOtem.destroy();
        // this.playListUl.node.appendChild(li.node);
    }

    async updateAudioList(audioList: IPlayItem[]): Promise<IPlayItem[]> {
        const newAudioList: IPlayItem[] = [];
        for (let i = 0; i < audioList.length; i++) {
            const item = audioList[i];
            const audio = new Audio();
            item.audio = audio;
            audio.src = item.src;
            const time: number = await new Promise((resolve): void => {
                audio.onloadedmetadata = (): void => {
                    resolve(audio.duration);
                }
            })
            item.time = time;
            newAudioList.push(item);
        }
        return newAudioList;
    }
}