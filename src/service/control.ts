
interface IAtr {
    name: string,
    value: string,
}

export class Control {
    public node;

    constructor(perentNode: HTMLElement | null, tagName: string = 'div', className: string | string[] = '', content: string = '', atr: IAtr[] | null = null) {
        const element = document.createElement(tagName);
        if (Array.isArray(className)) {
            className.forEach(name => element.classList.add(name));
        }
        if (typeof className === 'string') {
            element.className = className;
        }
        element.textContent = content;
        if (perentNode) {
            perentNode.append(element);
        }
        if (atr) {
            atr.forEach(el => element.setAttribute(el.name, el.value));
        }
        this.node = element;
    }

    destroy() {
        this.node.remove();
    }
}