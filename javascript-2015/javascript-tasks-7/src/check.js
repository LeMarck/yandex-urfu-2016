'use strict';

function checkContainsKeys(keys) {
    if (typeof this != 'object') {
        throw TypeError(typeof this + '.checkContainsKeys(keys) is not a function');
    }
    var elements = Object.keys(this);
    keys.forEach(function (key) {
        if (elements.indexOf(key) === -1) {
            return false;
        }
    });
    return true;
}

function checkHasKeys(keys) {
    if (typeof this != 'object') {
        throw TypeError(typeof this + '.checkHasKeys(keys) is not a function');
    }
    if (Object.keys(keys).length != Object.keys(this).length) {
        return false;
    }
    return this.checkContainsKeys(keys);
}

function checkContainsValues(values) {
    var elements = [];
    if (typeof this === 'object') {
        for (var key in this) {
            elements.push(this[key]);
        }
    } else {
        throw TypeError(typeof this + '.checkContainsValues(values) is not a function');
    }
    values.forEach(function (value) {
        if (elements.indexOf(value) === -1) {
            return false;
        }
    });
    return true;
}

function checkHasValues(values) {
    if (typeof this != 'object') {
        throw TypeError(typeof this + '.checkHasValues(values) is not a function');
    }
    if (Object.keys(values).length != Object.keys(this).length) {
        return false;
    }
    return this.checkContainsValues(values);
}

function checkHasValueType(key, type) {
    if (typeof this != 'object') {
        throw TypeError(typeof this + '.checkHasValues(values) is not a function');
    }
    return Object(this[key]) instanceof type;
}

function checkHasLength(length) {
    return this.length === length;
}

function checkHasParamsCount(count) {
    return this.length === count;
}

function checkHasWordsCount(count) {
    return this.split(/\s+/).length === count;
}

function namespace() {
    return {
        containsKeys: checkContainsKeys,
        hasKeys: checkHasKeys,
        hasValueType: checkHasValueType,
        hasLength: checkHasLength,
        hasValues: checkHasValues,
        containsValues: checkContainsValues,
        hasParamsCount: checkHasParamsCount,
        hasWordsCount: checkHasWordsCount
    };
}

function getMethods(obj) {
    if (Object(obj) instanceof Array) {
        return ['containsKeys', 'hasKeys', 'containsValues',
                'hasValues', 'hasValueType', 'hasLength'];
    }
    if (Object(obj) instanceof String) {
        return ['hasLength', 'hasWordsCount'];
    }
    if (Object(obj) instanceof Function) {
        return ['hasParamsCount'];
    }
    if (Object(obj) instanceof Object) {
        return ['containsKeys', 'hasKeys', 'containsValues',
                'hasValues', 'hasValueType'];
    }
}

exports.init = function () {

    Object.prototype.checkContainsKeys = checkContainsKeys;

    Object.prototype.checkHasKeys = checkHasKeys;

    Object.prototype.checkContainsValues = checkContainsValues;

    Object.prototype.checkHasValues = checkHasValues;

    Object.prototype.checkHasValueType = checkHasValueType;

    Array.prototype.checkHasLength = checkHasLength;
    String.prototype.checkHasLength = checkHasLength;

    Function.prototype.checkHasParamsCount = checkHasParamsCount;

    String.prototype.checkHasWordsCount = checkHasWordsCount;

    Object.defineProperty(Object.prototype, 'check', {
        get: function () {
            var checkNamespace = namespace();

            var functions = getMethods(this);
            functions.forEach(function (method) {
                checkNamespace[method] = checkNamespace[method].bind(this);
            }, this);
            return checkNamespace;
        }
    });

};
