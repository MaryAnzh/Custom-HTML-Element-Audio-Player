import { Control } from "../../../service/control";

export class Main extends Control {
    public name: string = 'main-page';

    private title: Control;
    private audio: Control;

    constructor() {
        super(null, 'div', ['main-page', 'page']);

        this.title = new Control(this.node, 'h2', `${this.name}__title`, 'Custom HTML Element');
        this.audio = new Control(this.node, 'audio-player', 'custom', '', [{ name: 'playButtonSize', value: '20' }]);
    }

    destroy: () => void = () => {
        this.node.remove();
    };
}