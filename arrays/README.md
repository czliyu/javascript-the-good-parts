# 数组

数组是一段线性分配的内存，它通过整数计算偏移并访问其中的元素。
数组是一种性能出色的数据结构。

### 数组字面量

数组字面量提供了一种非常方便地创建新数组的表示法。一个数组字面量是在一对方括号中包围零个或多个逗号分隔的值的表达式。

```
var empty = [];

var numbers = [
    'zero', 'one', 'two', 'three', 'four',
    'five', 'six', 'seven', 'eight', 'nine'
];

empty[1] // undefined

numbers[1] // 'one'

empty.length; // 0

numbers.length // 10

```

对象字面量：

```
var numbers_object = {
    '0': 'zero', '1': 'one', '2': 'two',
    '3': 'three', '4': 'four', '5': 'five',
    '6': 'six', '7': 'seven', '8': 'eight',
    '9': 'nine'
};
```

`numbers`和`numbers_object`的不同：
`numbers`继承自`Array.prototype`
`numbers_object`继承自`Object.prototype`

所以`numbers`继承了大量的有用方法。

### 长度

Array.length

### 删除

delete numbers[2];

mumbers.splice(2, 1);

### 枚举

```
var i;
for (i = 0; i < myArray.length; i += 1) {
    document.writeln(myAarray[i]);
}
```

### 方法

```
// 扩展Function

Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
    }
    return this;
};


Array.method('reduce', function (f, value) {
    var i;
    for (i = 0; i < this.length; i += 1) {
        value = f(this[i], value);
    }
    return value;
});
```

调用`reduce`方法。

```
var data = [4, 8, 15, 16, 23, 42];

var add = function (a, b) {
    return a + b;
};

var mult = function (a, b) {
    return a * b;
};

var sum = data.reduce(add, 0); // 108

var product = data.reduce(mult, 1); // 741880
```

因为数组是对象，可以直接给一个单独的数组添加方法

```
data.total = function () {
    return this.reduce(add, 0);
};

total = data.total();
```


### 指定初始值

javascript的数组不会预置值。

javascript 应该提供一些类似`Array.dim`这样的方法来做这件事情。

```
Array.dim = function (dimension, initial) {
    var a = [], i;

    for (i = 0; i < dimension; i += 1) {
        a[i] = initial;
    }
    return a;
};

var myArray = Array.dim(10, 0);
```

初始化多维数组。
```
Array.matrix = function (m, n, initial) {
    var a, i, j, mat = [];

    for (i = 0; i < m; i += 1) {
        a = [];
        for (j = 0; j < n; j += 1) {
            a[j] = initial;
        }
        mat[i] = a;
    }
    return mat;
};

// 构造一个用0填充的4 x 4矩阵
var myMatrix = Array.matrix(4, 4, 0);

document.writeln(myMatrix[3][3]); // 0


```