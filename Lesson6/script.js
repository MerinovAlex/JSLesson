'use strict';

// Доработать модуль корзины.
// a. Добавлять в объект корзины выбранные товары по клику на кнопке «Купить» без перезагрузки страницы
// b. Привязать к событию покупки товара пересчет корзины и обновление ее внешнего вида

const Basket = {

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

    countPrice: [],
    copyProducts: [],
    countAmount: [],

    renderTags() {

        let elemDiv = document.createElement('div');
        elemDiv.setAttribute('id', 'div');
        elemDiv.style.margin = 'auto';
        elemDiv.style.background = 'radial-gradient(circle at 0px 0px, #f9eec7, #ffb60f, #ffb60f)';
        elemDiv.style.textAlign = 'center';
        document.getElementById('div');
        document.body.appendChild(elemDiv);

        document.getElementById('div').innerHTML = '<b>Корзина</b>';

        let elemDivWord = document.createElement('div'); //text
        elemDivWord.setAttribute('id', 'div_word');
        elemDivWord.style.margin = 'auto';
        document.getElementById('div').appendChild(elemDivWord);

        let batton = document.createElement('button'); //button
        batton.setAttribute('id', 'basket_button');
        document.getElementById('div').appendChild(batton);
        document.getElementById('basket_button').textContent = 'Очистить корзину';
        document.getElementById('basket_button').addEventListener('click', this.clearBasket.bind(this));

        let elemDivBasket = document.createElement('div'); //Basket
        elemDivBasket.setAttribute('id', 'div_product_basket');
        elemDivBasket.style.cssText = 'margin: auto; display:flex; justify-content: flex-start; margin-bottom:10px;';
        elemDivBasket.style.margin = 'auto';
        document.getElementById('div').appendChild(elemDivBasket);
        this.PriceBasketSum();
    },
    PriceBasketSum() {
        let sum = this.countPrice.reduce((total, iteam) => total += iteam, 0);
        let sum2 = this.countAmount.reduce((total, iteam) => total += iteam, 0);

        if (this.copyProducts.length) {
            document.getElementById('div_word').innerHTML = `В корзине ${sum2} позиций(я) стоимостью ${sum}`;

        } else {
            document.getElementById('div_word').innerHTML = `Корзина пуста`;

        }
        return sum;
    },

    clearBasket() {

        this.countPrice = [];
        this.copyProducts = [];
        this.countAmount = [];
        this.renderTags();
    },

    productsListRender() {
        let elemDivi = document.createElement('div');
        elemDivi.setAttribute('id', 'div_product');
        elemDivi.style.cssText = 'margin: auto; display:flex; justify-content: flex-start; margin-bottom:10px;';
        document.body.appendChild(elemDivi);
        this.products.forEach(
            i => {
                let elemDivi = document.createElement('div');
                elemDivi.setAttribute(`id`, `div${i.id-1}`);
                elemDivi.style.cssText = 'margin: auto; background: lightgrey; border: 1px solid #000; height:auto;';

                document.getElementById('div_product').appendChild(elemDivi);
                document.getElementById(`div${i.id-1}`).insertAdjacentHTML('beforeend', `Наименование: ${i.product_name}`);
                document.getElementById(`div${i.id-1}`).innerHTML += '<br>';
                document.getElementById(`div${i.id-1}`).insertAdjacentHTML('beforeend', `Цена за штуку: ${i.price}`);
                document.getElementById(`div${i.id-1}`).innerHTML += '<br>';
                document.getElementById(`div${i.id-1}`).insertAdjacentHTML('beforeend', `Количество: ${i.amount}`);

                document.getElementById(`div${i.id-1}`).innerHTML += '<br>';
                let batton = document.createElement('button');
                batton.setAttribute(`id`, `product_button${i.id-1}`);
                document.getElementById(`div${i.id-1}`).appendChild(batton);
                document.getElementById(`product_button${i.id-1}`).textContent = 'Добавить в корзину';
                document.getElementById(`product_button${i.id-1}`).addEventListener('click', () => this.BasketProductsInit(`${i.id-1}`));

            }
        )
        this.renderTags();
    },

    BasketProductsInit(id) {
        if (!document.getElementById(`div_product_basket${id}`)) {
            this.countBasket(id);
            let elemDivi = document.createElement('div');
            elemDivi.setAttribute(`id`, `div_product_basket${id}`);
            elemDivi.style.cssText = 'margin: auto; margin-top:10px; background: lightgrey; border: 1px solid #000; height:auto;';
            document.getElementById('div_product_basket').appendChild(elemDivi);
            this.countAmount[id] = 0;
        }
        document.getElementById(`div_product_basket${id}`).innerHTML = `Наименование: ${this.copyProducts[id].product_name} <br> 
        Цена за штуку: ${this.countPriceF(id)} <br>`;
        document.getElementById(`div_product_basket${id}`).innerHTML += `Количество: ${this.countAmountF(id)} <br>`;
        this.PriceBasketSum();
    },

    countBasket(id) {
        this.copyProducts = this.products.slice();
        this.products.forEach(i => {
            if (i - 1 !== id) {
                delete this.copyProducts[i - 1];
            }
        })

    },
    countAmountF(id) {
        this.countAmount[id] += this.copyProducts[id].amount;
        return this.countAmount[id];
    },
    countPriceF(id) {
        this.countPrice[id] = this.copyProducts[id].price * (this.countAmount[id] + 1);
        return this.countPrice[id];
    }
};


Basket.productsListRender();