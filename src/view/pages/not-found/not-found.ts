import { Control } from "../../../service/control";

export class NotFound extends Control {
    public name: string = 'not-found-page';

    private _title: Control;

    constructor() {
        super(null, 'div', ['not-found', 'page']);
        this._title = new Control(this.node, 'h2', `${this.name}__title`, this.name);
    }

    destroy: () => void = () => {
        this.node.remove();
    };
}