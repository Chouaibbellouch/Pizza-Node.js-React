const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Énumérations
const Sauce = Object.freeze({
  Tomate: 'Tomate',
  Barbecue: 'Barbecue',
  Pesto: 'Pesto',
  // autres sauces...
});

const Fromage = Object.freeze({
  Mozzarella: 'Mozzarella',
  Cheddar: 'Cheddar',
  Gorgonzola: 'Gorgonzola',
  // autres fromages...
});

const Legume = Object.freeze({
  Olive: 'Olive',
  Champignon: 'Champignon',
  Poivron: 'Poivron',
  // autres légumes...
});

const Viande = Object.freeze({
  Pepperoni: 'Pepperoni',
  Jambon: 'Jambon',
  Saucisse: 'Saucisse',
  // autres viandes...
});

// Schéma de Pizza
const pizzaSchema = new Schema({
  nom: { type: String, required: true },
  description: String,
  base: String,
  prix: { type: Number, required: true },
  sauces: [{ type: String, enum: Object.values(Sauce) }],
  fromages: [{ type: String, enum: Object.values(Fromage) }],
  legumes: [{ type: String, enum: Object.values(Legume) }],
  viandes: [{ type: String, enum: Object.values(Viande) }]
});

// Rendre les énumérations accessibles dans le schéma
Object.assign(pizzaSchema.statics, {
  Sauce,
  Fromage,
  Legume,
  Viande,
});

module.exports = mongoose.model('Pizza', pizzaSchema);
