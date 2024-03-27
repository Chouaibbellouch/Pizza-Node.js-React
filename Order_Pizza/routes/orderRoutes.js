const express = require('express');
const Router = express.Router();
const orderController = require('../controllers/orderController');

Router.post('/createOrder', orderController.createOrder);
Router.get('/order/:id', orderController.getOrder);
Router.get('/orders', orderController.getOrders);
Router.put('/order/:id', orderController.updateOrder);
Router.delete('/order/:id', orderController.deleteOrder);


module.exports = Router;