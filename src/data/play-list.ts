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
        src: 'http://download-sounds.ru/wp-content/uploads3/2012/11/BoneyM-JingleBells.mp3'
    },
    {
        title: 'Happy New Year',
        src: 'http://download-sounds.ru/wp-content/uploads3/2012/11/abba_happy_new_year.mp3'
    }
]
