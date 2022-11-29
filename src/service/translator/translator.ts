import { en } from "./en";
import { ru } from './ru';

export class Translator {
    onChange: () => void;

    get lang(): string {
        return this.lang;
    }

    set lang(value: string) {
        this.lang = value;
    }

    constructor(lang: string) {
        this.lang = lang;
    }
}