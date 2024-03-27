const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const pizzaRoutes = require('./routes/pizzaRoutes');
const orderRoutes = require('./routes/orderRoutes');

app
    .use(express.json())
    .use('/', userRoutes)
    .use('/', pizzaRoutes)
    .use('/', orderRoutes)

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});


require('dotenv').config();
const mongoose = require('mongoose');

const run = async () => {
  await mongoose.connect(process.env.DB);
  console.log("Connecté à la base de données");
};

run().catch(err => console.error("Erreur de connexion à la base de données:", err));