import { Control } from "../../../service/control";

export class Main extends Control {
    public name: string = 'main-page';
    private perentKey = 'MAIN';

    private title: Control;
    private audio: Control;

    constructor() {
        super(null, 'div', ['main-page', 'page']);

        this.title = new Control(this.node, 'h2', `main-page__title`, 'Custom HTML Element');
        this.audio = new Control(this.node, 'audio-player', 'main-page__audio-player', '', [{ name: 'playButtonSize', value: '20' }]);
    }

    translate(config: any): void {
        this.title.node.textContent = config[this.perentKey]['TITLE'];
    }

    destroy: () => void = () => {
        this.node.remove();
    };
}