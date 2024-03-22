const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon site web pour personnaliser votre Pizza!');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
