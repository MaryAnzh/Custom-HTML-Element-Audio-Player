import { Control } from "../../control";

export class Nav {
    public node: HTMLElement;
    private _ul: Control;
    private _navLists: string[] = [
        'main',
        'about',
    ];
    public navItems: HTMLElement[] = [];

    constructor() {
        this.node = document.createElement('nav');
        this.node.className = 'nav';
        this._ul = new Control(this.node, 'ul', 'nav__list', '', null);
        this._navLists.forEach((name, i) => {
            const li = new Control(this._ul.node, 'li', 'nav__list__item', name, null);
            const link = i === 0 ? '#/' : `#/${name}`;
            const a = new Control(li.node, 'a', 'nav__list__item__link', '', [{ name: 'href', value: link }]);
            this.navItems.push(li.node);
        });
    }
    
}