import { Control } from "../../../service/control";

export class About extends Control {
    public name: string = 'about-page';

    private _title: Control;

    constructor() {
        super(null, 'div', ['about-page', 'page']);

        this._title = new Control(this.node, 'h2', 'about-page__title', this.name, null);
    }


    translate(config: any): void {
    }

    destroy: () => void = () => {
        this.node.remove();
    };
}