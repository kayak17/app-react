# my-app-react

Личный проект на React.js  
Представляет из себя сервис по поиску жилья в одном из представленных городов

## Запуск приложения :wrench:

1. Устанавливаем зависимости

```
 npm i
```

2. Из директории проекта запускаем фейковый сервер на локальном хосте 

```
 json-server --watch db.json --port 3000
```

3. Параллельно в другом терминале запускаем приложение локально на 1337 порту

```
 npm start
```

#### Сборка проекта

```
 npm run build
```

## Основной стек :hammer_and_wrench:

- React v17
- React hooks
- React Router
- React Bootstrap
- Redux
- Redux hooks
- Redux Actions
- Redux Persist
- Redux thunk
- Reselect
- Axios
- Formik
- Yup
- Webpack

## Описание функционала :scroll:

### Общая информация

- Загрузка страниц приложения согласно роутеру осуществляется "лениво"
- Загрузка содержимого модальных окон осуществляется "лениво"
- Основные части приложения обернуты в компонент ErrorBoundary
    + Содержимое модальных окон
    + Контентная часть страницы под шапкой
    + Обертка всей страницы
- Фон шапки страницы отличается на разных страницах в зависимости от layout
- Для основных компонентов есть placeholder'ы, которые отображаются во время загрузки данных
- Данные авторизованного пользователя обрабатываются при помощи Redux и сохраняются в localStorage
- Синхронизация Redux store и localStorage осуществляется при помощи Redux Persist
- Работа с формами и валидация осуществляются при помощи Formik и Yup

### Основные переиспользуемые компоненты

#### Шапка приложения

- Если пользователь не авторизован, в правой части отображаются ссылки при клике на которые появляются модальные окна авторизации либо регистрации
- Если пользователь авторизован, отображается аватарка пользователя при наличии и email со значком выпадающего списка
- При клике на email открывается выпадающий список, из которого можно перейти на страницу избранных предложений ("/favorites") либо выполнить выход пользователя

#### Карточка оффера

- Внешний вид карточки оффера имеет три варианта отрисовки: горизонтальный layout, вертикальный layout, горизонтальный layout c уменьшенной картинкой (задается через props)
- При клике на картинку, либо заголовок оффера осуществляется переход на страницу оффера ("/offer?id=NNN"), где NNN - id оффера
- (*) При клике на флажок справа от цены оффера:
    + _Пользователь авторизован_. Id оффера попадает в массив избранных офферов данного пользователя, который хранится в localStorage
    + _Пользователь не авторизован_. Появляется модальное окно с формой авторизации
- При наведении мышкой на карточку оффера соответствующий маркер на карте меняет цвет на оранжевый (при наличии компонента карты на той же странице)

#### Карта с отметками офферов

- При наведении мышкой на маркер оффера:
    + Маркер меняет цвет с синего на оранжевый
    + Появляется всплывающая подсказка с краткой информацией по офферу
    + Соответствующая карточка оффера из списка офферов подсвечивается (при наличии компонента со списком офферов на той же странице)
- При клике на маркер осуществляется переход на страницу оффера ("/offer?id=NNN"), где NNN - id оффера

### Главная страница ("/")

#### Список городов

- После "ленивой" загрузки обертки страницы начинается загрузка данных для списка городов
- После успешной загрузки списка городов происходит установка активного города в Redux store:
    + Высший приоритет для выбора активного города имеет параметр строки запроса city.id
    + Если параметр city.id не задан выбор осуществляется по данным из Redux store
    + Если данные из Redux store отсутствуют, выбирается первый город из загруженного списка

#### Список офферов с фильтром

- Загрузка данных для офферов начинается после успешной загрузки данных для списка городов и установки выбранного города
- В заголовке отображается суммарное количество офферов активного города, полученное из x-total-count header запроса списка офферов
- Внешний вид карточек офферов (горизонтальный layout и вертикальный layout) можно изменить нажатием кнопок справа над списком офферов
- Пользователь может изменить сортировку списка офферов нажатием на выпадающий список правее от надписи "Sort by"
- По умолчанию загружаются только первые семь офферов активного города в зависимости от выбранной сортировки
- Для улучшения UX данные первых семи загруженных офферов для каждого города и каждого варианта сортировки кешируются при помощи useRef
- Кроме x-total-count header с сервера приходит link header с данными для постраничной загрузки офферов
- Как только скролл контейнера с офферами достигает дна, загружаются следующие семь офферов
- Офферы загруженные при скролле ко дну контейнера не кешируются, чтобы чрезмерно не заполнять память
- Офферы есть только для первых двух городов

#### Карта с отметками офферов

- Загрузка данных для карты начинается после успешной загрузки данных для списка городов и установки выбранного города
- Функционал карты описан выше

### Страница оффера ("/offer?id=NNN"), где NNN - id оффера

#### Основная часть страницы

- Загрузка данных по офферу, списку отзывов и трем офферам неподалеку происходит параллельно
- Функционал флажка справа от цены оффера описан выше в (*)

#### Список отзывов

- Компонент со списком отзывов отрисовывается после успешной загрузки данных по офферу и списку отзывов
- В заголовке блока с отзывами отображается общее количество отзывов для данного оффера, полученное из x-total-count header запроса списка отзывов
- Первоначально загружается не более пяти отзывов
- Если отзывов больше пяти, появляется кнопка "Load more", при нажатии на которую можно загрузить следующие пять отзывов согласно link header из запроса списка отзывов

#### Форма нового отзыва

- Компонент с формой нового отзыва отрисовывается после успешной загрузки данных по офферу и списку отзывов
- Для авторизованных пользователей отображается форма отправки нового отзыва
- Для отправки отзыва пользователь должен выставить рейтинг от 1 до 5 звезд и написать текст не менее 50 символов
- Для неавторизованных пользователей отображается сообщением с предложением авторизоваться

#### Офферы неподалеку

- Под блоком отзывов, после успешной загрузки данных по офферу и данных по трем офферам неподалеку, отрисовывается список из трех офферов неподалеку и карта, на которой отображены маркеры этих офферов
- Зеленым маркером на карте отмечается расположение основного оффера с данной страницы
- Прочий функционал карты описан выше

### Страница избранных предложений ("/favorites")

- Страница доступна только авторизованным пользователям
- Неавторизованные пользователи перенаправляются на страницу авторизации
- Id избранных офферов авторизованного пользователя получаются из Redux store, который синхронизирован с localStorage при помощи Redux Persist
- Офферы группируются по городам
- Клик на кнопку с названием города перенаправляет пользователя на главную страницу с параметром city.id=NNN, где NNN - id города
- Пользователь может удалить оффер из списка кликнув по синему флажку справа от цены

### Формы авторизации и регистрации

- Используются на страницах авторизации ("/login") и регистрации ("/signup"), а также в модальных окнах
- В случае успешной авторизации на странице авторизации, происходит перенаправление пользователя на главную страницу ("/")
- В случае успешной регистрации на странице регистрации, появляется сообщение с предложением открыть страницу авторизации
- В случае успешной авторизации через модальное окно, появляется Toaster с соответствующим сообщением
- В случае успешной регистрации через модальное окно, появляется сообщение с предложением открыть модальное окно авторизации 
