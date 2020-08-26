document.writeln("Hello world");


Function.prototype.method = function(name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
    }
    return this;
};

var a = ['a', 'b', 'c'];

var b = ['x', 'y', 'z'];

var c = a.concat(b, true);

document.writeln('concat', ' ',c, "<br/>");


var a = ['a', 'b', 'c'];
a.push('d');


var c = a.join('');
document.writeln('join', ' ', c, "<br/>");

var a = ['a', 'b', 'c'];

var c = a.pop();

document.writeln('pop', ' ', c, "<br/>");


Array.method('pop', function () {
    return this.splice(this.length - 1, 1)[0];
});

var d = a.pop();
document.writeln('pop', ' ', d, "<br/>");

var a = ['a', 'b', 'c'];
var b = ['x', 'y', 'z'];

var c = a.push(b, true);

document.writeln('push', ' ', c, "<br/>");

Array.method("push", function () {
    this.splice.apply(this, [this.length, 0].concat(Array.prototype.slice.apply(arguments)));
    return this.length;
});


var a = ['a', 'b', 'c'];
var b = ['x', 'y', 'z'];

var c = a.push(b, true);

document.writeln('push', ' ', c, "<br/>");
