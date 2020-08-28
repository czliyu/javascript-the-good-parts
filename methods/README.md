# 方法

JavaScript 包含了一套小型的可用在标准类型上的标准方法集。

## Array

### array.concat(item...)

`concat` 产生一个新数组，\
它包含一份array的浅复制并把一个或多个参数`item`附加在其后，\
`item`是一个数组

``` javascript
var a = ['a', 'b', 'c'];
var b = ['x', 'y', 'z'];

var c = a.concat(b, true); // ['a', 'b', 'c', 'x', 'y', 'z', true]

```

### array.join(separator)

`join`方法把一个array构造成一个字符串。先把array中的每个元素构成一个字符串\
接着用一个`separator`分隔符把它们连接在一起。\
`separator` 默认是','

``` javascript
var a = ['a', 'b', 'c'];

var c = a.join(''); // 'abc'
```

### array.pop()

`pop`方法移除array中的最后一个元素并返回该元素
如果array为empty，它返回`undefined`

``` javascript
var a = ['a', 'b', 'c'];

var c = a.pop(); // ['a', 'b']
```

pop 扩展

``` javascript
Array.method('pop', function () {
    return this.splice(this.length - 1, 1)[0];
});
```

### array.push(item...)

`push`方法把一个或多个参数item附加到一个数组的尾部。\
和`concat`不同的是，它会修改array \
如果`item`是数组，会作为单个元素添加到数组中

``` javascript
var a = ['a', 'b', 'c'];

var b = ['x', 'y', 'z'];

var c = a.push(b, true);
// a = ['a', 'b', 'c', ['x', 'y', 'z'], true]
// c = 5
```

push 扩展

``` javascript
Array.method('push', function () {
    this.splice.apply(this, [this.length, 0].concat(Array.prototype.slice.apply(arguments)));
    return this.length;
});
```

### array.reverse()

`reverse`方法反转array中的元素顺序，并返回array本身

``` javascript
var a = ['a', 'b', 'c'];

var b = a.reverse();
```

### array.shift()

`shift`方法移除数组array中的第一个元素并返回该元素

``` javascript
var a = ['a', 'b', 'c'];

var c = a.shift(); // a = ['b', 'c']; c = 'a';
```

shift扩展

``` javascript
Array.method('shift', function () {
    return this.splice(0, 1)[0];
});
```

### array.slice(start, end)

`slice`方法对array中的一段做浅复制\
`start`: array[start]开始\
`end`: 默认是`array.length`

``` javascript
var a = ['a', 'b', 'c'];

var b = a.slice(0, 1);  // b = ['a']
var c = a.slice(1); // c = ['b', 'c']
var d = a.slice(1, 2); // d = ['b']
```

### array.sort(comparefn)

`sort`方法对array中的内容进行排序。

``` javascript
var n = [4, 8, 15, 16, 23, 42];

n.sort(); // n = [15, 16, 23, 4, 42, 8]
```

因为Javascipt默认比较函数把要被排序的元素视为字符串。

使用我们自己的比较函数来替换默认的比较函数。\
该函数接收两个参数（a, b）\
`a == b return 0` \
`a < b retun -1` \
`a > b return 1`

``` javascript
n.sort(function (a, b) {
    return a - b;
});
```

如果想要给任何包含简单值的数组排序。

``` javascript
var m = ['aa', 'bb', 'a', 4, 8, 15, 16, 23, 42];

m.sort(function (a, b) {
    if (a === b) {
        return 0;
    }
    if (typeof a === typeof b) {
        return a < b ? -1 : 1;
    }
    return typeof a < typeof b ? -1 : 1;
});
```

一个构造比较函数的函数：

``` javascript
var by = function (name) {
    return function (o, p) {
        var a, b;

        if (typeof o === 'object' && typeof p === 'object' && o && p) {
            a = o[name];
            b = p[name];
            if (a === b) {
                return 0;
            }
            if (typeof a === typeof b) {
                return a < b ? -1 : 1;
            }
            return typeof a < typeof b ? -1 : 1;
        } else {
            throw {
                name: 'Error',
                message: 'Expected an object when sorting by' + name
            };
        }
    };
};

var s = [
    {first: 'Joe', last: 'Besser'},
    {first: 'Moe', last: 'Howard'},
    {first: 'Joe', last: 'DeRita'},
    {first: 'Sheep', last: 'Howard'},
    {first: 'Larry', last: 'Fine'},
    {first: 'Curry', last: 'Howard'}
];

var sort_s = s.sort(by('first'));

console.log(sort_s);
```

