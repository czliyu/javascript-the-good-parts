# 继承

类继承的一个好处是引入了一套类型系统的规范。由于程序员无需编写显式类型转换代码，工作量大大减轻。因为类型转换会丧失类型系统在安全上的优势。保持简单通常是最好的。

### 伪类

javascript的原型存在着诸多矛盾。它的某些复杂的语言看起来就像那些基于类的语言，这些语法问题掩盖了它的原型机制。它不直接让对象从其他对象继承，反而插入了一个多余的间接层，通过构造器函数产生对象。

新函数对象被赋予一个`prototype`属性，它的值是一个包含`constructor`属性且属性值为该新函数的对象。这个`prototype`对象是存放继承特征的地方。

当采用构造器调用模式，取用`new`前缀调用一个函数时，函数执行的方式会被修改。

```
// method 方法看函数扩展
Function.method('new', function() {
    // 创建一个新对象，它继承自构造器函数的原型对象
    var that = Object.create(this.prototype);

    // 调用构造器函数，绑定-this-到对象上
    var other = this.apply(that, arguments);

    // 如果它的返回值不是一个对象，就返回该新对象
    return (typeof other === 'object' && other) || that;
});

// 定义一个构造器并扩充它的原型

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

var myMammal = new Mammal('Herb the Mammal', 'say something');
var name = myMammal.get_name(); // 'Herb the Mammal'
document.writeln(name, " ",myMammal.says());

```

构造另一个伪类来继承Mammal，通过定义它的`constructor`函数并替换它的`prototype`为一个Mammal的实例实现：
```
var Cat = function (name) {
    this.name = name;
    this.saying = 'meow'
};

// 替换 Cat.prototype为一个新的Mammal实例
Cat.prototype = new Mammal();

// 扩充新原型对象，增加purr和get_name方法
Cat.prototype.purr = function (n) {
    var i, s = '';
    for (i = 0; i < n; i += 1) {
        if (s) {
            s += '-';
        }
        a += 'r';
    }
    return s;
};

Cat.prototype.get_name = function () {
    return this.says() + ' ' + this.name + ' ' + this.says();
};

var myCat = new Cat('Henrietta');
var says = myCat.says();
var purr = myCat.purr(5);
var name = myCat.get_name();

document.writeln(says, '\n', purr, '\n', name);

```
让它看上去更像面向对象，我们可以隐藏一些细节。通过使用method方法定义一个`inherits`方法实现

```
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

```

### 原型

在一个纯粹的原型模式中，摒弃类，转而专注于对象。基于原型的继承相比基于类的继承在概念上更为简单；一个新对象可以继承一个旧对象的属性。

先用对象字面量构造一个有用的对象：

```
var myMammal = {
    name: 'Herb the Mammal',
    get_name: function () {
        return this.name;
    },
    says: function () {
        return this.saying || '';
    };
};

var myCat = Object.create(myMammal);

myCat.name = 'Henrietta';
myCat.saying = 'meow';
myCat.purr = function (n) {
    var i, s = '';
    for (i = 0; i < 10; i += 1) {
        if (s) {
            s += '-';
        }
        s += 'r';
    }
    return s;
};

myCat.get_name = function () {
    return this.says() + ' ' + this.name + ' ' + this.says();
};


document.writeln(myCat.get_name());

```

### 函数化

继承模式的一个弱点是没法保护隐私。对象的所有属性都是可见的。

使用模块模式可以处理这个弱点

我们从构造一个生成对象的函数开始。我们以小写字母开头来命名，因为不需要使用new前缀，该函数包括4个步骤：

1、 创建一个新对象。有很多方式去构造一个对象。它可以构造一个对象字面量，或者它可以和new前缀连用去调用一个构造器函数，或者它可以使用`Object.create`方法去构造一个已经存在的对象的新实例，或者它可以调用任意一个会返回一个对象的函数。

2、 有选择地定义私有实例变量和方法。这些就是函数中通过var语句定义的普通变量。

3、 给这个对象扩充方法。这些方法拥有特权去访问参数，以及第2步中通过var语句定义的变量。

4、 返回那个新对象

```
var constructor = function (spec, my) {
    var that, **其他的私有实例变量**;

    my = my || {};

    **把共享的变量和函数添加到my中**

    that = 一个对象

    **添加给that的特权方法**
    return that;

};
```

`spec`: 对象包含构造器需要构造一个新实例的所有信息。spec的内容可能会被复制到私有变量中，或者被其他函数改变，或者方法可以在需要的时候访问spec的信息。

`my`: 对象是一个为继承链中的构造器提供秘密共享的容器。my对象可以选择性的使用。

```
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

var myMammal = mammal({name: 'Herb'});
```

在伪类模式中，构造器函数Cat不得不重复Mammal已经完成的工作。在函数化模式中那不再需要，因为构造器Cat将会调用构造器Mammal，让Mammal在做对象创建中的大部分工作，所有Cat只能关注自身的差异即可。

```
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

var myCat = cat({name: 'Henrietta'});
```

函数化模式还给我们提供了一个处理父类方法的方法。构造一个`superior`方法，它取得一个方法名并返回调用那个方法的函数。

```
Object.method('superior', function (name) {
    var that = this, method = that[name];

    return function () {
        return method.apply(that, arguments);
    };
});

var coolcat = function (spec) {
    var that = cat(spec), super_get_name = that.superior('get_name');

    that.get_name = function (n) {
        return 'like' + super_get_name() + 'baby';
    };
    return that;
};
```

函数化模式有很大的灵活性。它相比伪类模式不仅带来的工作更少，还让我们得到更好的封装和信息隐藏，以及访问父类方法的能力。