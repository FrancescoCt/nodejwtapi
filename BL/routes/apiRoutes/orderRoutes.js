const express = require('express');
const authMiddleware = require('../../middleware/auth');
const orderController = require('../../controllers/apiControllers/orderController');

const router = express.Router();

//Manage CORS Policy
router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

router.post('/orders', [authMiddleware.checkAuth], orderController.createOrder);
router.post('/orders/:id/addCustomer', [authMiddleware.checkAuth], orderController.addCustomer);
router.post('/orders/:id/addProduct', [authMiddleware.checkAuth], orderController.addProduct);
router.get('/orders', [authMiddleware.checkAuth], orderController.getAllOrders);
router.get('/orders/:id', [authMiddleware.checkAuth], orderController.getOrderById);
router.put('/orders/:id', [authMiddleware.checkAuth], orderController.updateOrder);
router.put('/orders/:id/updateCustomer', [authMiddleware.checkAuth], orderController.updateCustomerOrder);
router.put('/orders/:id/updateProduct', [authMiddleware.checkAuth], orderController.updateProductOrder);
router.delete('/orders/:id', [authMiddleware.checkAuth], orderController.deleteOrder);
router.delete('/orders/:id/deleteCustomer', [authMiddleware.checkAuth], orderController.deleteCustomerOrder);
router.delete('/orders/:id/deleteProduct', [authMiddleware.checkAuth], orderController.deleteProductOrder);

module.exports = router;
