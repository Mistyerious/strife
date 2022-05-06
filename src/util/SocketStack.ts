export class SocketStack<T> {
    private items: Array<T> = [];

    constructor() {}

    addItem(item: T): void {
        this.items.push(item);
    }

    nextItem(): T | undefined {
        return this.items.shift();
    }

    hasNextItem(): boolean {
        return !!this.items[1];
    }

    getCurrent(): T {
        return this.items[0];
    }

    getItems(): Array<T> {
        return this.items;
    }

    removeItem(item: T) {
        this.items.splice(0, this.items.indexOf(item))
    }
}