/// <reference path="insectDecorator.ts"/>

class Antenna extends InsectDecorator {

    constructor(insect: Insect) {
        super(insect);
        this.insect.speed = this.calcSpeed();
    }

    calcSpeed(): number {
        // CHECK IF THERE THE WINGS ARE FAIRY TYPE IF SO REDUCE THE SPEED.
        if (this.insect.wings instanceof FairyWing) {
            return 10;
        }
        return 100;
    }

    fly() {
        this.insect.fly();
    }

    move() {
        super.move();
    }
}