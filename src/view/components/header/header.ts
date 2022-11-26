import { Nav } from '../nav/nav'


export class Header {
    public node: Element;
    private _nav: Nav;
    public navItems: HTMLElement[] = [];

    constructor() {
        this.node = document.createElement('header');
        this.node.classList.add('header');

        this._nav = new Nav();
        this.navItems = this._nav.navItems;
        this.node.appendChild(this._nav.node);
    }

    selectCurrentPage(pageName: string) {
        this.navItems.forEach(el => el.classList.remove('active'));
        switch (pageName) {
            case '/':
                this.navItems[0].classList.add('active');
                break;
            case '/about':
                this.navItems[1].classList.add('active');
                break;
            default:
                break;
        }
    }
}