// Переменные для игры
let secretNumber;  // Загаданное число
let attempts;      // Количество попыток
let gameInProgress = false;  // Флаг, чтобы отслеживать, идет ли игра

// Получаем элементы из HTML
const startButton = document.getElementById('startButton');
const submitButton = document.getElementById('submitGuess');
const userInput = document.getElementById('userInput');
const gameMessage = document.getElementById('gameMessage');
const difficultySelect = document.getElementById('difficulty');

// Слушаем событие на кнопке старта
startButton.addEventListener('click', startGame);

// Слушаем событие на кнопке проверки числа
submitButton.addEventListener('click', checkGuess);

// Функция, которая запускает игру
function startGame() {
    if (gameInProgress) return;  // Если игра уже идет, не начинаем новую

    // Получаем уровень сложности, выбрав значение из выпадающего списка
    const difficulty = parseInt(difficultySelect.value);
    
    // Загадать случайное число от 1 до выбранного уровня сложности
    secretNumber = Math.floor(Math.random() * difficulty) + 1;
    attempts = 5;  // Максимальное количество попыток
    
    // Выводим информацию о старте игры
    gameMessage.textContent = `Угадайте число от 1 до ${difficulty}. У вас есть ${attempts} попыток.`;
    
    // Включаем поле для ввода числа и кнопку проверки
    userInput.disabled = false;
    submitButton.disabled = false;
    userInput.value = '';  // Очищаем поле ввода

    // Отключаем кнопку старта, чтобы игрок не мог начать новую игру, пока не закончится текущая
    startButton.disabled = true;

    // Флаг, что игра началась
    gameInProgress = true;
}

// Функция, которая проверяет введенное число
function checkGuess() {
    // Если игра не началась или уже завершена, ничего не делаем
    if (!gameInProgress) return;

    // Преобразуем введенное значение в число
    const userGuess = parseInt(userInput.value);

    // Проверяем, является ли введенное значение числом
    if (isNaN(userGuess)) {
        alert("Пожалуйста, введите корректное число!");
        return;
    }

    // Уменьшаем количество оставшихся попыток
    attempts--;

    // Если пользователь угадал число
    if (userGuess === secretNumber) {
        gameMessage.textContent = `Поздравляю! Вы угадали число ${secretNumber}!`;
        gameInProgress = false;
        submitButton.disabled = true;  // Отключаем кнопку "Проверить"
        userInput.disabled = true;  // Отключаем поле ввода
    } else if (userGuess < secretNumber) {
        // Если число меньше загаданного
        gameMessage.textContent = `Ваше число ${userGuess} меньше загаданного. Осталось попыток: ${attempts}`;
    } else {
        // Если число больше загаданного
        gameMessage.textContent = `Ваше число ${userGuess} больше загаданного. Осталось попыток: ${attempts}`;
    }

    // Если попытки закончились
    if (attempts === 0 && gameInProgress) {
        gameMessage.textContent = `Вы проиграли. Загаданное число было ${secretNumber}.`;
        gameInProgress = false;
        submitButton.disabled = true;  // Отключаем кнопку "Проверить"
        userInput.disabled = true;  // Отключаем поле ввода
    }
}

// Переменные для новой формы
const orderForm = document.getElementById('productOrderForm');
const submitOrderButton = document.getElementById('submitOrder');
const orderResult = document.getElementById('orderResult');

// Слушатель для отправки формы
submitOrderButton.addEventListener('click', validateOrderForm);

// Функция валидации формы
function validateOrderForm() {
    const productName = document.getElementById('productName').value.trim();
    const quantity = parseInt(document.getElementById('quantity').value);
    const email = document.getElementById('email').value.trim();
    const date = document.getElementById('date').value;

    let errorMessage = '';

    // Проверяем поля
    if (!productName) errorMessage += 'Введите название продукта.\n';
    if (isNaN(quantity) || quantity <= 0) errorMessage += 'Введите корректное количество.\n';
    if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) errorMessage += 'Введите корректный email.\n';
    if (!date) errorMessage += 'Выберите дату доставки.\n';

    if (errorMessage) {
        alert(errorMessage); // Показываем ошибки в alert
    } else {
        // Показываем данные на странице
        orderResult.innerHTML = `
            <p>Ваш заказ принят:</p>
            <ul>
                <li>Продукт: ${productName}</li>
                <li>Количество: ${quantity}</li>
                <li>Email: ${email}</li>
                <li>Дата доставки: ${date}</li>
            </ul>`;
    }
}

// Пример изменения стилей
const gameContainer = document.querySelector('.game-container');

// Меняем цвет блока игры при наведении
gameContainer.addEventListener('mouseenter', () => {
    gameContainer.style.backgroundColor = '#e8f5e9';
});

gameContainer.addEventListener('mouseleave', () => {
    gameContainer.style.backgroundColor = 'white';
});


