import { IElementTranslate } from '../../../interfaces/translator.interfaces';
import { Control } from '../../../service/control';
import { Nav } from '../nav/nav'

export class Header extends Control {
    private _nav: Nav;
    public navItems: IElementTranslate[] = [];

    constructor() {
        super(null, 'header', 'header');

        this._nav = new Nav();
        this.navItems = this._nav.navItems;
        this.node.appendChild(this._nav.node);
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