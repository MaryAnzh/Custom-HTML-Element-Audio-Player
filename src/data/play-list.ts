export interface IPlayList {
    title: string,
    src: string,
    time?: number,
}

export const playListData: IPlayList[] = [
    {
        title: "Jingle Bell Rock",
        src: "assets/audio/Christmas_Time_-_Jingle_Bell_Rock_(musmore.com).mp3"
    },
    {
        title: 'Jingle Bells',
        src: 'assets/audio/Jingle Bells - Christmas Songs.mp3'
    },
    {
        title: 'Happy New Year',
        src: 'assets/audio/Happy New Year.mp3'
    }
]
