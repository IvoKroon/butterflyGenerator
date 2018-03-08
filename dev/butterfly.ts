class Butterfly implements Insect {

    wings: Wings;
    name: string;
    speed: number;


    constructor(wingName: string, name: string) {
        this.wings = this.createWings(wingName);
        this.name = name;
        // console.log(this.speed);
    }

    createWings(wingName) {
        return new WingsFactory().getWings(wingName);
    }

    fly() {
        const speeding = this.speed * this.wings.speed;
        console.log('THE BUTTERFLY FLOW ', speeding, ' miles per hour')
    }

    move() {
        console.log('BUTTERFLY STARTS MOVING.')
        this.wings.move();
    }
}