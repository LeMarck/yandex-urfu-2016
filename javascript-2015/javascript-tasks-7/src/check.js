'use strict';

function checkContainsKeys(keys) {
    if (typeof this != 'object') {
        throw TypeError(typeof this + '.checkContainsKeys(keys) is not a function');
    }
    var elements = Object.keys(this);
    for (var indexElem in keys) {
        if (elements.indexOf(keys[indexElem]) == -1 && typeof keys[indexElem] != 'function') {
            return false;
        }
    }
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
    for (var indexElem in values) {
        if (elements.indexOf(values[indexElem]) == -1 && typeof values[indexElem] != 'function') {
            return false;
        }
    }
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

function checkHasParamsCount(count){
    return this.length == count;
}

function checkHasWordsCount(count){
    return this.split(/\s+/).length == count;
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
};
