import { WaiteListItem } from "../view/components/audio-player/wait-item/wait-item";
import { PlayItem } from '../view/components/audio-player/play-list-item/play-list-item'

export interface IPlayItem {
    title: string,
    src: string,
}

export interface IWaitListItem {
    title: string,
    src: string,
    item: WaiteListItem,
    audio: HTMLAudioElement,
    time: number,
}

export interface IPlayListItem {
    title: string,
    src: string,
    item: PlayItem,
    audio: HTMLAudioElement,
    time: number,
}