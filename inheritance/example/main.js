Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
    }
    return this;
};

Function.method('new', function () {
    // 创建一个新对象，它继承自构造器函数的原型对象
    var that = Object.create(this.prototype);

    // 调用构造器函数，绑定this到新对象上
    var other = this.apply(that, arguments);

    // 如果它的返回值不是一个对象，就返回该新对象
    return (typeof other === 'object' && other) || that;
});


// 定义一个构造器扩充它的原型

var Mammal = function (name, saying) {
    this.name = name;
    this.saying = saying;
};

Mammal.prototype.get_name = function () {
    return this.name;
};

Mammal.prototype.says = function () {
    return this.saying || '';
};

// 构造实例
var myMammal = new Mammal('Herb the Mammal', 'say something');

var name = myMammal.get_name();
document.writeln("对象字面量 构造函数 <br/>");
document.writeln(name , " ",myMammal.says(), "<br/>");

// 构造另一个伪类来继承Mammal,通过定义它的constructor函数并替换它的prototype为
// 一个Mammal的实例
var Cat = function (name) {
    this.name = name;
    this.saying = 'meow';
};

// 替换Cat.prototype为一个新的Mammal实例
Cat.prototype = new Mammal();

// 扩充原型对象，增加purr和get_name方法
Cat.prototype.purr = function (n) {
    var i, s = '';

    for (i = 0; i < n; i += 1) {
        if (s) {
            s += '-';
        }
        s += 'r';
    }
    return s;
};

Cat.prototype.get_name = function () {
    return this.says() + ' ' + this.name + ' ' + this.says();
};

var myCat = new Cat('Henriletta');

var says = myCat.says();
var purr = myCat.purr(5);
var name = myCat.get_name();


document.writeln("伪类继承 <br/>");

document.writeln(says, ' ', purr, ' ', name, "<br/>");

// 让它看起来更像面向对象，隐藏一些细节，
Function.method('inherits', function (Parent) {
    this.prototype = new Parent();
    return this;
});

var Cat = function (name) {
    this.name = name;
    this.saying = 'meow';
}
.inherits(Mammal)
.method('purr', function (n) {
    var i, s = '';
    for (i = 0; i < n; i += 1) {
        if (s) {
            s += '-';
        }
        s += 'r';
    }
    return s;
})
.method('get_name', function () {
    return this.says() + ' ' + this.name + ' ' + this.says();
});

var myCat = new Cat();

var says = myCat.says();
var purr = myCat.purr(10);
var name = myCat.get_name();

document.writeln("inherits 构造继承 <br/>");
document.writeln(says, ' ', purr, ' ', name, "<br/>");


// 基于原型的继承

var myMammal2 = {
    name: 'Herb the mammal',
    get_name: function () {
        return this.name;
    },
    says: function () {
        return this.saying || '';
    }
};


var myCat2 = Object.create(myMammal2);

myCat2.name = 'Henrietta';
myCat2.saying = 'meow';

myCat2.purr = function (n) {
    var i, s = '';

    for (i = 0; i < n; i += 1) {
        if (s) {
            s += '-';
        }
        s += 'r';
    }
    return s;
};

myCat2.get_name = function () {
    return this.says() + ' ' + this.name + ' ' + this.says();
};

document.writeln("基于原型的继承 <br/>");
document.writeln(myCat2.get_name(), "<br/>");

// 函数化

var mammal = function (spec) {
    var that = {};

    that.get_name = function () {
        return spec.name;
    };
    that.says = function () {
        return spec.saying || '';
    };
    
    return that;
};

var myMammal3 = mammal({name: 'Herb', saying: 'mymammal 3'});

document.writeln("函数化处理私有变量 <br/>");
document.writeln(myMammal3.says(), "<br/>");


// Cat 不得不重复Mammal已经完成的工作

var cat = function (spec) {
    spec.saying = spec.saying || 'meow';

    var that = mammal(spec);
    that.purr = function (n) {
        var i, s = '';
        for (i = 0; i < n; i += 1) {
            if (s) {
                s += '-';
            }
            s += 'r';
        }
        return s;
    };
    that.get_name = function () {
        return that.says() + ' ' + spec.name + ' ' + that.says();
    };

    return that;
};

var myCat = cat({name: 'henrietta'});

document.writeln(myCat.get_name(), "<br/>");

// 函数化模式处理父类方法的方法
Object.method('superior', function (name) {
    var that = this, method = that[name];

    return function () {
        return method.apply(that, arguments);
    };
});

var coolcat = function (spec) {
    var that = cat(spec), super_get_name = that.superior('get_name');

    that.get_name = function (n) {
        return 'like ' + super_get_name() + ' baby';
    };

    return that;
};

var myCoolCat = coolcat({name: 'Bix'});

var name = myCoolCat.get_name();

document.writeln(name);