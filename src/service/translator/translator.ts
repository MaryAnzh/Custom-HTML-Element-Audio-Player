import { en } from "./en";
import { ru } from './ru';

class Translator {

    get lang(): string {
        return this.lang;
    }

    set lang(value: string) {
        this.lang = value;
    }

    constructor(lang: string) {
        this.lang = lang;
    }

    translate() {
        switch (this.lang) {
            case 'ru':
                return ru;
            default:
                return en;
        }
    }
}

export const translator = new Translator('en');