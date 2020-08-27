# 对象

JavaScript的简单数据类型包括数字、字符串、布尔值、null和undefined值。其他所有的值都是对象。

对象是属性的容器，其中每个属性都拥有名字的值。属性的名字可以包括空字符串在内的任意字符串。属性值可以是除了undefine值之外的任何值。

Javascript里的对象是无状态的。它对新属性的名字和属性的值没有任何限制。对象适合用于汇集和管理数据。对象可以包含其他对象，所以他们可以容易地表示成树状或图形结构。

javascript包含一种原型链的特性，允许对象继承另一个对象的属性。


### 对象字面量

对象字面量提供了一种非常方便地创建新对象值的表示法。一个对象字面量就是包围在一对花括号中的零或多个“名/值”对。

```
var empty_object = {};
var stooge = {
    "first-name": "pang",
    "last-name": "hu"
};
```
> javacript 的标识符中包含连接符（-）是不合法的，但是允许包含下画线（_）, 所以first-name的双引号是**必需**的。

属性的值可以从包括另一个对象字面量在内的任意表达式中获取，对象可嵌套

```
var flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2020-08-21 09:58",
        city: "Sydney"
    },
    arrival: {
        "IATA": 'LAX',
        time: "2020-08-22 09:25"，
        city: "Los Angeles"
    }
}
```

### 检索

获取对象里包含的值：

1、用[]后缀中括住一个字符串表达式的方式

`stooge["first-name"] // "pang"`

2、用`.`表示法(优先考虑使用)

`flight.departure.IATA // "SYD"`

尝试检索一个不存在的成员属性的值，将返回undefined

`stooge['middle-name'] // undefined`

`flight.status // undefined`

`||` 运算符可以用来填充默认值

`var middle = stooge['middle-name'] || "(none)"`

`var status = flight.status || "unknown"`

尝试从undefined的成员属性中取值将会导致`TypeError`异常。可以通过`&&`来避免错误

`flight.equipment // undefined` 

`flight.equipment.model // throw "TypeError"`

`flight.equipment && flight.equipment.model // undefined`

### 更新

对象中的值可以通过赋值语句来更新。如果属性名已经存在在对象里，那么这个属性的值会被替换。
```
stooge['first-name'] = "Lester";
stooge.nickname = "Curly";
flight.equipment = {
    model: 'Boeing 777';
};
flight.status = "overdue";
```

### 引用

对象通过引用来传递。
```
var x = stooge;
x.nickname = 'Curly';
var nick = stooge.nickname;
    //因为x和stooge是指向同一个对象的引用，所以nick为’Curly'

var a = {}, b = {}, c = {};
    // a, b和c每个都引用了一个不同的空对象 
a = b = c = {};
    // a, b和c都引用了同一个空对象
```

### 原型

每一个对象都连接到一个原型对象，并且它可以从中继承属性。所有通过对象字面量创建的对象都连接到`Object.prototype`,它是JavaScript中的标配对象。

当创建一个新对象时，可以选择莫个对象作为它的原型。使用`Object.create()`来创建一个使用原对象作为其原型的新对象。

```
if (typeof Object.beget !== 'function') {
    Object.create = function (0) {
        var F = function () {};
        F.prototype = 0;
        return new F();
    };
}
var another_stooge = Object.create(stoogle);
```

原型连接在更新时是不起作用的。不会触及该对象的原型:
```
another_stooge['first-name'] = "xiao";
another_stooge['middle-name'] = "ma";
another_stooge.nickname = 'ze';
```

原型连接只有在检索值的时候才被用到。如果我们尝试去获取对象的莫个属性值，但该对象没有此属性名，那么javascript会试着从原型对象中获取属性值。如果那个原型对象也没有该属性，那么再从它的原型中寻找，以此类推，直到该过程最后到达终点Object.prototype。如果想要的属性完成不存在于原型链中，那么结果就是undefined值。这个过程叫**委托**


### 反射

检查对象并确定对象有什么属性是很容易的事情，只有试着去检索该属性并验证取得的值。`typeof`操作符对确定属性的类型很有帮助：

```
typeof flight.number // 'number'
typeof flight.status // 'string'
typeof flight.arrival // 'object'
typeof flight.manifast // underfined

// 注意原型链中的任何属性会产生的值
typeof flight.toString // 'function'
typeof flight.constructor // 'function'
```

有两种方法去处理掉这些不需要的属性。

第一种让你的程序做检查并丢弃值为函数的属性。
第二种使用`hasOwnProperty`方法，`hasOwnProperty`方法不会检查原型链
```
flight.hasOwnProperty('number'); // true
flight.hasOwnProperty('constructor'); // false
```

### 枚举

for in 语句可用来遍历一个对象中所有的属性名。该枚举过程会列出所有的属性--包括函数和你可能不关心的原型中的属性--所以有必要过滤掉那些你不想要的值。最为常用的过滤器是`hasOwnProperty`方法，以及使用`typeof`来排除函数:
```
var name;
for (name in another_stooge) {
    if (typeof another_stooge[name] !== 'function') {
        document.writeln(name + ": " + another_stooge[name]);
    }
}
```
属性名出现的顺序是不确定的，以此要对任何可能出现的顺序有所准备。如果你想要确保属性以特定的顺序出现，最好的办法就是完全避免使用`for in`语句，而是创建一个数组。
```
var i;
var properties = [
    'first-name',
    'middle-name',
    'last-name',
    'profession'
];

for (i = 0; i < properties.length; i += 1) {
    console.log(properties[i] + ": " + another_stooge[properties[i]]);
}
```

### 删除

`delete`运算符可以用来删除对象的属性。如果对象包含该属性，那么该属性就会被删除。
它不会触及原型链中的任何对象。

删除对象的属性可能会让来自原型链中的属性透现出来

```
another_stooge.nickname;  // 'Moe'
// 删除another_stooge的nickname属性，从而暴露出原型的nickname 属性。
delete another_stooge.nickname;

another_stooge.nickname; // 'Curly'
```

### 减少全局变量污染

Javascript可以很随意地定义全局变量来容纳你的应用的所有资源。遗憾的是，全局变量削弱了程序的灵活性，应该避免使用。

最小化使用全局变量的方法之一是为你的应用只创建一个**唯一**的全局变量：

```
var MYAPP = {};
MYAPP.stooge = {
    "first-name": 'joe',
    "last-name": 'Howard'
};

MYAPP.flight = {
    airline: 'Ocenic',
    number: 815,
    departure: {
        IATA: 'SYD',
        time: '2020-08-21 1:50',
        city: 'Sydney'
    },
    arrival: {
        IATA: 'LAX',
        time: '2020-08-21 3:12',
        city: 'Los Angeles'
    }
}
```