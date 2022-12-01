import { en } from "./en";
import { ru } from './ru';
import { by } from './by';
import { Signal } from '../signal'
import { IDictionary } from "./dictionary.interface";

type LangType = "en" | "ru" | "by" | string;

class Translator {
    private _lang: LangType;
    public langs: string[];
    onChange: Signal<typeof en> = new Signal();    

    constructor() {
        this.langs = ['en', 'ru', 'by'];
        this._lang = 'en';
    }

    get lang() {
        return this._lang;
    }

    set lang(value: LangType) {
        this._lang = value;
        this.onChange.emit(this.translate(value));
    }
    
    translate(lang: LangType): IDictionary {
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