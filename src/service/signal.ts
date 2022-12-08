

export class Signal<ListenerType> {
    private listeners: ((params: ListenerType) => void)[];

    constructor() {
        this.listeners = [];
    }

    add(listener: (params: ListenerType) => void): void {
        this.listeners.push(listener);
    }

    emit(params: ListenerType): void {
        this.listeners.forEach(listener => listener(params));
    }
    
    remove(listener: (params: ListenerType) => void): void {
        this.listeners = this.listeners.filter(el => el !== listener);
    }
}

