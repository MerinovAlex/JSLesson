'use strict';
// 1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100.

function taskOne() {
    let i = 1;
    let count = 0;
    let mas = [];
    while (i <= 100) {
        let j = 1;
        while (j <= i) {
            count = (i % j === 0) ? ++count : count;
            j++;
        }
        count = ((count <= 2) && (count > 0)) ? mas.push(i) : count = 0;
        i++;
    }
    alert(`Числа в промежутке от 0 до 100: ${mas}`);
}
taskOne();