### array.splice(start, deleteCount, item...)

`splice`方法从array中移除一个或多个元素，并用新的`item`替换它们。返回一个包含被移除的数组\
`start`: 数组array中移除元素的开始位置。\
`deleteCount`: 要移除的元素的个数。\
`item`: 会插入到被移除元素的位置上

``` javascript
var a = ['a', 'b', 'c'];

var r = a.splice(1, 1, 'ache', 'bug');
// a = ['a', 'ache', 'bug', 'c'];
// r = ['b']
```

splice 扩展:

``` javascript
Array.method('splice', function (start, deleteCount) {
    var max = Math.max,
        min = Math.min,
        delta,
        element,
        insertCount = max(arguments.length - 2, 0), // -2 start和deleteCount
        k = 0,
        len = this.length,
        new_len,
        result = [],
        shift_count;

    start = start || 0; // 开始位置

    if (start < 0) {
        start += len;0
    }

    start = max(min(start, len), 0);
    deleteCount = max(min(typeof deleteCount === 'number' ? deleteCount : len, len - start), 0);
    delta = insertCount - deleteCount;
    new_len = len + delta;
    while (k < deleteCount) {
        element = this[start + k];
        if (element !== undefined) {
            result[k] = element;
        }
        k += 1;
    }
    shift_count = len - start - deleteCount;
    if (delta < 0) {
        k = start + insertCount;
        while(shift_count) {
            this[k] = this[k - delta];
            k += 1;
            shift_count -= 1;
        }
        this.length = new_len;
    } else if (delta > 0){
        k = 1;
        while (shift_count) {
            this[new_len - k] = this[len - k];
            k += 1;
            shift_count -= 1;
        }
        this.length = new_len;
    }
    for(k = 0; k < insertCount; k += 1) {
        this[start + k] = arguments[k + 2];
    }
    return result;
});
```

### array.unshift(item...)

`unshift`方法把`item`插入到array的开始部分。返回新的length

``` javascript
var a = ['a', 'b', 'c'];

var r = a.unshift('?', '@');
```

unshift 扩展

``` javascript
Array.method('unshift', function () {
    this.splice.apply(this, [0, 0].concat(Array.prototype.slice.apply(arguments)));
    return this.length;
});
```


## Function

### function.apply(thisArg, argArray)

`apply`方法调用function，传递一个会被绑定到this上的对象和一个可选的数组作为参数。

``` javascript
Function.method('bind', function (that) {
    var method = this,
        slice = Array.prototype.slice,
        args = slice.apply(arguments, [1]);

    return function () {
        return method.apply(that, args.concat(slice.apply(arguments, [0])));
    };
});

var x = function () {
    return this.value;
}.bind({value: 666});

console.log(x());

```

## Number

### number.toExponential(fractionDigits)

`toExponential`方法把这个number转换成一个指数形式的字符串。
`fractionDigits`控制其小数点后的数字位数（0-20）

`console.log(Math.PI.toExponential(2)) // 3.14e+0`

### number.toFixed(fractionDigits)

`toFixed`方法把number转换成为一个十进制形式的字符串。
`fractionDigits`控制其小数点后的位数。（0-20）

`console.log(Math.PI.toFixed(2)) // 3.14`

### number.toPrecision(precision)

`toPrecision`方法把number转换成为一个十进制形式的字符串。
`precision`控制数字的精度。(0-21)

`console.log(Math.PI.toPrecision(2)) // 3.1`


### number.toString(radix)

`toString`方法把number转换成为一个字符串。
`radix`控制基数。（2-36）,默认为10

`console.log(Math.PI.toString(2))`

## Object

### object.hasOwnProperty(name)

## RegExp

### regexp.exec(string)

### regexp.test(string)


## String

### string.charAt(pos)

`charAt`方法返回在string中pos位置的字符。

