### 正则表达式

javascript的许多特性都借鉴自其他语言。语法借鉴`Java`,函数借鉴`Scheme`,原型继承借鉴自`Self`。而javascript的正则表达式特性借鉴自`Perl`。

**正则表达式**是一门简单语言的语法规范。它应用在一些方法中，对字符串的信息实现查找、替换和提取操作。

可处理正则表达式的方法有：
```
regexp.exec
regexp.test
string.match
string.replace
string.search
string.split
```

在javascript中正则表达式相较于等效的字符串处理有显著的性能优势。


用来匹配URL的正则表达式。

```
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