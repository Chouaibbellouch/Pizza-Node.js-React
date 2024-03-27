const mongoose = require('mongoose');
const Pizza = require('./pizza');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  utilisateurId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  commandesPizza: [{
    pizzaId: { type: Schema.Types.ObjectId, ref: 'Pizza', required: true },
    quantite: { type: Number, required: true },
    prixTotal: Number,
  }],
  status: { type: String, default: 'en attente' },
  prixTotal: { type: Number, required: true },
  dateCommande: { type: Date, default: Date.now },
  adresseLivraison: String
});

orderSchema.pre('validate', async function(next) {
  let prixTotals = 0;
  for (let item of this.commandesPizza) {
    const pizza = await Pizza.findById(item.pizzaId).exec();
    if (!pizza) {
      continue; 
    }

    item.prixTotal = pizza.prix * item.quantite;
    prixTotals += item.prixTotal;
  }

  this.prixTotal = prixTotals;
  next();
});



module.exports = mongoose.model('Order', orderSchema);
