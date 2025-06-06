// src/routes/articles.js
const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/articlesController');
const upload = require('../multerConfig'); // configuration Multer
const requireAuth = require('../middleware/requireAuth');

// GET /api/articles
router.get('/', async (req, res) => {
    try {
        const data = await ArticleController.getAllArticles();
        res.status(200).json(data);
    } catch (err) {
        console.error('Erreur GET /api/articles', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST /api/articles
// - On attend un champ "image" pour le fichier (form-data)
// - Les autres champs seront envoyés en JSON (ou en form-data)
router.post(
    '/', requireAuth,
    upload.single('image'),
    async (req, res) => {
        try {
            const { id_categorie, id_auteur, titre, contenu } = req.body;
            // "req.file" contient les infos du fichier uploadé
            if (!id_categorie || !id_auteur || !titre || !contenu || !req.file) {
                return res.status(400).json({ error: 'Tous les champs (id_categorie, id_auteur, titre, contenu, image) sont requis.' });
            }
            // Le chemin à stocker en base sera le chemin relatif : req.file.path
            const imagePath = req.file.path;
            const newArticle = await ArticleController.createArticle({
                id_categorie: parseInt(id_categorie, 10),
                id_auteur: parseInt(id_auteur, 10),
                titre,
                contenu,
                image: imagePath
            });
            res.status(201).json(newArticle);
        } catch (err) {
            console.error('Erreur POST /api/articles', err);
            // Si Multer a rejeté le fichier (type, taille…), "err.message" comporte l’erreur
            res.status(400).json({ error: err.message || 'Erreur lors de la création de l’article.' });
        }
    }
);

router.get('/search', async (req, res) => {
    try {
        const searchTerm = req.query.query || '';
        if (!searchTerm.trim()) {
            return res.status(400).json({ error: 'Le paramètre "query" est requis.' });
        }
        const articles = await ArticleController.searchArticles(searchTerm);
        res.status(200).json(articles);
    } catch (err) {
        console.error('Erreur GET /api/articles/search', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * GET /api/articles/author/:id
 * Récupère tous les articles d’un auteur donné
 */
router.get('/author/:id', async (req, res) => {
    try {
        const authorId = parseInt(req.params.id, 10);
        if (isNaN(authorId)) {
            return res.status(400).json({ error: 'ID auteur invalide.' });
        }
        const articles = await ArticleController.getArticlesByAuthor(authorId);
        res.status(200).json(articles);
    } catch (err) {
        console.error('Erreur GET /api/articles/author/:id', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /api/articles/:id
router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const article = await ArticleController.getArticleById(id);
        if (!article) return res.status(404).json({ error: 'Article non trouvé.' });
        res.status(200).json(article);
    } catch (err) {
        console.error('Erreur GET /api/articles/:id', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT /api/articles/:id
// Pour modifier un article, on peut aussi uploader une nouvelle image ou garder l’ancienne
router.put(
    '/:id',
    requireAuth, // Authentification requise pour modifier un article
    upload.single('image'), // Multer gère le champ 'image' si présent
    async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            const { id_categorie, id_auteur, titre, contenu, imageAncienne } = req.body;

            // 1) Vérifier les champs obligatoires (hors image)
            if (!id_categorie || !id_auteur || !titre || !contenu) {
                return res.status(400).json({
                    error: 'Les champs id_categorie, id_auteur, titre et contenu sont obligatoires.'
                });
            }

            // 2) Déterminer quel chemin d'image utiliser
            let imagePath = null;

            if (req.file) {
                // Le client a uploadé un nouveau fichier -> Multer l'a enregistré dans /uploads
                imagePath = req.file.path;
            } else if (imageAncienne) {
                // Pas de nouveau fichier, on garde l’ancienne image (chemin envoyé dans form-data)
                imagePath = imageAncienne;
            } else {
                // Ni fichier, ni imageAncienne : on n’a pas d’image valide
                return res.status(400).json({
                    error: 'Vous devez fournir une nouvelle image ou préciser "imageAncienne" pour conserver l’ancienne.'
                });
            }

            // 3) Appeler le contrôleur pour faire l'UPDATE
            const updated = await ArticleController.updateArticle(id, {
                id_categorie: parseInt(id_categorie, 10),
                id_auteur: parseInt(id_auteur, 10),
                titre,
                contenu,
                image: imagePath
            });

            if (!updated) {
                return res.status(404).json({ error: 'Article non trouvé.' });
            }

            res.status(200).json(updated);
        } catch (err) {
            console.error('Erreur PUT /api/articles/:id', err);

            // Si la mise à jour a échoué à cause d’une FK invalide
            if (err.code === '23503') {
                return res.status(400).json({ error: 'id_categorie ou id_auteur invalide.' });
            }

            res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de l’article.' });
        }
    }
);

// DELETE /api/articles/:id
router.delete('/:id', requireAuth, async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const deleted = await ArticleController.deleteArticle(id);
        if (!deleted) return res.status(404).json({ error: 'Article non trouvé.' });
        res.status(200).json({ message: 'Article supprimé.' });
    } catch (err) {
        console.error('Erreur DELETE /api/articles/:id', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
