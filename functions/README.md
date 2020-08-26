# 函数

Javascript设计最出色的就是它的函数实现。它几乎接近完美。

### 函数对象

Javascript中的函数就是对象。对象是“名/值”对的集合并拥有一个连到原型对象的隐藏连接。对象字面量产生的对象连接到`Object.prototype`。函数对象连接到`Function.prototype`。

### 函数字面量

```
// 创建一个名为add的变量，并用来把两个数字相加的函数赋值给它
var add = function (a, b) {
    return a + b;
};

```

函数字面量包括4部分
1、保留字`function`
2、函数名可以省略。如果没有给函数命名，它被称为匿名函数（`anonymous`）
3、包围在（）中的一组参数。多个参数用逗号分隔。它们不像普通的变量那样将被初始化为undefined，而是在该函数被调用时初始化为实际提供的参数的值
4、{}语句是函数主体，它们在函数被调用时执行。

### 方法调用模式

当函数被保存为对象的一个属性时，我们称它为一个方法。
```
// 创建myObject对象
// increment 方法接受一个可选参数，如果参数不是数字，那么默认使用数字1

var myObject = {
    value: 0,
    increment: function (inc) {
        this.value += typeof inc === 'number' ? inc : 1;
    };
};

myObject.increment();
document.writeln(myObject.value); // 1

myObject.increment(2);
document.writeln(myObject.value); // 3
```

方法可以使用`this`访问自己所属的对象，所以它能从对象中取值或对对象进行修改。`this`到对象的绑定发生在调用的时候。

### 函数调用模式

当函数并非一个对象的属性时，那么它就被当作一个函数来调用了。
`var sum = add(3, 4) // sum的值为7`

> 调用函数时，`this`被绑定到全局对象，这是语言的设计上的一个错误。倘若语言设计正确，那么当内部函数调用时，this应该仍然绑定到外部函数的this变量。这个设计错误的后果就是方法不能利用内部函数来帮助它工作，因为内部函数的`this`被绑定了错误的值，所以不能共享该方法对对象的访问权。幸运的是，有一个很容易的解决方案，如果该方法定义一个变量并给它赋值为`this`,那么内部函数可以通过那个变量访问到this。按照规定，把那个变量命名为`that`

```
myObject.double = function () {
    var that = this;
    var helper = function () {
        that.value = add(that.value, that.value);
    };
    helper();
}

myObejct.double();
document.writeln(myObject.value);

```

### 构造器调用模式

Javascript是一门基于原型继承的语言。这意味着对象可以直接从其他对象继承属性。

如果在一个函数前面带上`new`来调用，那么背地里将会创建一个连接到该函数的`prototype`成员的新对象，同时`this`会被绑定到那个新对象上。

```
// 创建一个名为Quo的构造器函数，带有status属性的对象
var Quo = function (string) {
    this.status = string;
};

// 给Quo的所有实例提供一个名为get_status的公共方法

Quo.prototype.get_status = function () {
    return this.status;
};

// 构造一个Quo实例
var myQuo = new Quo('confused');

document.writeln(myQuo.get_status()); // 'confused'
```

一个函数，如果创建的目的就是希望结合new前缀来调用，那么就称为构造器函数。按照约定，它们保存在以大写格式命名的变量里。如果调用构造器函数时没有在前面加`new`,可呢会发生非常糟糕的事情，既没有编译时警告，也没有运行时警告。（不推荐这么写）

Apply调用模式

因为Javascript是一门函数式的面向对象编程语言，所以函数可以拥有方法

`apply`方法让我们构造一个参数数组传递给调用函数。它也允许我们选择this的值。
`apply`方法接收两个参数，第一个绑定给`this`的值，第二个参数数组。

```
var array = [3, 4];
var sum = add.apply(null, array);

// 构造一个包含status成员的对象
var statusObject = {
    status: 'A-Ok'
};

var status = Quo.prototype.get_status.apply(statusObject); // 'A-Ok'
```

### 参数

`arguments` 数组。函数通过次参数访问所有它被调用时传递给它的参数列表，包括那些没有被分配给函数声明时定义的形式参数的多余参数，这使得编写一个无须指定参数个数的函数称为可能。

```
var sum = function () {
    var i, sum = 0;
    for (i = 0; i < arguments.length; i += 1) {
        sum += arguments[i];
    }
    return sum;
};

document.writeln(sum(4, 8, 15, 16, 23, 42));
```

### 异常

异常处理机制,异常是干扰程序的正常流程的不寻常。

```
var add = function (a, b) {
    if (typeof a !==  'number' || typeof b !== 'number') {
        throw {
            name: 'TypeError',
            message: 'add needs numbers'
        };
    }
    return a + b;
}

throw 抛出一个`exception`对象，该对象包含一个用来识别异常类型的`name`属性和一个描述的`message`属性。

// 构造错误的调用
var try_it = function () {
    try {
        add("seven");
    } catch (e) {
        document.writeln(e.name + ': ' + e.message): // TypeError: add needs numbers
    }
}

try_it();
```

### 扩展类型的功能

JavaScript 允许给语言的基础类型扩充功能，通过`Object.prototype`添加方法，可以让该方法对所有对象都可用。

```
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};
```
给`Function.prototype`增加一个method方法，所有`function`通过`method`来增加函数。

```
// 通过给Number.prototype增加一个`integer`方法来改善它。
Number.method('integer', function () {
    return Math[this < 0 ? 'cell' : 'floor'](this);
});

document.writeln((-10/3).integer());
```

### 递归

递归函数就是会直接或间接地调用自身的一种函数。

浏览器端的文档对象模型（DOM）,每次递归调用时处理指定树的一小段。


