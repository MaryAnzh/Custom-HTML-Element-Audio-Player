import { Control } from "../../control";

let id = 0;
export class Main {
    public name: string = 'main-page';

    public page: Control;
    private _title: Control;


    constructor() {
        this.page = new Control(null, 'div', this.name, '', null);
        this.page.node.id = (id++).toString();
        this._title = new Control(this.page.node, 'h2', `${this.name}__title`, this.name, null);
    }

    destroy: () => void = () => {
        this.page.node.remove();
    };
}