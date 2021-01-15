'use strict';
var numberLesson = 2;
// 1. Дан код (описан в script.js). Почему код даёт именно такие результаты?
//         2. Чему будет равен x? var a = 2; var x = 1 + (a *= 2);
//         3. Объявить две целочисленные переменные a и b и задать им произвольные начальные значения. Затем написать скрипт, который работает по следующему принципу: если a и b положительные, вывести их разность; если а и b отрицательные, вывести их произведение; если а и b разных знаков, вывести их сумму; ноль можно считать положительным числом.
//         4. Присвоить переменной а значение в промежутке [0..15]. С помощью оператора switch организовать вывод чисел от a до 15.
//         5. Реализовать основные 4 арифметические операции в виде функций с двумя параметрами. Обязательно использовать оператор return.
//         6. Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation), где arg1, arg2 – значения аргументов, operation – строка с названием операции. В зависимости от переданного значения операции выполнить одну из арифметических операций.
//         7. *Сравнить null и 0. Попробуйте объяснить результат.
//         8. *С помощью рекурсии организовать функцию возведения числа в степень. Формат: function power(val, pow), где val – заданное число, pow – степень.`);

function numberTask(task) {

    switch (task) {
        case 1:
            taskOne();
            break;
        case 2:
            taskTwo();
            break;
        case 3:
            taskThree();
            break;
        case 4:
            taskFour();
            break;
        case 5:
            taskFive();
            break;
        case 6:
            taskSix();
            break;
        case 7:
            taskSeven();
            break;
        case 8:
            taskEight();
            break;
        default:
            alert('До свидания!');
    }
}


function randomNumber(countNumber, maxf, minf) {
    let max = Math.floor(Math.random() * maxf);
    let min = Math.floor(Math.random() * minf);
    countNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return countNumber;
}

function task() {
    let task = +prompt(`Доброго времени суток! Добро пожаловать на урок ${numberLesson}. Введите номер задания: 
        0. Выход.
        1. Дан код (описан в script.js). Почему код даёт именно такие результаты?
        2. Чему будет равен x? var a = 2; var x = 1 + (a *= 2);
        3. Объявить две целочисленные переменные a и b и задать им произвольные начальные значения. Затем написать скрипт, который работает по следующему принципу: если a и b положительные, вывести их разность; если а и b отрицательные, вывести их произведение; если а и b разных знаков, вывести их сумму; ноль можно считать положительным числом.
        4. Присвоить переменной а значение в промежутке [0..15]. С помощью оператора switch организовать вывод чисел от a до 15.
        5. Реализовать основные 4 арифметические операции в виде функций с двумя параметрами. Обязательно использовать оператор return.
        6. Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation), где arg1, arg2 – значения аргументов, operation – строка с названием операции. В зависимости от переданного значения операции выполнить одну из арифметических операций.
        7. *Сравнить null и 0. Попробуйте объяснить результат.
        8. *С помощью рекурсии организовать функцию возведения числа в степень. Формат: function power(val, pow), где val – заданное число, pow – степень.`);
    return numberTask(task);
}

function numberOperation(Operation) {
    let a, b;
    switch (Operation) {
        case 1:
            a = +prompt('Введите число a: ');
            b = +prompt('Введите число b: ');
            alert(CalcPlus(a, b));
            break;
        case 2:
            a = +prompt('Введите уменьшаемое число: ');
            b = +prompt('Введите вычитаемое число: ');
            alert(CalcMinus(a, b));
            break;
        case 3:
            a = +prompt('Введите число a: ');
            b = +prompt('Введите число b: ');
            alert(CalcMult(a, b));
            break;
        case 4:
            a = +prompt('Введите делимое: ');
            b = +prompt('Введите делитель: ');
            alert(CalcDiv(a, b));
            break;
        default:
            alert('Спасибо за игру!');
    }
}

function taskOne() {
    alert('Ответ находится в комментариях, в самом коде!');
    //комментарий
    // var a = 1,
    //     b = 1,
    //     c, d;
    // c = ++a; в данной строчке поскольку a=1, сначала ++a установит значение c=2, а потом вернет 2 (a=2)
    // alert(c); // 2
    // d = b++; в данной строчке поскольку b=1, сначала b++ вернет 1 (d=1), а потом установит значение 2 (b=2)
    // alert(d); // 1
    // c = (2 + ++a); эта строчка и ниже, работают по принципу, описанному выше.
    // alert(c); // 5
    // d = (2 + b++);
    // alert(d); // 4
    // alert(a); // 3
    // alert(b); // 3
    return task();
}

function taskTwo() {
    let a = 2;
    let x = 1 + (a *= 2);
    alert(`Результат выражения x = 1 + (a *= 2): ${x}`);
    return task();
}

