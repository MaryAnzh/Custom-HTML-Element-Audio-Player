import { Control } from "../../control";

export class NotFound {
    public name: string = 'not-found-page';
    public page: Control;
    private _title: Control;

    constructor() {
        this.page = new Control(null, 'div', this.name, '', null);
        this._title = new Control(this.page.node, 'h2', `${this.name}__title`, this.name, null);
    }

    destroy: () => void = () => {
        this.page.node.remove();
    };
}