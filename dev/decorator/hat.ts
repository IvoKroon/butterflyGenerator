/// <reference path="insectDecorator.ts"/>

class Hat extends InsectDecorator {
    speed: number;
    constructor(insect: Insect) {
        super(insect);
        this.insect.speed = 2000;
    }

    fly() {
        super.fly();
    }


    move() {
        super.move();
    }
}