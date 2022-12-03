import { Control } from '../../../service/control';
import { IPlayItem } from '../../../interfaces/play-item.interface';
import { AudioControls } from './audio-controls/audio-controls'

type onclickSet = {
    playStopAudio: () => void
}

export class AudioPlayerCustomHTML extends HTMLElement {
    //data
    private currentAudioItem: null | IPlayItem = null;
    private waitListItems: IPlayItem[];
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

    connectedCallback() {
        this.waitListItems = this.playList;;

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
    }

    disconnectedCallback() {
        // браузер вызывает этот метод при удалении элемента из документа
        // (может вызываться много раз, если элемент многократно добавляется/удаляется)
    }

    attributeChangedCallback(name: any, oldValue: any, newValue: any) {

    }

    onClick = (type: keyof onclickSet, item: IPlayItem, audio: HTMLAudioElement): void => {
        const onclics = {
            playStopAudio: this.playStopAudio,
        }
        onclics[type](item, audio);
    }

    playStopAudio = (item: IPlayItem, audio: HTMLAudioElement): void => {
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
}