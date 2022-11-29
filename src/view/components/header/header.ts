import { IElementTranslate } from '../../../interfaces/translator.interfaces';
import { Control } from '../../../service/control';
import { Nav } from '../nav/nav'

export class Header extends Control {
    private container: Control;
    private _nav: Nav;
    private langsWrap: Control;
    public langs: string[];
    public langItems: [];
    public onChange: () => void;
    public navItems: IElementTranslate[] = [];

    constructor(langs: string[]) {
        super(null, 'header', 'header');
        this.langs = langs;

        this.container = new Control(this.node, 'div', 'container');
        this._nav = new Nav();
        this.navItems = this._nav.navItems;
        this.container.node.appendChild(this._nav.node);

        this.langsWrap = new Control(this.container.node, 'div', 'container__langs');
        this.langs.forEach((lang) => {
            const container = new Control(this.langsWrap.node, 'div', 'header__langs__item');
            const input = new Control(container.node, 'input', 'header__langs__item__input', '',
                [
                    { name: 'name', value: 'lang' },
                    { name: 'id', value: `${lang}` },
                    { name: 'type', value: 'radio' }]);
            const label = new Control(container.node, 'label', 'header__langs__item__label', lang,
                [{ name: 'for', value: `${lang}` },]);
        });
    }

    translate(config: any): void {
        this._nav.translate(config);
    }

    selectCurrentPage(pageName: string) {
        this.navItems.forEach(item => item.element.classList.remove('active'));
        switch (pageName) {
            case '/':
                this.navItems[0].element.classList.add('active');
                break;
            case '/about':
                this.navItems[1].element.classList.add('active');
                break;
            default:
                break;
        }
    }
}