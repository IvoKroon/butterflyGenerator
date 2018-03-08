// Composite

class ButterflyTank {
    name: string;
    butterflys: Array<Butterfly>;

    constructor(name: string) {
        this.name = name;
        this.butterflys = [];
    }

    addButterfly(bike: Butterfly) {
        this.butterflys.push(bike);
    }

    removeButterfly(bike: Butterfly) {
        for (const index in this.butterflys) {
            if (bike === this.butterflys[index]) {
                this.butterflys.splice(parseInt(index), 1);
                break;
            }
        }
        return this.butterflys;
    }

    operate() {
        for (const butterfly of this.butterflys) {
            butterfly.move();
        }
    }

    getButterflys() {
        return this.butterflys;
    }
}