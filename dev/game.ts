/** 
 * TO BUILD USE:
 * tsc -w
*/

enum Decorator {
    HAT = "hat",
    ANTENNA = "antenna",
    NORMAL = "normal",
}

enum Wing {
    FAIRY = "fairy",
    SCARY = "scary",
    NORMAL = "normal",
}

class Game {
    generateButton: HTMLElement;
    flyButton: HTMLElement;
    // DECORATOR - HAT
    leftDecoratorButton: HTMLElement;
    rightDecoratorButton: HTMLElement;
    decoratorShower: HTMLElement;

    leftWingButton: HTMLElement;
    rightWingButton: HTMLElement;
    wingShower: HTMLElement;

    //LIST
    list: HTMLElement;

    //TextField
    textfield: HTMLInputElement;

    // Iterator
    di: DecoratorIterator;
    wi: WingIterator;

    //Tank
    tank: InsectTank;


    constructor() {
        this.init();
    }

    init() {
        this.generateButton = document.querySelector('#generate');
        this.flyButton = document.querySelector('#fly')
        // HAT
        this.leftDecoratorButton = document.querySelector('#hat-left');
        this.rightDecoratorButton = document.querySelector('#hat-right');
        this.decoratorShower = document.querySelector('#current-hat');

        // WING
        this.leftWingButton = document.querySelector('#wing-left');
        this.rightWingButton = document.querySelector('#wing-right');
        this.wingShower = document.querySelector('#current-wing');

        //List
        this.list = document.querySelector('#list');

        //textfield
        this.textfield = document.querySelector('#butterfly-name');

        // INIT THE BUTTONS
        this.initDecoratorIteratorActions();
        this.initWingActions();
        this.initTank();
        // this.tank.fly();

        this.generateButton.addEventListener('click', () => {
            // Create the butterfly And add it to the tank
            const name = this.textfield.value;
            // this.textfield.value = '';

            const butterfly = this.getDecorator(this.di.current(), new Butterfly(this.wi.current(), name));
            this.tank.addInsect(butterfly);
            this.fillList();
        });

        this.flyButton.addEventListener('click', () => {
            //Change state of the button
            this.flyButton.innerHTML = this.flyButton.innerHTML === 'Fly' ? 'Still' : 'Fly';
            // Let all the butterfly's fly
            this.tank.fly();
            // Reload the list
            this.fillList();
        })
    }

    fillList() {
        this.list.innerHTML = '';
        for (const butterfly of this.tank.getInsects()) {
            this.addListItem(butterfly);
        }

    }

    addListItem(butterfly: any) {
        const li = document.createElement('LI');
        console.log(butterfly);
        li.innerHTML = `Name: ${butterfly.insect.name} - Speed: ${butterfly.insect.speed} - Status: ${this.tank.status}`;
        this.list.appendChild(li);

    }

    initTank() {
        this.tank = new InsectTank('First');
        // const butterfly = new Antenna(new Butterfly(Wing.FAIRY, 'KARel'));

        // this.tank.addInsect(butterfly);
    }

    initWingActions() {
        this.wi = new WingIterator([Wing.NORMAL, Wing.FAIRY, Wing.SCARY]);
        this.setWingShower(this.wi.current());

        this.leftWingButton.addEventListener('click', () =>
            this.setWingShower(this.wi.hasPrevious() ? this.wi.previous() : this.wi.current()));

        // Right Button
        this.rightWingButton.addEventListener('click', () =>
            this.setWingShower(this.wi.hasNext() ? this.wi.next() : this.wi.current()));
    }

    initDecoratorIteratorActions() {
        // INIT the decorator interator
        this.di = new DecoratorIterator([Decorator.NORMAL, Decorator.HAT, Decorator.ANTENNA]);

        this.setDecoratorShower(this.di.current());
        // Left Button
        this.leftDecoratorButton.addEventListener('click', () =>
            this.setDecoratorShower(this.di.hasPrevious() ? this.di.previous() : this.di.current()));

        // Right Button
        this.rightDecoratorButton.addEventListener('click', () =>
            this.setDecoratorShower(this.di.hasNext() ? this.di.next() : this.di.current()));
    }

    setDecoratorShower(data) { this.decoratorShower.innerHTML = Util.capitalize(data) }
    setWingShower(data) { this.wingShower.innerHTML = Util.capitalize(data) }


    getDecorator(decorator: Decorator, butterfly: Butterfly) {
        switch (decorator) {
            case Decorator.NORMAL:
                return new Normal(butterfly);
            case Decorator.HAT:
                return new Hat(butterfly);
            case Decorator.ANTENNA:
                return new Antenna(butterfly);
            default:
                return new Normal(butterfly);
        }
    };

    createButterfly() {

    }

}