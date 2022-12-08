
export class Footer {
    public node: Element;
    constructor() {
        this.node = document.createElement('footer');
        this.node.classList.add('footer');
        this.node.textContent = 'footer';
    }
}