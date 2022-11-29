import { IElementTranslate } from '../../../interfaces/translator.interfaces';
import { Nav } from '../nav/nav'


export class Header {
    public node: Element;
    private _nav: Nav;
    public navItems: IElementTranslate[] = [];

    constructor() {
        this.node = document.createElement('header');
        this.node.classList.add('header');

        this._nav = new Nav();
        this.navItems = this._nav.navItems;
        this.node.appendChild(this._nav.node);
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