// src/index.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const auth = require('./routes/auth');
const categoriesRoutes = require('./routes/categories');
const auteursRoutes = require('./routes/auteurs');
const articlesRoutes = require('./routes/articles');
const videosRoutes = require('./routes/videos');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Expose le dossier uploads en statique
app.use(
    '/src/uploads',
    express.static(path.join(__dirname, '/uploads'))
);

// 1) Route d’authentification (pour obtenir un token)
//    POST http://localhost:4000/api/login  { "password": "..." }
app.use('/api/login', auth);

// 2) Routes publiques
app.use('/api/categories', categoriesRoutes);
app.use('/api/auteurs', auteursRoutes);
app.use('/api/articles', articlesRoutes);
app.use('/api/videos', videosRoutes);

// Racine
app.get('/', (req, res) => {
    res.send('API Foot Backend fonctionne !');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
