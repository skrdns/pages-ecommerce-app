# E-commerce Application

## Опис
Це застосунок для онлайн-магазину з підтримкою пагінації, фільтрації, кошика, улюблених товарів та використанням локального сховища.

## Встановлення

1. Клонувати репозиторій:
    ```bash
    git clone https://github.com/skrdns/vue-ecommerce-app.git
    ```
2. Перейти на гілку з фінальним продуктом:
    ```bash
    git checkout final
    ```
3. Встановити залежності:
    ```bash
    npm install
    ```

4. Запустити застосунок:
    ```bash
    npm run dev
    ```

## Використання

- Для роботи з кошиком та улюбленими товарами використовується `localStorage`.
- Пагінація дозволяє переглядати товари на декількох сторінках.
- Для фільтрації товарів можна використовувати доступні категорії.

## Розгортання на GitHub Pages

1. Встановити gh-pages:
    ```bash
    npm install gh-pages --save-dev
    ```

2. Додати скрипти в `package.json`:
    ```json
    "scripts": {
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist"
    }
    ```

3. Виконати розгортання:
    ```bash
    npm run deploy
    ```

## Технології
- Vue 3
- Pinia
- TypeScript
- SCSS
- GitHub Pages
