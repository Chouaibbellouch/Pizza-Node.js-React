const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  adresse: String,
  telephone: String,
  dateInscription: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
