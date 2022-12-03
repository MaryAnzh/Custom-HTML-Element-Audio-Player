import { WaiteListItem } from "../view/components/audio-player/wait-item/wait-item";
import { PlayItem } from '../view/components/audio-player/play-list-item/play-list-item'

export interface IPlayItem {
    title: string,
    src: string,
    item?: WaiteListItem | PlayItem,
    audio?: HTMLAudioElement,
    time?: number,
}