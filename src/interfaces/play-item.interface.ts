export interface IPlayItem {
    title: string,
    src: string,
}

export interface IAudioPlayerItem {
    id: string,
    location: 'waitList' | 'playList',
    title: string,
    src: string,
    audio: HTMLAudioElement,
    time: number,
}

export const audioPlayerItem = (id: string,
    location: 'waitList' | 'playList',
    title: string,
    src: string,
    audio: HTMLAudioElement,
    time: number): IAudioPlayerItem => {
    const item: IAudioPlayerItem = {
        id: id,
        location: location,
        title: title,
        src: src,
        audio: audio,
        time: time,
    }
    return item;
}