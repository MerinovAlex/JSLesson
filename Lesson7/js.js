"use strict";
const settings = {
    rowsCount: 21,
    colsCount: 21,
    speed: 2,
    winFoodCount: 5,
};

const config = {
    settings,
    init(userSettings) {
        Object.assign(this.settings, userSettings);
    },

    getRowsCount() {
        return this.settings.rowsCount;
    },

    getColsCount() {
        return this.settings.colsCount;
    },

    getSpeed() {
        return this.settings.speed;
    },

    getWinFoodCount() {
        return this.settings.winFoodCount;
    },

    validate() {
        const result = {
            isValid: true,
            errors: [],
        };

        if (this.getRowsCount() < 10 || this.getRowsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getColsCount() < 10 || this.getColsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение colsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getSpeed() < 1 || this.getSpeed() > 10) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
        }

        if (this.getWinFoodCount() < 5 || this.getWinFoodCount() > 50) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение winFoodCount должно быть в диапазоне [5, 50].');
        }

        return result;
    },
};

const map = {
    cells: null, // {x0_y0: td, x0_y1: td, ..., xN_yN: td}
    usedCells: [],

    init(rowsCount, colsCount) {
        const table = document.getElementById('game');
        table.innerHTML = '';

        this.cells = {};
        this.usedCells = [];

        for (let row = 0; row < rowsCount; row++) {
            const tr = document.createElement('tr');
            tr.classList.add('row');
            table.appendChild(tr);

            for (let col = 0; col < colsCount; col++) {
                const td = document.createElement('td');
                td.classList.add('cell');

                this.cells[`x${col}_y${row}`] = td;
                tr.appendChild(td);
            }
        }
    },

    render(snakePointsArray, foodPoint, barrierPoint) {
        for (const cell of this.usedCells) {
            cell.className = 'cell';
        }

        this.usedCells = [];


        snakePointsArray.forEach((point, index) => {
            const snakeCell = this.cells[`x${point.x}_y${point.y}`];
            snakeCell.classList.add(index === 0 ? 'snakeHead' : 'snakeBody');
            this.usedCells.push(snakeCell);
        });

        const foodCell = this.cells[`x${foodPoint.x}_y${foodPoint.y}`];
        foodCell.classList.add('food');
        this.usedCells.push(foodCell);

        const barrierCell = this.cells[`x${barrierPoint.x}_y${barrierPoint.y}`];
        barrierCell.classList.add('barrier');
        this.usedCells.push(barrierCell);
    },
};

const snake = {

    body: [],
    direction: null,
    config,
    lastStepDirection: null,

    init(startBody, direction) {
        this.body = startBody;
        this.direction = direction;
        this.lastStepDirection = direction;
    },

    getBody() {
        return this.body;
    },

    getLastStepDirection() {
        return this.lastStepDirection;
    },

    isOnPoint(point) {
        return this.getBody().some((snakePoint) => snakePoint.x === point.x && snakePoint.y === point.y);
    },

    makeStep() {
        this.lastStepDirection = this.direction;
        this.getBody().unshift(this.getNextStepHeadPoint());
        document.getElementById('countFood').innerHTML = `Добро пожаловать в игру Змейка, <br> <br> ячейки: <br> <br> ЗЕЛЕНЫЕ - еда <br> <br>  СИНИЕ - препятствия <br> <br>
        Ваше количество очков: ${this.getCountFood()} <br> <br> Для выигрыша наберите ${this.config.getWinFoodCount()} очков`;
        this.getBody().pop();
    },

    getCountFood() {
        return this.getBody().length - 2;
    },

    growUp() {
        const lastBodyIndex = this.body.length - 1;
        const lastBodyPoint = this.getBody()[lastBodyIndex];
        const lastBodyPointClone = Object.assign({}, lastBodyPoint);
        this.getBody().push(lastBodyPointClone);
    },

    getNextStepHeadPoint() {
        const firstPoint = this.getBody()[0];

        switch (this.direction) {
            case 'up':
                return {
                    x: firstPoint.x, y: firstPoint.y - 1
                };
            case 'right':
                return {
                    x: firstPoint.x + 1, y: firstPoint.y
                };
            case 'down':
                return {
                    x: firstPoint.x, y: firstPoint.y + 1
                };
            case 'left':
                return {
                    x: firstPoint.x - 1, y: firstPoint.y
                };
        }
    },

    setDirection(direction) {
        this.direction = direction;
    },
};

const food = {
    x: null,
    y: null,

    getCoordinates() {
        return {
            x: this.x,
            y: this.y,
        };
    },

    setCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },

    isOnPoint(point) {
        return this.x === point.x && this.y === point.y;
    },
};

const status = {
    condition: null,

    setPlaying() {
        this.condition = 'playing';
    },

    setStopped() {
        this.condition = 'stopped';
    },

    setFinished() {
        this.condition = 'finished';
    },

    isPlaying() {
        return this.condition === 'playing';
    },

    isStopped() {
        return this.condition === 'stopped';
    },
};

const barrier = {
    x: null,
    y: null,

    getCoordinates() {
        return {
            x: this.x,
            y: this.y,
        };
    },

    setCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },

    isOnPoint(point) {
        return this.x === point.x && this.y === point.y;
    },
};

