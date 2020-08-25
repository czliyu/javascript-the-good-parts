var add = function (a, b) {
    return a + b;
};


var myObject = {
    value: 0,
    increment: function (inc) {
        this.value += typeof inc === 'number' ? inc : 1;
    },
};


myObject.increment();
document.writeln(myObject.value); // 1

myObject.increment(2);
document.writeln(myObject.value); // 3

myObject.double = function () {
    console.log(this);
    var that = this;

    var helper = function () {
        console.log(that);
        that.value = add(that.value, that.value);
    };
    helper();
    helper();
};

myObject.double();
document.writeln(myObject.value);


// 构造器调用模式

// 构建一个名为Quo的构造函数
var Quo = function (string){
    this.status = string;
};

// Quo的所有实例提供一个名为get_status的公共方法
Quo.prototype.get_status = function () {
    return this.status;
};

// 构造一个Quo实例
var myQuo = new Quo('confused');

document.writeln(myQuo.get_status());


var array = [3, 4];
var sum = add.apply(null, array);

document.writeln(sum);

var statusObject = {
    status: 'A-OK'
};

var status = Quo.prototype.get_status.apply(statusObject);

document.writeln(status);


var sum = function () {
    var i, sum = 0;
    for (i = 0; i < arguments.length; i += 1) {
        sum += arguments[i];
    }
    return sum;
};

document.writeln(sum(4, 8, 15, 16, 23, 42));



// 异常
var add = function (a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw {
            name: 'TypeError',
            message: 'add needs numbers'
        };
    }
    return a + b;
}

var try_it = function () {
    try {
        add("seven");
    } catch (e) {
        document.writeln(e.name + ": " + e.message);
    }
}
try_it();


// 扩展类型的功能

Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
    }
    return this;
};

Number.method('integer', function () {
    return Math[this < 0 ? 'ceil' : 'floor'](this);
});

document.writeln((-10 / 3).integer());

String.method('trim', function () {
    return this.replace(/^\s+|\s+$/g, '');
});

document.writeln('"' + "   next    ".trim() + '"');


// 递归

// 定义walk_the_dom函数，它从某个指定的节点开始，按HTML源码中的顺序
// 访问该树的每个节点
// 它会调用一个函数，并依次传递每个节点给它，walk_the_dom调用自身去处理每个子节点

var walk_the_DOM = function walk(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walk(node, func);
        node = node.nextSibling;
    }
};

var getElementsByAttributes = function (att, value) {
    var results = [];

    walk_the_DOM(document.body, function (node) {
        var actual = node.nodeType === 1 && node.getAttribute(att);

        if (typeof actual === 'string' && (actual === value || typeof value !== 'string')) {
            results.push(node);
        }
    });
    return results;
}    
document.writeln(getElementsByAttributes("href", '#'));


// 尾递归

var factorial = function factorial (i, a) {
    a = a || 1;

    if (i < 2) {
        return a;
    }
    return factorial(i - 1, a * i);
};

document.writeln(factorial(4));


// 模块

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


// 记忆
var fibonacci = function() {
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

document.writeln(fibonacci(10));



// memoizer 记忆方法
var memoizer = function (memo, formula) {
    var recur = function (n) {
        var result = memo[n];

        if (typeof result !== 'number') {
            result = formula(recur, n);
            memo[n] = result;
        }
        return result;
    };
    return recur;
};

var fibonacci = memoizer([0, 1], function (recur, n) {
    return recur(n - 1) + recur(n - 2);
});


document.writeln(fibonacci(10));


// 阶层

var factorial = memoizer([1, 1], function(recur, n) {
    return n * recur (n - 1);
});

document.writeln(factorial(3));