var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Butterfly = (function () {
    function Butterfly(wingName, name) {
        this.wings = this.createWings(wingName);
        this.name = name;
    }
    Butterfly.prototype.createWings = function (wingName) {
        return new WingsFactory().getWings(wingName);
    };
    Butterfly.prototype.fly = function () {
        var speeding = this.speed * this.wings.speed;
        console.log('THE BUTTERFLY FLOW ', speeding, ' miles per hour');
    };
    Butterfly.prototype.move = function () {
        console.log('BUTTERFLY STARTS MOVING.');
        this.wings.move();
    };
    return Butterfly;
}());
var ButterflyTank = (function () {
    function ButterflyTank(name) {
        this.name = name;
        this.butterflys = [];
    }
    ButterflyTank.prototype.addButterfly = function (bike) {
        this.butterflys.push(bike);
    };
    ButterflyTank.prototype.removeButterfly = function (bike) {
        for (var index in this.butterflys) {
            if (bike === this.butterflys[index]) {
                this.butterflys.splice(parseInt(index), 1);
                break;
            }
        }
        return this.butterflys;
    };
    ButterflyTank.prototype.operate = function () {
        for (var _i = 0, _a = this.butterflys; _i < _a.length; _i++) {
            var butterfly = _a[_i];
            butterfly.move();
        }
    };
    ButterflyTank.prototype.getButterflys = function () {
        return this.butterflys;
    };
    return ButterflyTank;
}());
var Decorator;
(function (Decorator) {
    Decorator["HAT"] = "hat";
    Decorator["ANTENNA"] = "antenna";
    Decorator["NORMAL"] = "normal";
})(Decorator || (Decorator = {}));
var Wing;
(function (Wing) {
    Wing["FAIRY"] = "fairy";
    Wing["SCARY"] = "scary";
    Wing["NORMAL"] = "normal";
})(Wing || (Wing = {}));
var Game = (function () {
    function Game() {
        this.init();
    }
    Game.prototype.init = function () {
        var _this = this;
        this.generateButton = document.querySelector('#generate');
        this.flyButton = document.querySelector('#fly');
        this.leftDecoratorButton = document.querySelector('#hat-left');
        this.rightDecoratorButton = document.querySelector('#hat-right');
        this.decoratorShower = document.querySelector('#current-hat');
        this.leftWingButton = document.querySelector('#wing-left');
        this.rightWingButton = document.querySelector('#wing-right');
        this.wingShower = document.querySelector('#current-wing');
        this.list = document.querySelector('#list');
        this.textfield = document.querySelector('#butterfly-name');
        this.initDecoratorIteratorActions();
        this.initWingActions();
        this.initTank();
        this.generateButton.addEventListener('click', function () {
            var name = _this.textfield.value;
            var butterfly = _this.getDecorator(_this.di.current(), new Butterfly(_this.wi.current(), name));
            _this.tank.addInsect(butterfly);
            _this.fillList();
        });
        this.flyButton.addEventListener('click', function () {
            _this.flyButton.innerHTML = _this.flyButton.innerHTML === 'Fly' ? 'Still' : 'Fly';
            _this.tank.fly();
            _this.fillList();
        });
    };
    Game.prototype.fillList = function () {
        this.list.innerHTML = '';
        for (var _i = 0, _a = this.tank.getInsects(); _i < _a.length; _i++) {
            var butterfly = _a[_i];
            this.addListItem(butterfly);
        }
    };
    Game.prototype.addListItem = function (butterfly) {
        var li = document.createElement('LI');
        console.log(butterfly);
        li.innerHTML = "Name: " + butterfly.insect.name + " - Speed: " + butterfly.insect.speed + " - Status: " + this.tank.status;
        this.list.appendChild(li);
    };
    Game.prototype.initTank = function () {
        this.tank = new InsectTank('First');
    };
    Game.prototype.initWingActions = function () {
        var _this = this;
        this.wi = new WingIterator([Wing.NORMAL, Wing.FAIRY, Wing.SCARY]);
        this.setWingShower(this.wi.current());
        this.leftWingButton.addEventListener('click', function () {
            return _this.setWingShower(_this.wi.hasPrevious() ? _this.wi.previous() : _this.wi.current());
        });
        this.rightWingButton.addEventListener('click', function () {
            return _this.setWingShower(_this.wi.hasNext() ? _this.wi.next() : _this.wi.current());
        });
    };
    Game.prototype.initDecoratorIteratorActions = function () {
        var _this = this;
        this.di = new DecoratorIterator([Decorator.NORMAL, Decorator.HAT, Decorator.ANTENNA]);
        this.setDecoratorShower(this.di.current());
        this.leftDecoratorButton.addEventListener('click', function () {
            return _this.setDecoratorShower(_this.di.hasPrevious() ? _this.di.previous() : _this.di.current());
        });
        this.rightDecoratorButton.addEventListener('click', function () {
            return _this.setDecoratorShower(_this.di.hasNext() ? _this.di.next() : _this.di.current());
        });
    };
    Game.prototype.setDecoratorShower = function (data) { this.decoratorShower.innerHTML = Util.capitalize(data); };
    Game.prototype.setWingShower = function (data) { this.wingShower.innerHTML = Util.capitalize(data); };
    Game.prototype.getDecorator = function (decorator, butterfly) {
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
    ;
    Game.prototype.createButterfly = function () {
    };
    return Game;
}());
var InsectTank = (function () {
    function InsectTank(name) {
        this.name = name;
        this.insects = [];
        this.status = 'still';
    }
    InsectTank.prototype.addInsect = function (insect) {
        this.insects.push(insect);
    };
    InsectTank.prototype.removeInsect = function (insect) {
        for (var index in this.insects) {
            if (insect === this.insects[index]) {
                this.insects.splice(parseInt(index), 1);
                break;
            }
        }
        return this.insects;
    };
    InsectTank.prototype.operate = function () {
        for (var _i = 0, _a = this.insects; _i < _a.length; _i++) {
            var insect = _a[_i];
            insect.move();
        }
    };
    InsectTank.prototype.fly = function () {
        this.status = this.status === 'still' ? 'flying' : 'still';
        for (var _i = 0, _a = this.insects; _i < _a.length; _i++) {
            var insect = _a[_i];
            insect.fly();
        }
    };
    InsectTank.prototype.getInsects = function () {
        return this.insects;
    };
    return InsectTank;
}());
window.addEventListener("load", function () {
    new Game();
});
var Util = (function () {
    function Util() {
    }
    Util.capitalize = function (s) {
        return s[0].toUpperCase() + s.slice(1);
    };
    return Util;
}());
var InsectDecorator = (function () {
    function InsectDecorator(insect) {
        this.insect = insect;
    }
    InsectDecorator.prototype.fly = function () {
        this.insect.fly();
    };
    InsectDecorator.prototype.move = function () {
        this.insect.move();
    };
    return InsectDecorator;
}());
var Antenna = (function (_super) {
    __extends(Antenna, _super);
    function Antenna(insect) {
        var _this = _super.call(this, insect) || this;
        _this.insect.speed = _this.calcSpeed();
        return _this;
    }
    Antenna.prototype.calcSpeed = function () {
        if (this.insect.wings instanceof FairyWing) {
            return 10;
        }
        return 100;
    };
    Antenna.prototype.fly = function () {
        this.insect.fly();
    };
    Antenna.prototype.move = function () {
        _super.prototype.move.call(this);
    };
    return Antenna;
}(InsectDecorator));
var Hat = (function (_super) {
    __extends(Hat, _super);
    function Hat(insect) {
        var _this = _super.call(this, insect) || this;
        _this.insect.speed = 2000;
        return _this;
    }
    Hat.prototype.fly = function () {
        _super.prototype.fly.call(this);
    };
    Hat.prototype.move = function () {
        _super.prototype.move.call(this);
    };
    return Hat;
}(InsectDecorator));
var Normal = (function (_super) {
    __extends(Normal, _super);
    function Normal(insect) {
        var _this = _super.call(this, insect) || this;
        _this.insect.speed = 20;
        return _this;
    }
    Normal.prototype.fly = function () {
        _super.prototype.fly.call(this);
    };
    Normal.prototype.move = function () {
        _super.prototype.move.call(this);
        console.log('MOVE Normal');
    };
    return Normal;
}(InsectDecorator));
var Iterator = (function () {
    function Iterator(list) {
        this.list = list;
        this.index = 0;
    }
    Iterator.prototype.current = function () { return this.list[this.index]; };
    Iterator.prototype.hasNext = function () { return this.index < this.list.length - 1; };
    Iterator.prototype.hasPrevious = function () { return this.index !== 0; };
    Iterator.prototype.next = function () { return this.hasNext() ? this.list[this.index += 1] : null; };
    Iterator.prototype.previous = function () { return this.hasPrevious() ? this.list[this.index -= 1] : null; };
    return Iterator;
}());
var DecoratorIterator = (function (_super) {
    __extends(DecoratorIterator, _super);
    function DecoratorIterator(list) {
        return _super.call(this, list) || this;
    }
    return DecoratorIterator;
}(Iterator));
var InsectTankIterator = (function (_super) {
    __extends(InsectTankIterator, _super);
    function InsectTankIterator(list) {
        return _super.call(this, list) || this;
    }
    return InsectTankIterator;
}(Iterator));
var WingIterator = (function (_super) {
    __extends(WingIterator, _super);
    function WingIterator(list) {
        return _super.call(this, list) || this;
    }
    return WingIterator;
}(Iterator));
var FairyWing = (function () {
    function FairyWing() {
        this.speed = 10;
    }
    FairyWing.prototype.move = function () {
        console.log('MOVING FAIRY WINGS');
    };
    return FairyWing;
}());
var NormalWing = (function () {
    function NormalWing() {
        this.speed = 4;
    }
    NormalWing.prototype.move = function () {
        console.log('MOVING NORMAL WINGS');
    };
    return NormalWing;
}());
var ScaryWing = (function () {
    function ScaryWing() {
        this.speed = 20;
    }
    ScaryWing.prototype.move = function () {
        console.log('MOVING WING SCARY');
    };
    return ScaryWing;
}());
var WingsFactory = (function () {
    function WingsFactory() {
    }
    WingsFactory.prototype.getWings = function (wingName) {
        switch (wingName) {
            case 'scary':
                return new ScaryWing();
            case 'fairy':
                return new FairyWing();
            case 'normal':
                return new NormalWing();
            default:
                return new NormalWing();
        }
    };
    return WingsFactory;
}());
//# sourceMappingURL=main.js.map