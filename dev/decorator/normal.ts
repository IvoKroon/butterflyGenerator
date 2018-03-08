/// <reference path="insectDecorator.ts"/>

class Normal extends InsectDecorator {
    constructor(insect: Insect) {
        super(insect);
        this.insect.speed = 20;
    }
    fly() {
        super.fly();
    }

    move() {
        super.move();
        // this.fly();
        console.log('MOVE Normal');
    }
}