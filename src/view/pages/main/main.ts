import { Control } from "../../../service/control";

export class Main {
    public name: string = 'main-page';

    public page: Control;
    private title: Control;
    private audio: Control;

    constructor() {
        this.page = new Control(null, 'div', this.name, '', null);
        this.title = new Control(this.page.node, 'h2', `${this.name}__title`, 'Custom HTML Element', null);
        this.audio = new Control(this.page.node, 'audio-player', 'custom', '', [{ name: 'playButtonSize', value: '20' }]);
    }

    destroy: () => void = () => {
        this.page.node.remove();
    };
}