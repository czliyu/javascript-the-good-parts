
Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
    }
    return this;
};

Array.method('pop', function () {
    return this.splice(this.length - 1, 1)[0];
});

Array.method('push', function () {
    this.splice.apply(this, [this.length, 0].concat(Array.prototype.slice.apply(arguments)));
    return this.length;
});

Array.method('shift', function () {
    return this.splice(0, 1)[0];
});

Array.method('unshift', function () {
    this.splice.apply(this, [0, 0].concat(Array.prototype.slice.apply(arguments)));
    return this.length;
});

var a = ['a', 'b', 'c']; 
var b = ['x', 'y', 'z'];

// array.concat
var c = a.concat(b, true);

console.log(c); // ['a', 'b', 'c', 'x', 'y', 'z', true``]

// array.join

console.log(a.join('')); // 'ab'

// array.pop

console.log(a.pop()); // 'c'

// array.push

console.log(a.push(b, true)); // a = ['a', 'b', ['x', 'y', 'z'], true]

// array.reverse

console.log(a.reverse());

// array.shift
console.log(a.shift());

console.log(a.slice(1,2));

var n = [4, 8, 15, 16, 23, 42];

// array.sort

console.log(n.sort());

var sort_n = n.sort(function(a, b) {
    return a - b;
});

console.log(sort_n);

var m = ['aa', 'bb', 'a', 4, 8, 15, 16, 23, 42];

var sort_m =m.sort(function (a, b) {
    if (a === b) {
        return 0;
    }
    if (typeof a === typeof b) {
        return a < b ? -1 : 1;
    }
    return typeof a < typeof b ? -1 : 1;
});

console.log(sort_m);

var by = function (name) {
    return function(o, p) {
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
                message: 'Expexted an object whe sorting by ' + name
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

// array.splice

var a = ['a', 'b', 'c'];

var r = a.splice(1, 1, 'ache', 'bug');

console.log(a,"\n",r);


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

var r = a.splice(1, 1, 'ache', 'bug');

console.log(a);


// array.unshift
var a = ['a', 'b', 'c'];

var r = a.unshift('?', '@');

console.log(a, ' ', r);


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


// number.toExponential

console.log(Math.PI.toExponential(2));

console.log(Math.PI.toFixed(2));

console.log(Math.PI.toPrecision(2));

console.log(Math.PI.toString(2));

console.log('Curly'.charAt(0));

console.log('Curly'.charCodeAt(0));

var text = 'Mississippi';

console.log(text.indexOf('ss')); // 2
console.log(text.indexOf('ss', 3)); // 5
console.log(text.indexOf('ss', 6)); // -1

var m = ['AAA', 'A', 'aa', 'a', 'Aa', 'aaa'];

m.sort(function (a, b) {
    return a.localeCompare(b);
});

console.log(m);

var text = '<html><body bgcolor=linen><p>' +
           'This is <b>bold<\/b><\/p><\/body><\/html>';

var tags = /[^<>]+|<(\/?)([A-Za-z]+)([^<>]*)>/g;

var a, i;

a = text.match(tags);

for (i = 0; i < a.length; i += 1) {
    console.log('// [ ' + i + '] ' + a[i]);
}

// string.replace
var result = "mother_in_law".replace('_', '-');

console.log(result);


var oldareacode = /\((\d{3})\)/g;

var p = '(555)666-1212'.replace(oldareacode, '$1-');

console.log(p);

var text = 'and in it he says "Any damn fool could';

var pos = text.search(/["']/);

console.log(pos);

var text = 'and in it he says " Any damn fool could';

var a = text.slice(18);

var b = text.slice(0, 3);

var c = text.slice(-5);

var d = text.slice(19, 32);

console.log(a, "\n", b, "\n", c, "\n", d);

// array.split
console.log('0123456789'.split('', 5));

console.log('192.168.1.0'.split('.'));

console.log('|a|b|c|'.split('|'));

console.log('last, first ,middle'.split(/\s*,\s*/));

console.log('last, first ,middle'.split(/\s*(,)\s*/));
