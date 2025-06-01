document.addEventListener('DOMContentLoaded', function () {
    const btnSearch = document.querySelector('#btnSearch');
    const containerCoctails = document.querySelector('#cards');
    const template = document.querySelector('#templateCoctail');

    btnSearch.addEventListener('click', async () => {       
        // Получаем данные из поля
        const strInput = document.querySelector('#strInput');
        const nameCocktail = document.querySelector('#nameCocktail');
        
        // Обрабатываем поля
        const searchCocktail = strInput.value.trim();

        // Проверка заполненности полей
        if (!searchCocktail) {
            alert('Пожалуйста, заполните поле поиска!');
            return;
        }

        // Очищаем контейнер перед добавлением новых элементов
        containerCoctails.innerHTML = '';

        // Загружаем данные из сервера
        const listCoctail = await getData(searchCocktail);

        // Вывод списка коктейлей согласно Template
        
        // console.log(listCoctail.drinks[0]);

        // Обработаем весь массив в цикле
        for (let i = 0; i < listCoctail.drinks.length; i++) {

            // Клонируем шаблон сообщения
            const newCoctail = template.content.cloneNode(true);

            // Заполняем данные
            newCoctail.querySelector('.card-img-top').src = listCoctail.drinks[i].strDrinkThumb;
            newCoctail.querySelector('.card-title').innerText = listCoctail.drinks[i].strDrink;
            newCoctail.querySelector('.card-text').innerText = listCoctail.drinks[i].strInstructions;

            // Находим элементы внутри карточки
            const text = newCoctail.querySelector('.card-text');
            const button = newCoctail.querySelector('.toggle-btn');

            // Добавляем обработчик клика
            button.addEventListener('click', function () {
                // Переключаем класс expanded/collapsed
                text.classList.toggle('collapsed');
                text.classList.toggle('expanded');

                // Меняем текст кнопки
                if (text.classList.contains('expanded')) {
                    button.textContent = 'Свернуть';
                } else {
                    button.textContent = 'Подробнее';
                }
            });

            // Добавляем коктейль в раздел
            containerCoctails.appendChild(newCoctail);

        }

       


        
    })    

});

// Функция получения данных из сервера
async function getData(searchCocktail) {
    try {
        // 1. Ждём ответ от сервера (await)
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchCocktail}`);

        // 2. Если ответ "плохой" (не 200-299) → бросаем ошибку
        if (!response.ok) throw new Error("Ошибка " + response.status);

        // 3. Если всё ок → парсим JSON (тоже с await)
        const data = await response.json();

        // 4. Работаем с данными
        return data;
    } catch (err) {
        // Ловим ЛЮБЫЕ ошибки: сетевые, 404/500, проблемы с JSON
        console.error("Ошибка:", err);
    }
}

