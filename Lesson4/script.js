'use strict';
var numberLesson = 4;

// 1. Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999, мы должны получить на выходе объект, в котором в соответствующих свойствах описаны единицы, десятки и сотни. Например, для числа 245 мы должны получить следующий объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. Если число превышает 999, необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект.
// 2. Перенести функционал подсчета корзины на объектно-ориентированную базу.

const taskOne = {
    Numeral: {},
    input() {
        let countN = parseInt(prompt('Введите целое число в диапазоне [0 .. 999].'));
        if (!Number.isInteger(countN) || countN < 0 || countN > 999) {
            alert('Введите целое число в диапазоне [0 .. 999].');
            console.log('Введите целое число в диапазоне [0 .. 999].');
            return this.input();
        }

        this.Numeral.units = countN % 10;
        this.Numeral.tens = Math.floor(countN / 10) % 10;
        this.Numeral.hundreds = Math.floor(countN / 100);
        alert(`Единицы: ${this.Numeral.units}, Десятки: ${this.Numeral.tens}, Сотни: ${this.Numeral.hundreds}`);
        return this.Numeral;
    }
}

const taskTwo = {
    products: [{
            id: 1,
            product_name: "Мультиварка",
            price: 5000,
            amount: 1,
        },
        {
            id: 2,
            product_name: "Чайник",
            price: 2600,
            amount: 1,
        },
        {
            id: 3,
            product_name: "Плита",
            price: 55000,
            amount: 1,
        },
    ],
    PriceBasket() {
        let sum = this.products.reduce((total, iteam) => total += iteam.price, 0);
        alert(sum);
        return sum;
    }
};

const tasks = {
    taskOne,
    taskTwo,
    task() {
        let taskN = +prompt(`Здравствуйте! Добро пожаловать на урок ${numberLesson}. Введите номер задания: 
        0. Выход.
        1. Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999, мы должны получить на выходе объект, в котором в соответствующих свойствах описаны единицы, десятки и сотни. Например, для числа 245 мы должны получить следующий объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. Если число превышает 999, необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект.
        2. Перенести функционал подсчета корзины на объектно-ориентированную базу.`);
        return this.numberTask(taskN);
    },

    numberTask(taskN) {
        switch (taskN) {
            case 1:
                console.log(taskOne.input());
                tasks.task();
                break;
            case 2:
                console.log(taskTwo.PriceBasket());
                tasks.task();
                break;
            default:
                alert('До свидания!');
        }
    },
}

tasks.task();