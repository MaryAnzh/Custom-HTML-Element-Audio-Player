import { Control } from "../../../service/control";
import { IElementTranslate } from '../../../interfaces/translator.interfaces';


export class Nav extends Control {
    private _ul: Control;
    private _navLists: { name: string, key: string }[] = [
        { name: 'main', key: 'MAIN' },
        { name: 'about', key: 'ABOUT' },
    ];
    private perentKey = 'NAV';

    public navItems: IElementTranslate[] = [];

    constructor() {
        super(null, 'nav', 'nav');

        this._ul = new Control(this.node, 'ul', 'nav__list', '', null);
        this._navLists.forEach((el, i) => {
            const li = new Control(this._ul.node, 'li', 'nav__list__item', el.name, null);
            const link = i === 0 ? '#/' : `#/${el.name}`;
            const a = new Control(li.node, 'a', 'nav__list__item__link', '', [{ name: 'href', value: link }]);
            this.navItems.push({ element: li.node, perentKey: this.perentKey, elementKey: el.key });
        });
    }

    translate(config: any): void {
        this.navItems.forEach((el) => {
            const text = config[el.perentKey][el.elementKey];
            el.element.textContent = text;
        });
    }
}