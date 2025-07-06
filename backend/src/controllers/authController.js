const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const USERS_FILE = path.join(__dirname, '../data/users.json');

// Вспомогательная функция для чтения данных
async function readUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data).users;
  } catch (error) {
    return [];
  }
}

// Вспомогательная функция для записи данных
async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify({ users }, null, 2));
}

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Читаем текущих пользователей
    const users = await readUsers();

    // Проверяем, существует ли пользователь
    if (users.find(user => user.email === email)) {
      return res.status(400).json({ message: 'Пользователь уже существует' });
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем нового пользователя
    const newUser = {
      id: Date.now().toString(), // Простой способ генерации ID
      email,
      password: hashedPassword,
      name,
      createdAt: new Date().toISOString()
    };

    // Добавляем пользователя в массив
    users.push(newUser);

    // Сохраняем обновленный массив
    await writeUsers(users);

    // Генерируем токен
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Читаем пользователей
    const users = await readUsers();

    // Ищем пользователя
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' });
    }

    // Проверяем пароль
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный пароль' });
    }

    // Генерируем токен
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};

// Мидлварь для проверки токена
exports.getMe = async (req, res) => {
  try {
    const users = await readUsers();
    const user = users.find(u => u.id === req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Отправляем данные пользователя без пароля
    const { password, ...userData } = user;
    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
}; 