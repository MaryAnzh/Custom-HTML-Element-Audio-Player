import { en } from "./en";
import { ru } from './ru';
import { by } from './by';

class Translator {

    constructor() {
    }

    translate(lang: string) {
        switch (lang) {
            case 'ru':
                return ru;
            case 'by':
                return by;
            default:
                return en;
        }
    }
}

export const translator = new Translator();