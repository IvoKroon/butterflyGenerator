interface It {
    next();
    hasNext();
    previous();
    hasPrevious();
}

abstract class Iterator implements It {
    list: Array<any>;
    index: number;

    constructor(list: Array<any>) {
        this.list = list;
        this.index = 0;
    }

    current() { return this.list[this.index]; }

    hasNext() { return this.index < this.list.length - 1; }
    hasPrevious() { return this.index !== 0; }

    next() { return this.hasNext() ? this.list[this.index += 1] : null; }
    previous() { return this.hasPrevious() ? this.list[this.index -= 1] : null; }
}