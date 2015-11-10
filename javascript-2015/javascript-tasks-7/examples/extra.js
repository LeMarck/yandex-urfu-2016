/**
 * Примеры для дополнительного задания
 */

var check = require('../src/check');

check.init();

var person = { name: 'John', age: 20 };
var numbers = [1, 2, 3];
var func = function (a, b) {};
var str = 'some string';

console.log(
    person.check.keys(['name', 'age']), // true
    person.check.keyType('name', String), // true

    numbers.check.keys(['0', '1', '2']), // true
    numbers.check.length(3), // true

    numbers.check.values([2, 1]), // true

    func.check.paramsCount(2), // true

    str.check.wordsCount(2) // true
);
