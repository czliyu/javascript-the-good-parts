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


// 构造一个数字数组

var data = [4, 8, 15, 16, 23, 42];

// 定义两个简单的函数，一个是把两个数字相加，另一个是把两个数字相乘

var add = function (a, b) {
    return a + b;
};

var mult = function (a, b) {
    return a * b;
};

// 调用data的reduce方法，传入add函数

var sum = data.reduce(add, 0);

// 再次调用reduce方法，这次传入mult函数

var product = data.reduce(mult, 1);

document.writeln(sum, " ", product, "<br/>");

// 给data数组添加一个total方法

data.total = function () {
    return this.reduce(add, 0);
};

total = data.total();

document.writeln(total, "<br/>");



// 指定初始值
Array.dim = function (dimension, initial) {
    var a = [], i;
    for (i = 0; i < dimension; i += 1) {
        a[i] = initial;
    }
    return a;
};

// 创建一个包含10个0的数组
var myArray = Array.dim(10, 0);

document.writeln(myArray, "<br/>");


// 构造矩阵
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

var myMatrix = Array.matrix(4, 4, 0);

document.writeln(myMatrix[3][3]); // 0

// 用来构造一个单位矩阵的方法

Array.identity = function (n) {
    var i, mat = Array.matrix(n, n, 0);

    for (i = 0; i < n; i += 1) {
        mat[i][i] = 1;
    }
    return mat;
};

var myIdentity = Array.identity(4);

document.writeln(myIdentity[3][3]); // 1