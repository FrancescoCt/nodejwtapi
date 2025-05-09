const express = require('express');
const authMiddleware = require('../../middleware/auth');
const productController = require('../../controllers/apiControllers/productController');

const router = express.Router();

//Manage CORS Policy
router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

router.post('/products', [authMiddleware.checkAuth], productController.createProduct);
router.get('/products', [authMiddleware.checkAuth], productController.getAllProducts);
router.get('/products/:id', [authMiddleware.checkAuth], productController.getProductById);
router.put('/products/:id', [authMiddleware.checkAuth], productController.updateProduct);
router.delete('/products/:id', [authMiddleware.checkAuth], productController.deleteProduct);

module.exports = router;
