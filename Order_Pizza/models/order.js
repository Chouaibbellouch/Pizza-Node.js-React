const mongoose = require('mongoose');
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

module.exports = mongoose.model('Order', orderSchema);