``` javascript
var name = 'Curly';

var initial = name.charAt(0); // 'C'
```

charAt扩展

``` javascript
String.method('charAt', function (pos) {
    return this.slice(pos, pos + 1);
});
```

### string.charCodeAt(pos)

`charCodeAt`方法同`charAt`一样，只不过它返回的不是一个字符串，而是以整数形式表示的在string中的pos位置处的字符的字符码位。

如果`pos`小于0或大于等于`string.length`, 返回`NaN`

``` javascript
var name = 'Curly';

var initial = name.charCodeAt(0); // 67
```

### string.concat(string...)

`var s = 'C'.concat('a', 't'); // 'Cat'`

### string.indexOf(searchString, position)

`indexOf`方法在string内查找另一个字符串`searchString`。\
如果找到，返回第1个匹配字符的位置，否则返回-1。\
`position`从string的某个指定位置开始查找

``` javascript
var text = 'Mississippi';

var p = text.indexOf('ss');
p = text.indexOf('ss', 3);
p = text.indexOf('ss', 6);
```

### string.localeCompare(that)

`localeCompare`方法比较两个字符串。 \
如果 `string` < `that`, 结果为-1  \
如果 `string` == `that`, 结果为0 \
如果 `sring` > `that`, 结果1

``` javascript
var m = ['AAA', 'A', 'aa', 'a', 'Aa', 'aaa'];

m.sort(function (a, b) {
    return a.localeCompare(b);
});
```

### string.match(regexp)

`match` 方法让字符串和一个正则表达式进行匹配。

``` javascript
var text = '<html><body bgcolor=linen><p>' +
           'This is <b>bold<\/b><\/p><\/body><\/html>';

var tags = /[^<>]+|<(\/?)([A-Za-z]+)([^<>]*)>/g;

var a, i;

a = text.match(tags);

for (i = 0; i < a.length; i += 1) {
    console.log(('// [ ' + i + '] ' + a[i]).entity());
}
```

### string.replace(searchValue, replaceValue)

`var result = 'mother_in_law'.replace('_', '-');`

### string.search(regexp)

`search`和`indexOf`方法类似，只是接受一个正则表达式对象作为参数而不是一个字符串。返回第1个匹配的首字符位置，没有找到匹配，返回-1。

``` javascript
var text = 'and in it he says "Any damn fool could';

var pos = text.search(/["']/); // pos = 18
```

### string.slice(start, end)

`slice`复制string的一部分来构造一个新的字符串。\
`start`为负数， 它将与string.length相加。\
`end`可选参数，默认是string.length, 如果是负数，将与string.length 相加

``` javascript
var text = 'and in it he says " Any damn fool could';

var a = text.slice(18);

var b = text.slice(0, 3);
```

### string.split(separator, limit)

`split`方法把这个string分割成片段来创建一个字符串数组。
`limit`可以限制被分割的片段数量。separator参数可以是一个字符串或一个正则表达式

``` javascript
var digits = '0123456789';

var a = digits.split('', 5);

```

``` javascript
// array.split
console.log('0123456789'.split('', 5));

console.log('192.168.1.0'.split('.'));

console.log('|a|b|c|'.split('|'));

console.log('last, first ,middle'.split(/\s*,\s*/));

console.log('last, first ,middle'.split(/\s*(,)\s*/));

```

### string.substring(start, end)

`substring`的用法和`slice`方法一样，只是它不能处理负数参数。请用`slice`替换它使用。

### string.toLocateLowerCase()

`toLocaleLowerCase` 方法返回一个新字符串。把这个string中的所有字母转换为小写格式。

### string.toLocaleUpperCase()

`toLocaleUpperCase` 方法返回一个新字符串。把这个string中的所有字母转换为大写格式

### string.toLowerCase()

`toLowerCase` 方法返回一个新字符串。所有字母都被转换为小写格式

### string.toUpperCase()

`toUpperCase` 方法返回一个新字符串。所有字母都被转换为大写格式

### string.fromCharCode(char...)

`String.fromCharCode` 函数根据一串数字编码返回一个字符串。

``` javascript
var s = String.fromCharCode(67, 97, 116); // 'Cat'
```