const game = {
    config,
    map,
    snake,
    food,
    status,
    barrier,
    tickInterval: null,

    init(userSettings) {
        this.config.init(userSettings);
        const validationResult = this.config.validate();

        if (!validationResult.isValid) {
            for (const err of validationResult.errors) {
                console.log(err);
            }

            return;
        }

        this.map.init(this.config.getRowsCount(), this.config.getColsCount());

        this.setEventHandlers();
        this.reset();
    },

    reset() {
        this.stop();
        this.snake.init(this.getStartSnakeBody(), 'up');
        this.food.setCoordinates(this.getRandomFreeCoordinates());
        this.barrier.setCoordinates(this.getRandomFreeCoordinates());
        document.getElementById('countFood').innerHTML = `Добро пожаловать в игру Змейка, <br> <br> ячейки: <br> <br> ЗЕЛЕНЫЕ - еда <br> <br>  СИНИЕ - препятствия <br> <br>
         Ваше количество очков: ${this.snake.getCountFood()+1} <br> <br> Для выигрыша наберите ${this.snake.config.getWinFoodCount()} очков`;
        this.render();
    },

    render() {
        this.map.render(this.snake.getBody(), this.food.getCoordinates(), this.barrier.getCoordinates());
    },

    play() {
        this.status.setPlaying();

        this.tickInterval = setInterval(() => this.tickHandler(), 1000 / this.config.getSpeed());
        this.setPlayButton('Стоп');
    },

    tickHandler() {
        if (!this.canMakeStep()) {
            return this.finish();
        }

        if (this.barrier.isOnPoint(this.snake.getNextStepHeadPoint())) {
            return this.finish();
        }

        if (this.food.isOnPoint(this.snake.getNextStepHeadPoint())) {
            this.snake.growUp();
            this.food.setCoordinates(this.getRandomFreeCoordinates());
            this.barrier.setCoordinates(this.getRandomFreeCoordinates());

            if (this.isGameWon()) {
                this.finish();
            }
        }

        this.snake.makeStep();
        this.render();
    },

    stop() {
        this.status.setStopped();
        clearInterval(this.tickInterval);
        this.setPlayButton('Старт');
    },

    finish() {
        this.status.setFinished();
        clearInterval(this.tickInterval);
        document.getElementById('countFood').innerText = `Игра закончена, ваше количество очков: ${this.snake.getCountFood()+1}`;
        this.setPlayButton('Игра закончена', true);
    },

    setPlayButton(textContents, isDisabled = false) {
        const playButton = document.getElementById('playButton');

        playButton.textContent = textContents;
        isDisabled ? playButton.classList.add('disabled') : playButton.classList.remove('disabled');
    },

    setEventHandlers() {
        document.getElementById('playButton').addEventListener('click', () => {
            this.playClickHandler();
        });
        document.getElementById('newGameButton').addEventListener('click', () => {
            this.newGameClickHandler();
        });
        document.addEventListener('keydown', event => this.keyDownHandler(event));
    },

    getStartSnakeBody() {
        return [{
            x: Math.floor(this.config.getColsCount() / 2),
            y: Math.floor(this.config.getRowsCount() / 2),
        }];
    },

    getRandomFreeCoordinates() {
        const exclude = [this.food.getCoordinates(), this.barrier.getCoordinates(), ...this.snake.getBody()];

        while (true) {
            const rndPoint = {
                x: Math.floor(Math.random() * this.config.getColsCount()),
                y: Math.floor(Math.random() * this.config.getRowsCount()),
            };

            if (!exclude.some(exPoint => rndPoint.x === exPoint.x && rndPoint.y === exPoint.y)) {
                return rndPoint;
            }
        }
    },

    playClickHandler() {
        if (this.status.isPlaying()) {
            this.stop();
        } else if (this.status.isStopped()) {
            this.play();
        }
    },

    newGameClickHandler() {
        this.reset();
    },

    keyDownHandler(event) {
        if (!this.status.isPlaying()) return;

        const direction = this.getDirectionByCode(event.code);

        if (this.canSetDirection(direction)) {
            this.snake.setDirection(direction);
        }
    },

    getDirectionByCode(code) {
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';
            case 'KeyD':
            case 'ArrowRight':
                return 'right';
            case 'KeyS':
            case 'ArrowDown':
                return 'down';
            case 'KeyA':
            case 'ArrowLeft':
                return 'left';
            default:
                return '';
        }
    },

    canSetDirection(direction) {
        const lastStepDirection = this.snake.getLastStepDirection();

        return direction === 'up' && lastStepDirection !== 'down' ||
            direction === 'right' && lastStepDirection !== 'left' ||
            direction === 'down' && lastStepDirection !== 'up' ||
            direction === 'left' && lastStepDirection !== 'right';
    },

    canMakeStep() {
        const nextHeadPoint = this.snake.getNextStepHeadPoint();

        return !this.snake.isOnPoint(nextHeadPoint) &&
            nextHeadPoint.x < this.config.getColsCount() &&
            nextHeadPoint.y < this.config.getRowsCount() &&
            nextHeadPoint.x >= 0 &&
            nextHeadPoint.y >= 0;
    },

    isGameWon() {

        return this.snake.getBody().length > this.config.getWinFoodCount();
    },


};

game.init({
    speed: 7
});