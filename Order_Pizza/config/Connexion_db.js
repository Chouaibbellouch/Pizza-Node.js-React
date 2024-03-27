require('dotenv').config();
const mongoose = require('mongoose');

const run = async () => {
  await mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connecté à la base de données monProjetPizza");
};

run().catch(err => console.error("Erreur de connexion à la base de données:", err));
