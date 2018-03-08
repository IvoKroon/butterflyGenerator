abstract class InsectDecorator implements Insect {

    wings: Wings;
    insect: Insect;
    speed: number;
    name: string;

    constructor(insect: Insect) {
        // super.speed = this.speed;
        this.insect = insect;
        // this.insect.speed = this.speed;

    }

    fly(): void {
        this.insect.fly();
    }

    move(): void {
        this.insect.move();
    }
} 