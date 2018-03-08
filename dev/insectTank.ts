// Composite

class InsectTank {
    name: string;
    insects: Array<Insect>;
    status: string;

    constructor(name: string) {
        this.name = name;
        this.insects = [];
        this.status = 'still';
    }

    addInsect(insect: Insect) {
        this.insects.push(insect);
    }

    removeInsect(insect: Insect) {
        for (const index in this.insects) {
            if (insect === this.insects[index]) {
                this.insects.splice(parseInt(index), 1);
                break;
            }
        }
        return this.insects;
    }

    operate() {
        for (const insect of this.insects) {
            insect.move();
        }
    }

    fly() {
        this.status = this.status === 'still' ? 'flying' : 'still';
        for (const insect of this.insects) {
            insect.fly();
        }
    }

    getInsects() {
        return this.insects;
    }
}