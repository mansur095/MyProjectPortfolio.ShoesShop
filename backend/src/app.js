const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const favoritesRoutes = require('./routes/favoritesRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();

// Настройка CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Настройка CSP
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https: http:; " +
    "font-src 'self' data:; " +
    "connect-src 'self' http://localhost:3000 http://localhost:5173 ws://localhost:5173; " +
    "worker-src 'self' blob:; " +
    "child-src 'self' blob:; " +
    "frame-src 'self'"
  );
  next();
});

// Middleware
app.use(express.json());

// Маршруты
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/products', productRoutes);

// Тестовый маршрут
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
}); 