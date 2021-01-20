'use strict';
var numberLesson = 5;

// 1. Создать функцию, генерирующую шахматную доску. При этом можно использовать любые html-теги по своему желанию. Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые ячейки. Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F, G, H.
// 2. Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре. Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS:
// 2.1. Пустая корзина должна выводить строку «Корзина пуста»;
// 2.2. Наполненная должна выводить «В корзине: n товаров на сумму m рублей».

const taskOne = {

    renderTags() {
        var elemTable = document.createElement('table');
        elemTable.setAttribute('id', 'chess');
        elemTable.style.margin = 'auto';
        elemTable.style.borderCollapse = 'collapse';
        elemTable.style.background = 'radial-gradient(circle at 80px 40px, #f9eec7, #ffb60f, #ffb60f)';
        document.body.appendChild(elemTable);
        return document.getElementById('chess');
    },

    renderMap() {
        const rows = [0, 8, 7, 6, 5, 4, 3, 2, 1];
        const cols = [0, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        this.renderTags();
        for (let row = 0; row < rows.length; row++) {
            const tr = document.createElement('tr');
            this.renderTags().appendChild(tr);

            for (let col = 0; col < cols.length; col++) {
                const td = document.createElement('td');
                tr.appendChild(td);

                if (rows[row] === 0 && cols[col] !== 0) {
                    td.innerHTML = cols[col];
                } else if (cols[col] === 0 && rows[row] !== 0) {
                    td.innerHTML = rows[row];
                }

                if (this.ColorRC(row, col)) {
                    td.style.backgroundColor = 'black';
                }
                td.style.width = '70px';
                td.style.height = '70px';
                td.style.border = '1px solid #888888';
                td.style.textAlign = 'center';
                td.style.fontSize = '20px';
                td.style.textTransform = 'uppercase';
            }
        }

    },

    ColorRC(row, col) {
        if (row === 0 || col === 0 || row === 9 || col === 9) {
            return false;
        }
        return (row % 2 === 0 && col % 2 === 1) || (row % 2 === 1 && col % 2 === 0);
    },


};

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
            amount: 2,
        },
    ],


    renderTags() {
        let elemDiv = document.createElement('div');
        elemDiv.setAttribute('id', 'div');
        elemDiv.style.margin = 'auto';
        elemDiv.style.background = 'radial-gradient(circle at 0px 0px, #f9eec7, #ffb60f, #ffb60f)';
        document.getElementById('div');
        document.body.appendChild(elemDiv);

        let batton = document.createElement('button');
        batton.setAttribute('id', 'basket_button');
        document.getElementById('div').appendChild(batton);
        document.getElementById('basket_button').textContent = 'Очистить корзину';

        document.getElementById('basket_button').querySelector('.basket_button');
        document.getElementById('basket_button').addEventListener('click', this.clearBasket.bind(this));


        return document.body.appendChild(elemDiv);
    },
    PriceBasket() {
        this.renderTags();
        let sum = this.products.reduce((total, iteam) => total += (iteam.price * iteam.amount), 0);

        if (this.products.length) {
            document.getElementById('div').insertAdjacentHTML('beforeend', `В корзине ${this.products.length} позиций(я) стоимостью ${sum}`);
        } else {
            document.getElementById('div').innerHTML = 'Корзина пуста';
        }
        return sum;
    },

    clearBasket() {
        this.products = [];
        this.PriceBasket();
    }
};

const tasks = {
    taskOne,
    taskTwo,
    task() {
        let taskN = +prompt(`Здравствуйте! Добро пожаловать на урок ${numberLesson}. Введите номер задания: 
        0. Выход.
        1. Создать функцию, генерирующую шахматную доску. При этом можно использовать любые html-теги по своему желанию. Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые ячейки. Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F, G, H.
        2. Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре. Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS: (Пустая корзина должна выводить строку «Корзина пуста» и наполненная должна выводить «В корзине: n товаров на сумму m рублей».)`);
        return this.numberTask(taskN);
    },

    numberTask(taskN) {
        switch (taskN) {
            case 1:
                taskOne.renderMap();
                break;
            case 2:
                taskTwo.PriceBasket();
                break;
            default:
                alert('До свидания!');
        }
    },
}

tasks.task();