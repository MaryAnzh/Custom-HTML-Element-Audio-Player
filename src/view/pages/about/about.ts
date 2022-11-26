import { Control } from "../../control";

let id = 0;
export class About {
    public name: string = 'about-page';

    public page: Control;
    private _title: Control;


    constructor() {
        this.page = new Control(null, 'div', 'about-page', '', null);
        this.page.node.id = (id++).toString();
        this._title = new Control(this.page.node, 'h2', 'about-page__title', this.name, null);
    }

    destroy: () => void = () => {
        this.page.node.remove();
    };
}