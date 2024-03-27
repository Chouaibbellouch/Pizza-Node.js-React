const express = require('express')
const router = express.Router()
const pizzaController = require('../controllers/pizzaController')



router.post('/createPizza', pizzaController.createPizza);
router.get('/pizzas', pizzaController.getPizzas);
router.get('/pizza/:id', pizzaController.getPizza);
router.put('/pizza/:id', pizzaController.updatePizza);
router.delete('/pizza/:id', pizzaController.deletePizza);


module.exports = router