# NikeSB Fullstack Project

## Описание

Этот репозиторий содержит fullstack-проект интернет-магазина кроссовок Nike SB.  
В проекте реализованы:
- Фронтенд на Vue 3 + Vite
- Бэкенд на Node.js + Express

## Структура проекта

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Быстрый старт

### 1. Клонируйте репозиторий

```bash
git clone https://github.com/mansur095/MyProjectPortfolio.ShoesShop.git
cd ShoesShop
```

### 2. Установка зависимостей

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../NikeSB
npm install
```

### 3. Запуск проекта

#### Backend

```bash
cd backend
npm start
```
Сервер запустится на порту 3000 (или указанном в `.env`).

#### Frontend

```bash
cd NikeSB
npm run dev
```
Фронтенд будет доступен на http://localhost:5173

## Описание функционала

- **backend/** — REST API для авторизации, товаров, избранного.
- **NikeSB/** — SPA-приложение для пользователей (регистрация, каталог, корзина, профиль и т.д.).

## Контакты

Автор: [mansur095]
