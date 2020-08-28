# 正则表达式

javascript的许多特性都借鉴自其他语言。语法借鉴`Java`,函数借鉴`Scheme`,原型继承借鉴自`Self`。而javascript的正则表达式特性借鉴自`Perl`。

**正则表达式**是一门简单语言的语法规范。它应用在一些方法中，对字符串的信息实现查找、替换和提取操作。

可处理正则表达式的方法有：

``` javascript
regexp.exec
regexp.test
string.match
string.replace
string.search
string.split
```

在javascript中正则表达式相较于等效的字符串处理有显著的性能优势。


用来匹配URL的正则表达式。

``` javascript
var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

var url = "http://www.ora.com:80/goodparts?q#fragment";

var result = parse_url.exec(url);

var names = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];

var blanks = '           ';

var i;

for (i = 0; i < names.length; i += 1) {
    document.writeln(names[i] + ':' + blanks.substring(names[i].length), result[i], "<br/>");
}
```

解释一下这个parse_url

^字符表示此字符串的开始。

`(?:([A-Za-z]+):)?` 仅当它后面跟随一个:(冒号)的时候才匹配。

`(?: . . .)`表示一个非捕获型分组。后缀`?`表示这个分组是可选的, 表示重复0次或1次。

`( . . . )` 表示一个捕获型分组。一个捕获型分组会复制它所匹配的文本，并把其放到result数组中。每个分组都会被指定一个编号，第一个捕获分组的编号就是1，所以该分组所匹配的文本副本会出现在result[1]中;

`[ . . . ]` 表示字符类，A-Za-z大小写的26个字母。`+` 表示这个字符类会匹配的1次或多次。

`(\/(0,3))` \/表示匹配/(斜杠)。用\ (反斜杠)来转义，这样就不会被错误地解释为这个正则表达式的结束符。`(0,3)`表示被匹配0次或1-3次。

`([0-9.\-A-Za-z]+)` 匹配一个主机名，由一个或多个数字、字母，以及 `.` 或 `-`字符组成。`\-`转义防止表示范围的连字符混淆。

`(?::(\d+))` 它由一个前置`:`加上一个或多个数字组成的序列。`\d`表示一个数字字符。

`(?:\/([^?#]*))?` 该分组以一个`/`开始。`[^?#]` 以一个`^`开始，它表示这个类包含除`?`和`#`之外的所有字符。`*` 表示这个字符类会被匹配0次或多次。

`(?:\?([^#]*))?` 以一个`?`开始的可选分组。

`(?:#(.*))?` 以`#`开始的。`.`会匹配除行结束符以外的所有字符。

`$` 表示这儿字符串的结束。

一个匹配数字的正则表达式。数字可能由一个整数部分加上一个可选的负号、一个可选的小数
部分和一个可选的指数部分组成。

``` javascript
var parse_number = /^-?\d+(?:\.\d*)?(?:e[+\-]?\d+)?$/i;

var test = function (num) {
    document.writeln(parse_number.test(num));
};

test('1'); // true
test("number"); // false 
test("98.6"); // true
test("132.21.86.100"); // false;
test('123.45E-67'); // true;
test('123.45D-67'); // false
```

### 结构

| 标识  | Description |
| ---- | ----------- |
|  g   |  全局的（匹配多次；不同的方法对g标识的处理各不相同）       |
|  i   |  大小写不敏感（忽略字符大小写）                         |
|  m   |  多行（^和$能匹配行结束符）                            |


创建一个正则表达式的另一个方法是使用`RegExp`构造器。这个构造器接收一个字符串。

``` javascript
// 创建一个匹配Javascript字符串的正则表达式
var my_regexp = new RegExp("\"(?:\\\\.|[^\\\\\\\\"])*\"", 'g');
```

RegExp对象的属性
| 属性   | 用法              |
| ----------- | --------------------------- |
| global      | 如果标识g被使用，值为true       |
| ignoreCase  | 如果标识i被使用，值为true       |
| lastIndex   | 下一个exec匹配开始的索引。初始值为0 |
| multiline   | 如果标识m被使用，值为true       |
| source      | 正则表达式源码文本              |


用正则表达式字面量创建RegExp对象共享同一个实例
``` javascript
function make_a_matcher() {
    return /a/gi;
};

var x = make_a_matcher();
var y = make_a_matcher();

x.lastIndex = 10;

document.writeln(y.lastIndex);
```

### 正则表达式分支

一个正则表达式分支包含一个或多个正则表达式序列。这些序列被`|`(竖线)字符分隔。

`"into".match(/in|int/)` 会在into中匹配in，但它不会匹配int，因为in已经被成功匹配。

### 正则表达式转义

`\f`是换页符
`\n`是换行符
`\r`是回车符
`\t`是制表符
`\u`是允许指定一个unicode字符来表示一个十六进制的常量。
`\d`等同于[0-9], 它匹配一个数字。`\D`表示相反的[^0-9]
`\s`等同于[\f\n\r\t\u000B], `\S`表示相反的。
`\w`等同于[0-9A-Z_a-z], `\W`则标识与其相反[^0-9A-Z_a-z]
`\b`指一个字边界标识。
`\1`指向分组1所捕获的文本的一个引用