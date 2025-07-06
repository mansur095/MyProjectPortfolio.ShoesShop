const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', favoritesController.getFavorites);
router.post('/', favoritesController.addToFavorites);
router.delete('/:productId', favoritesController.removeFromFavorites);

module.exports = router; 