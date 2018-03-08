/// <reference path="iterator.ts" />

class DecoratorIterator extends Iterator {
    constructor(list: Array<Decorator>) {
        super(list)
    }
}