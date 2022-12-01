import { Control } from "../../../service/control";
import { IElementTranslate } from '../../../interfaces/translator.interfaces';
import { IDictionary } from "../../../service/translator/dictionary.interface";

export class Nav extends Control {
    private _ul: Control;
    private _navLists: { name: string, key: keyof IDictionary['NAV'] }[] = [
        { name: 'main', key: 'MAIN' },
        { name: 'about', key: 'ABOUT' },
    ];

    private perentKey: keyof IDictionary = 'NAV';

    public navItems: IElementTranslate[] = [];

    constructor() {
        super(null, 'nav', 'nav');

        this._ul = new Control(this.node, 'ul', 'nav__list', '', null);
        this._navLists.forEach((el, i) => {
            const li = new Control(this._ul.node, 'li', 'nav__list__item', '', null);
            const link = i === 0 ? '#/' : `#/${el.name}`;
            const a = new Control(li.node, 'a', 'nav__list__item__link', '', [{ name: 'href', value: link }]);
            this.navItems.push({ element: a.node, perentKey: this.perentKey, elementKey: el.key });
        });
    }

    translate(dictionary: IDictionary): void {
        this.navItems.forEach((el) => {
            const key = el.elementKey as keyof IDictionary['NAV'];

            const text = dictionary.NAV[key];
            el.element.textContent = text;
        });
    }
}