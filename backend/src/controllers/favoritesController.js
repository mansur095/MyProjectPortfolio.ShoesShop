const fs = require('fs').promises;
const path = require('path');

const FAVORITES_FILE = path.join(__dirname, '../data/favorites.json');
const PRODUCTS_FILE = path.join(__dirname, '../data/products.json');

// Вспомогательная функция для чтения данных
async function readFavorites() {
  try {
    const data = await fs.readFile(FAVORITES_FILE, 'utf8');
    return JSON.parse(data).favorites;
  } catch (error) {
    console.error('Ошибка при чтении favorites.json:', error);
    return [];
  }
}

// Вспомогательная функция для чтения товаров
async function readProducts() {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, 'utf8');
    return JSON.parse(data).products;
  } catch (error) {
    console.error('Ошибка при чтении products.json:', error);
    return [];
  }
}

// Вспомогательная функция для записи данных
async function writeFavorites(favorites) {
  try {
    await fs.writeFile(FAVORITES_FILE, JSON.stringify({ favorites }, null, 2));
  } catch (error) {
    console.error('Ошибка при записи в favorites.json:', error);
    throw error;
  }
}

exports.getFavorites = async (req, res) => {
  try {
    console.log('Получение избранного для пользователя:', req.userId);
    
    const favorites = await readFavorites();
    const products = await readProducts();
    
    console.log('Найдено избранных товаров:', favorites.length);
    console.log('Найдено товаров в базе:', products.length);
    
    // Получаем избранные товары текущего пользователя
    const userFavorites = favorites.filter(fav => fav.userId === req.userId);
    console.log('Избранные товары пользователя:', userFavorites.length);
    
    // Получаем полную информацию о товарах
    const favoriteProducts = userFavorites.map(fav => {
      const product = products.find(p => p.id === fav.productId);
      if (!product) {
        console.log('Товар не найден:', fav.productId);
      }
      return product ? {
        ...product,
        favoriteId: fav.id,
        addedToFavorites: fav.createdAt
      } : null;
    }).filter(Boolean);
    
    console.log('Итоговое количество товаров:', favoriteProducts.length);
    res.json(favoriteProducts);
  } catch (error) {
    console.error('Ошибка в getFavorites:', error);
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};

exports.addToFavorites = async (req, res) => {
  try {
    const { productId } = req.body;
    console.log('userId:', req.userId, 'productId:', productId);

    if (!req.userId) {
      console.log('Нет userId!');
      return res.status(401).json({ message: 'Нет userId' });
    }

    const favorites = await readFavorites();

    // Проверяем, не добавлен ли уже товар в избранное
    const existingFavorite = favorites.find(
      fav => fav.userId === req.userId && fav.productId === productId.toString()
    );

    if (existingFavorite) {
      console.log('Товар уже в избранном');
      return res.status(400).json({ message: 'Товар уже в избранном' });
    }

    const newFavorite = {
      id: Date.now().toString(),
      userId: req.userId,
      productId: productId.toString(),
      createdAt: new Date().toISOString()
    };

    favorites.push(newFavorite);
    await writeFavorites(favorites);

    console.log('Добавлен в избранное:', newFavorite);
    res.status(201).json(newFavorite);
  } catch (error) {
    console.error('Ошибка в addToFavorites:', error);
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};

exports.removeFromFavorites = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log('Удаление из избранного:', { userId: req.userId, productId });
    
    const favorites = await readFavorites();
    
    const updatedFavorites = favorites.filter(
      fav => !(fav.userId === req.userId && fav.productId === productId)
    );

    if (updatedFavorites.length === favorites.length) {
      console.log('Товар не найден в избранном');
      return res.status(404).json({ message: 'Товар не найден в избранном' });
    }

    await writeFavorites(updatedFavorites);
    console.log('Товар успешно удален из избранного');
    res.json({ message: 'Товар удален из избранного' });
  } catch (error) {
    console.error('Ошибка в removeFromFavorites:', error);
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
}; 