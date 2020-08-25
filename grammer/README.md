### 语法

# 标识符

**标识符**由一个字母开头，其后可选择性地加上一个或多个字母、数字或下画线。标识符不能
使用下面的这些保留字：

```
abstract
boolean  break   byte
case  catch  char  class  const   continue
debugger  default  delete  do  double
else enum export extends
false final finally float for function
goto
if implements import in instanceof int interface
long
native new null
package private protected public
return
short static super switch synchronized
this throw throws transient true try typeof 
var volatile void
while with
```

**javascript不允许使用保留字来命名变量或参数。更糟糕的是，Javascript不允许再对象字面量中，或者用点运算符提取对象属性时，使用保留字作为对象属性名**

# 数字

Javascript只有一个数字类型。它在内部被表示为64位的浮点数，和Java的double数字类型一样。与其他大多数编程语言不同的是，它没有分离出整数类型，所以1和1.0的值相同。这提供了很大的方便，因为它完全避免了端整型的溢出问题。

NaN是一个数值，它表示一个不能产生正常结果的运算结果。NaN不等于任何值，包括它自己。用函数isNaN(number) 检测isNaN

Infinity表示所有大于1.79769313486231570e+308的值。

# 字符串

字符串是**不可变的**，一旦字符串被创建，就永远无法改变。但可以很容易通过 `+` 运算符连接其他字符串来创建一个新字符串：`"c" + "a" + "t" === "cat"`

# 语句

一个编译单元包含一组可执行的语句。
当var语句被用再函数内部时，它定义的是这个函数的私有变量。

值被当作假（fasle）:

* false
* null
* undefined
* 字符串' '
* 0
* NaN

其他所有值当做真（true），包括true、字符串"false",以及所有的对象

（for in 语句）会枚举一个对象的所有属性名（或健名）。在每次循环中，object的下一个属性名字符串赋值给variable。

```
for (myvar in obj) {
    if (obj.hasOwnProperty(myvar))
}
```

# 表达式

最简单的表达式是字面量值（比如字符串或数字）、变量、内置的值（true、false、null、undefined、NaN和IInfinity）。

# 函数