function taskThree() {
    let a, b, max = 200,
        min = -200,
        result;
    a = randomNumber(a, max, min);
    b = randomNumber(b, max, min);
    if ((a < 0) && (b < 0)) {
        result = a * b;
        alert(`a и b отрицательные числа (соотвтетственно ${a} и ${b}), произведение этих чисел (по модулю) равно ${result}`)

    } else if ((a >= 0) && (b >= 0)) {
        result = Math.abs(a - b);
        alert(`a и b положительные числа (соотвтетственно ${a} и ${b}), разность этих чисел равна ${result}`)
    } else {
        result = a + b;
        alert(`a и b числа разных знаков (соотвтетственно ${a} и ${b}), сумма этих чисел равна ${result}`)
    }
    return task();
}

function taskFour() {
    // 4. Присвоить переменной а значение в промежутке [0..15]. С помощью оператора switch организовать вывод чисел от a до 15.
    let a, max = 15,
        min = 0;
    a = randomNumber(a, max, min);
    switch (a) {
        case 0:
            alert(`a = ${a}: 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15`);
            break;
        case 1:
            alert(`a = ${a}: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15`);
            break;
        case 2:
            alert(`a = ${a}: 2,3,4,5,6,7,8,9,10,11,12,13,14,15`);
            break;
        case 3:
            alert(`a = ${a}: 3,4,5,6,7,8,9,10,11,12,13,14,15`);
            break;
        case 4:
            alert(`a = ${a}: 4,5,6,7,8,9,10,11,12,13,14,15`);
            break;
        case 5:
            alert(`a = ${a}: 5,6,7,8,9,10,11,12,13,14,15`);
            break;
        case 6:
            alert(`a = ${a}: 6,7,8,9,10,11,12,13,14,15`);
            break;
        case 7:
            alert(`a = ${a}: 7,8,9,10,11,12,13,14,15`);
            break;
        case 8:
            alert(`a = ${a}: 8,9,10,11,12,13,14,15`);
            break;
        case 9:
            alert(`a = ${a}: 9,10,11,12,13,14,15`);
            break;
        case 10:
            alert(`a = ${a}: 10,11,12,13,14,15`);
            break;
        case 11:
            alert(`a = ${a}: 11,12,13,14,15`);
            break;
        case 12:
            alert(`a = ${a}: 12,13,14,15`);
            break;
        case 13:
            alert(`a = ${a}: 13,14,15`);
            break;
        case 14:
            alert(`a = ${a}: 14,15`);
            break;
        case 15:
            alert(`a = ${a}: 15`);
            break;
        default:
            alert('До свидания!');
    }

    return task();
}

function CalcPlus(a, b) {
    return a + b;
}

function CalcMinus(a, b) {
    return a - b;
}

function CalcMult(a, b) {
    return a * b;
}

function CalcDiv(a, b) {
    return a / b;
}

function taskFive() {
    // 5. Реализовать основные 4 арифметические операции в виде функций с двумя параметрами. Обязательно использовать оператор return.

    let operationCalc = +prompt(`Выберите арифметическую операцию между двумя числами:
    1. Сложение.
    2. Вычитание.
    3. Умножение.
    4. Деление.
    0. Выход.`);
    numberOperation(operationCalc);
    return task();
}

function mathOperation(arg1, arg2, operation) {

    switch (operation) {
        case '+':
            alert(CalcPlus(arg1, arg2));
            break;
        case '-':
            alert(CalcMinus(arg1, arg2));
            break;
        case '*':
            alert(CalcMult(arg1, arg2));
            break;
        case '/':
            alert(CalcDiv(arg1, arg2));
            break;
        default:
            alert('Такой арифметической операции не существует, выберите одну из следующих операций: -,+,*,/');
            let operation = prompt(`Выберите арифметическую операцию между двумя числами (-, +, *, /)`);
            mathOperation(arg1, arg2, operation);
    }
}

function taskSix() {
    let a = +prompt('Введите число a: ');
    let b = +prompt('Введите число b: ');
    let operationCalc = prompt(`Выберите арифметическую операцию между двумя числами (-, +, *, /)`);
    mathOperation(a, b, operationCalc);
    return task();
}

function taskSeven() {
    alert('Согласно спецификации: undefined == null (true), т.е. без каких-либо преобразований они равны друг другу и не равны ничему другому. Отсюда следует, что null == 0 (false).  В то же время, проверка на равенство == и сравнения > <> = <= работают по-разному. При сравнении, значение null преобразуется в число, и оно рассматривается как 0. Вот почему null> = 0 истинно, а null> 0 ложно.');
    return task();
}

function power(val, pow) {
    let count = 1;
    if (val <= 0 || !Number.isInteger(val)) {
        alert('Задайте целые числа больше 0');
        return taskEight();
    }
    if (pow <= 0 || !Number.isInteger(pow)) {
        alert('Задайте целые числа больше 0');
        return taskEight();
    }
    if (count === pow) return val;
    return val * power(val, pow - 1);
}

function taskEight() {
    let a = +prompt('Введите число a: ');
    let b = +prompt('В какую степень вы хотите возвести число a?');
    alert(power(a, b));
    return task();
}

task();