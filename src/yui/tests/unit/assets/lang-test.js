YUI.add('lang-test', function (Y) {

var Assert = Y.Assert,
    Lang   = Y.Lang,

    doc = Y.config.doc,

    // A string comprised of only whitespace, as defined by ES 5.
    WHITESPACE = "\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF",

    suite = new Y.Test.Suite('YUI: Lang');

suite.add(new Y.Test.Case({
    name: 'Lang tests',

    _should: {
        ignore: {
            test_is_array_dom: (Y.UA.nodejs)
        }
    },
    '_isNative() should return true for native functions': function () {
        Assert.isTrue(Lang._isNative(Object.prototype.toString), 'Object.prototype.toString is native');
        Assert.isTrue(Lang._isNative(Array.prototype.concat), 'Array.prototype.concat is native');
        Assert.isTrue(Lang._isNative(String.prototype.replace), 'String.prototype.replace is native');

        if (doc) { // may not exist in Node.js
            Assert.isTrue(Lang._isNative(doc.getElementById), 'document.getElementById is native');
            Assert.isTrue(Lang._isNative(doc.getElementsByTagName('body')[0].cloneNode), 'DOM cloneNode() is native');
        }
    },

    '_isNative() should return false for non-native functions': function () {
        Assert.isFalse(Lang._isNative(Lang._isNative), 'Lang._isNative is not native');
        Assert.isFalse(Lang._isNative(YUI), 'YUI is not native');
        Assert.isFalse(Lang._isNative(function () {}, 'An anonymous function is not native'));
        Assert.isFalse(Lang._isNative(function () { '[native code]' }, 'Tricky non-native function is not native'));
        Assert.isFalse(Lang._isNative(function () { return '[native code]'; }, 'Anothre tricky non-native function is not native'));
    },

    test_is_array: function() {
        Assert.isTrue(Lang.isArray([1, 2]), "Array literals are arrays");
        Assert.isFalse(Lang.isArray({"one": "two"}), "Object literals are not arrays");

        var a = [];
        a["one"] = "two";
        Assert.isTrue(Lang.isArray(a), "'Associative' arrays are arrays");
    },

    test_is_array_dom: function() {

        // TODO: Does this really all need to be excluded for nodejs?

        // Seems like only the dom stuff needs to be excluded.
        // The other stuff is basic array stuff.

        Assert.isFalse(Lang.isArray(document.getElementsByTagName("body")),
                "Element collections are array-like, but not arrays");

        Assert.isFalse(Lang.isArray(null), "null is not an array");
        Assert.isFalse(Lang.isArray(''), "'' is not an array");
        Assert.isFalse(Lang.isArray(undefined), "undefined is not an array");

        if (Array.isArray) {
            Assert.areSame(Array.isArray, Lang.isArray, 'Lang.isArray() should use native Array.isArray() when available');
        }
    },

    test_is_boolean: function() {
        Assert.isTrue(Lang.isBoolean(false), "false failed boolean check");
        Assert.isFalse(Lang.isBoolean(1), "the number 1 is not a boolean");
        Assert.isFalse(Lang.isBoolean("true"), "the string 'true' is not a boolean");
    },

    test_is_function: function() {
        Assert.isTrue(Lang.isFunction(function(){}), "a function is a function");
        Assert.isFalse(Lang.isFunction({foo: "bar"}), "an object is not a function");
    },

    test_is_null: function() {
        Assert.isTrue(Lang.isNull(null), "null is null");
        Assert.isFalse(Lang.isNull(undefined), "undefined is not null");
        Assert.isFalse(Lang.isNull(""), "empty string is not null");
    },

    test_is_number: function() {
        Assert.isTrue(Lang.isNumber(0), "0 is a number");
        Assert.isTrue(Lang.isNumber(123.123), "123.123 is a number");
        Assert.isFalse(Lang.isNumber('123.123'), "the string '123.123' is not a number, even though it can be cast into one");
        Assert.isFalse(Lang.isNumber(1/0), "undefined numbers and infinity are not numbers we want to use");
    },

    test_is_object: function() {
        Assert.isTrue(Lang.isObject({}), "an object is an object");
        Assert.isTrue(Lang.isObject(function(){}), "a function is an object");
        Assert.isTrue(Lang.isObject([]), "an array is an object");
        Assert.isFalse(Lang.isObject(1), "numbers are not objects");
        Assert.isFalse(Lang.isObject(true), "boolean values are not objects");
        Assert.isFalse(Lang.isObject("{}"), "strings are not objects");
        Assert.isFalse(Lang.isObject(null), "null should return false even though it technically is an object");
    },

    test_is_regexp: function() {
        Assert.isTrue(Lang.isRegExp(/.*/), "a regexp is a regexp");
        Assert.isTrue(Lang.isRegExp(new RegExp(".*")), "a new RegExp is a regexp");
        Assert.isFalse(Lang.isRegExp({}), "an object is not a regexp");
        Assert.isFalse(Lang.isRegExp([]), "an array is not a regexp");
        Assert.isFalse(Lang.isRegExp(function() {}), "a function is not a regexp");
        Assert.isFalse(Lang.isRegExp(null), "null is not a regexp");
        Assert.isFalse(Lang.isRegExp(undefined), "undefined is not a regexp");
        Assert.isFalse(Lang.isRegExp(123), "a number is not a regexp");
    },

    test_is_string: function() {
        Assert.isTrue(Lang.isString("{}"), "a string is a string");
        Assert.isFalse(Lang.isString({foo: "bar"}), "an object is not a string");
        Assert.isFalse(Lang.isString(123), "a number is not a string");
        Assert.isFalse(Lang.isString(true), "boolean values are not strings");
    },

    test_is_undefined: function() {
        Assert.isTrue(Lang.isUndefined(undefined), "undefined is undefined");
        Assert.isFalse(Lang.isUndefined(false), "boolean false is not undefined");
        Assert.isFalse(Lang.isUndefined(null), "null is not undefined");
    },

    test_trim: function() {
        Assert.areEqual(Lang.trim("  My String"), "My String");
        Assert.areEqual(Lang.trim("My String  "), "My String");
        Assert.areEqual(Lang.trim("  My String  "), "My String");
        Assert.areEqual(Lang.trim(WHITESPACE).length, 0);
        Assert.areEqual(Lang.trim(null), null);
        Assert.areEqual(Lang.trim(undefined), undefined);
        Assert.areEqual(Lang.trim({}), "[object Object]");
    },

    test_trim_left: function() {
        Assert.areEqual(Lang.trimLeft("  My String"), "My String");
        Assert.areEqual(Lang.trimLeft("My String  "), "My String  ");
        Assert.areEqual(Lang.trimLeft("  My String  "), "My String  ");
        Assert.areEqual(Lang.trimLeft(WHITESPACE + "My String"), "My String");
    },

    test_trim_right: function() {
        Assert.areEqual(Lang.trimRight("  My String"), "  My String");
        Assert.areEqual(Lang.trimRight("My String  "), "My String");
        Assert.areEqual(Lang.trimRight("  My String  "), "  My String");
        Assert.areEqual(Lang.trimRight("My String" + WHITESPACE), "My String");
    },

    test_is_value: function() {
        Assert.isFalse(Lang.isValue(null), "null should be false");
        Assert.isFalse(Lang.isValue(undefined), "undefined should be false");
        Assert.isFalse(Lang.isValue(parseInt("adsf", 10)), "NaN should be false");
        Assert.isFalse(Lang.isValue(1/0), "undefined numbers and infinity should be false");
        Assert.isTrue(Lang.isValue(new Date()), "date should be true");
        Assert.isTrue(Lang.isValue(""), "Empty string should be true");
        Assert.isTrue(Lang.isValue(false), "false should be true");
    },

    test_is_date: function() {
        Assert.isFalse(Lang.isDate(null), "null should be false");
        Assert.isFalse(Lang.isDate(undefined), "undefined should be false");
        Assert.isFalse(Lang.isDate(parseInt("adsf", 10)), "NaN should be false");
        Assert.isFalse(Lang.isDate(1/0), "undefined numbers and infinity should be false");
        Assert.isFalse(Lang.isDate(NaN), "NaN should be false");
        Assert.isTrue(Lang.isDate(new Date()), "date should be true");
        Assert.isFalse(Lang.isDate(""), "Empty string should be false");
        Assert.isFalse(Lang.isDate(false), "false should be false");

        var badDateObj = new Date('junk');
        Assert.isFalse(Lang.isDate(badDateObj), "A date object containing and invalid date should be false.");
    },

    test_now: function () {
        Assert.isNumber(Lang.now(), 'Lang.now() should return the current time in milliseconds');

        if (Date.now) {
            Assert.areSame(Date.now, Lang.now, 'Lang.now() should be native Date.now() when available');
        }
    }
}));

suite.add(new Y.Test.Case({

    name: 'Lang.sub tests',

    'should replace placeholders': function () {

        var obj = {
                foo: 'foo',
                bar: 'bar',
                moo: false,
                zoo: 0,
                loo: ''
            };

        // smoke test: single & multiple replacements of one or more occurences
        Assert.areSame('foo'      , Lang.sub('{foo}'          , obj) );
        Assert.areSame('foobar'   , Lang.sub('{foo}{bar}'     , obj) );
        Assert.areSame('foobarfoo', Lang.sub('{foo}{bar}{foo}', obj) );

        // falsy values tests: should be picked up
        Assert.areSame('false', Lang.sub('{moo}', obj) );
        Assert.areSame('0'    , Lang.sub('{zoo}', obj) );
        Assert.areSame(''     , Lang.sub('{loo}', obj) );
    },

    'should leave unresolved placeholders': function () {
        Assert.areSame('{xxx}{yyy}', Lang.sub('{xxx}{yyy}', {}) );
    },

    'should leave non placeholders intact': function () {
        Assert.areSame("\txxx  foo  xxx\r\n", Lang.sub("\txxx  {foo}  xxx\r\n", { foo:'foo' }) );
    },

    'whitespace inside a placeholder is ignored': function () {
        Assert.areSame('foo', Lang.sub('{  foo  }', { foo: 'foo' }) );
    },

    'anything after a pipe inside a placeholder is ignored': function () {
        Assert.areSame('foo', Lang.sub('{foo|moo}'    , { foo: 'foo' }) );
        Assert.areSame('foo', Lang.sub('{ foo | moo }', { foo: 'foo' }) );
    },

    'should replace nested placeholders': function () {
        Assert.areSame('123', Lang.sub('{a}{b.c}{d.e.f}', {
            a: 1,
            b: { c: 2 },
            d: { e: { f: 3 } }
        }));
    },

    'should resolve nested placeholders at the closest level': function () {
        Assert.areSame('21', Lang.sub('{c.d.e}{a.b}', {
            'a.b': 1,
            'a': { 'b': 'no' },
            'c': { 'd.e': 2, 'd': { 'e': 'nono'}}
        }));
    },

    'if a nested placeholder cannot be resolved, it is left intact': function () {
        Assert.areSame('{foo.bar.baz}', Lang.sub('{foo.bar.baz}', {}) );
        Assert.areSame('{foo.bar.baz}', Lang.sub('{foo.bar.baz}', { foo: {} }) );
        Assert.areSame('{foo.bar.baz}', Lang.sub('{foo.bar.baz}', { foo: { bar: {} } }) );
    }
}));

Y.Test.Runner.add(suite);

}, '@VERSION@', {requires: ['test']});