```
// 定义walk_the_DOM函数，它从莫个指定的节点开始，按HTML源码中的顺序访问该树的每个节点
// 它会调用一个函数，并依次传递每个节点给它，

var walk_the_DOM = function walk(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walk(node, func);
        node = node.nextSibling;
    }
};


// 定义getElementsByAttributes函数，它以一个属性名称字符串和一个可选的
// 匹配值作为参数，
// 它调用walk_the_DOM，传递一个用来查找节点属性名的函数作为参数
// 匹配节点会累加到一个结果数组中


var getElementsByAttribute = function (att, value) {
    var results = [];

    walk_the_DOM(document.body, function (node) {
        var actual = node.nodeType === 1 && node.getAttribute(att);

        if (typeof actual === 'string' && (actual === value || typeof value !== 'string')) {
            results.push(node);
        }
    });

    return results;
};

document.writeln(getElementsByAttribute('href', '#')):

```

javascript当前没有提供尾递归优化，深度递归的函数可能会因为堆栈溢出而运行失败。
**尾递归**是一种在函数的最后执行递归调用语句的特殊形式的递归。

```
// 构造一个带尾递归的函数，因为它会返回自身调用的结果，所以塔是尾递归


var factorial = function factorial(i, a) {
    a = a || 1;
    if (i < 2) {
        return a;
    }
    return factorial(i - 1, a * i);
};

document.writeln(factorial(4));
```

### 作用域

作用域控制着变量与参数的可见性及生命周期。

```
var foo = function () {
    var a = 3, b = 5;

    var bar = function () {
        var  b = 7, c = 11;
        // 此时,a 为 3，b 为 7，c 为 11
        a += b + c;
        // 此时，a 为 21, b 为 7，c 为 7
    };
    bar();
};


```

### 闭包

作用域的好处是内部函数可以访问定义它们的外部函数的参数或变量（除了this和arguments）。

### 回调

发起异步请求，提供一个当服务器的相应达到随时即触发的回调函数，异步函数立即返回。这样客户端就不会被阻塞。

```
request = prepare_the_request();
send_request_asynchronously(request, function (response) {
    display(response)
});
```

### 模块

可以通过使用函数和闭包来构造模块，模块是一个提供接口却隐藏状态和实现的函数或对象。

想要给`String`增加一个`deentityify`方法。寻找字符串中的HTML字符实体并把它们替换为对应的字符。
理想的方式是把它放入一个闭包中，而且也许还能提供一个增加更多字符实体的扩展方法：

```
String.method('deentityify', function () {
    // 字符实体表，映射字符实体
    var entity = {
        quot: '"',
        lt: '<',
        gt: '>'
    };

    // 返回deentityify 方法
    return function () {
        return this.replace(/&([^&;]+);/g, function (a, b) {
            var r = entity[b];
            return typeof r === 'string' ? r : a;
        });
    };
}());

document.writeln('&lt;&quot;&gt;'.deentityify( ));

```

模块模式利用了函数作用域和闭包来创建被绑定对象与私有变量的关联，只有`deentityify`方法有权访问字符实体表这个数据对象。

模块模式的一般形式是: 一个定义了私有变量和哈函数的函数；利用闭包创建可以访问私有变量和函数的特权函数；最后返回这个特权函数，或者把它们保存到一个可访问到的地方。

使用模块模式就可以摈弃全局变量的使用。

利用模块模式构造一个用于产生序列号的对象：

```
var serial_maker = function () {
    var prefix = '';
    var seq = 0;

    return {
        set_prefix: function (p) {
            prefix = String(p);
        },
        set_seq: function (s) {
            seq = s;
        },
        gensym: function () {
            var result = prefix + seq;
            seq += 1;
            return result;
        }
    };
};

var seqer = serial_maker();

seqer.set_prefix('Q');
seqer.set_seq(1000);

var unique = seqer.gensym();

```

## 级联

有些方法没有返回值。例如。一些设置或修改对象的某个状态却不返回任何值的方法就是典型的例子。如果我们让这些方法返回`this`而不是`undefined`,就可以启用级联。

```
// 一个启用级联的Ajax类库可能允许我们这样的形式去编码
getElement('myBoxDiv')
    .move(350, 150)
    .width(100)
    .height(100)
    .color('red')
    .border('10px outset')
    .padding('4px')
    .appendText('Please stand by')
    .on('mousedown', function (m) {
        this.startDrag(m, this.getNinth(n));
    })
    .on('mousemove', 'drag')
    .on('mouseup', 'stopDrag')
    .later(2000, function () {
        this.color('yellow')
            .setHTML('What hath God wraught?')
            .slide(400, 40, 200, 200);
    })
    .tip('This box is resizeable')

```

### 记忆

函数可以将先前操作的结果记录在莫个对象里。从而避免重复运算。这种优化被称为记忆。

使用记忆来处理Fiboanacci数列。

在一个名为memo的数组中保存我们的存储结果，存储结果可以隐藏在闭包中。当函数被调用时，首先检查结果是否已经存在

```
var fibonacci = function () {

    // 存储计算结果
    var memo = [0, 1];

    var fib = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {
            result = fib(n - 1) + fib(n - 2);
            memo[n] = result;
        }
        return result;
    };
    return fib;
}();
```

编写一个函数来帮助我们构造带记忆功能的函数。`memoizer`函数获取一个初始的memo数组和formula函数。返回一个管理memo存储和在需要时调用formula函数的recur函数。

```
var memoizer = function (memo, formula) {
    var recur = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {
            result = formula (recur, n);
            memo[n] = result;
        }
        return result;
    };
    return recur;
};

var fibonacci = memoizer([0, 1], function (recur, n) {
    return recur(n - 1) + recur(n - 2);
});
```