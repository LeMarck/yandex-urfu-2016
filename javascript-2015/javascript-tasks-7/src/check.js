'use strict';

function checkContainsValues(values) {
    for (var indexElem in this) {
        if (this[indexElem] != values[indexElem]) {
            return false;
        }
    }
    return true;
}

function checkHasValues(values) {
    if (values.length != this.length ||
        Object.keys(values).length != Object.keys(this).length) {
        return false;
    }
    return this.checkContainsValues(values);
}

function checkHasValueType(key, type) {
    return typeof this[key] === type.name.toLowerCase();
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

    Object.prototype.checkContainsValues = checkContainsValues;
    Array.prototype.checkContainsValues = checkContainsValues;

    Object.prototype.checkHasValues = checkHasValues;
    Array.prototype.checkHasValues = checkHasValues;

    Object.prototype.checkHasValueType = checkHasValueType;
    Array.prototype.checkHasValueType = checkHasValueType;

    Array.prototype.checkHasLength = checkHasLength;
    String.prototype.checkHasLength = checkHasLength;

    Function.prototype.checkHasParamsCount = checkHasParamsCount;

    String.prototype.checkHasWordsCount = checkHasWordsCount;
};
