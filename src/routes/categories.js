// src/routes/categories.js
const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoriesController');
const requireAuth = require('../middleware/requireAuth');

/**
 * GET /api/categories
 * Récupère toutes les catégories
 */
router.get('/', async (req, res) => {
    try {
        const data = await CategoryController.getAllCategories();
        res.status(200).json(data);
    } catch (err) {
        console.error('Erreur GET /api/categories', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * POST /api/categories
 * Crée une nouvelle catégorie
 * Body attendu : { nom: "nom_de_la_categorie" }
 */
router.post('/', requireAuth, async (req, res) => {
    try {
        const { nom } = req.body;
        if (!nom) {
            return res.status(400).json({ error: 'Le champ "nom" est requis.' });
        }
        const newCat = await CategoryController.createCategory(nom);
        res.status(201).json(newCat);
    } catch (err) {
        console.error('Erreur POST /api/categories', err);
        // Code Postgres 23505 = violation de contrainte UNIQUE (doublon)
        if (err.code === '23505') {
            return res.status(409).json({ error: 'Cette catégorie existe déjà.' });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * GET /api/categories/:id
 * Récupère une catégorie par son ID
 */
router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const category = await CategoryController.getCategoryById(id);
        if (!category) {
            return res.status(404).json({ error: 'Catégorie non trouvée.' });
        }
        res.status(200).json(category);
    } catch (err) {
        console.error('Erreur GET /api/categories/:id', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * PUT /api/categories/:id
 * Met à jour le nom d’une catégorie
 * Body attendu : { nom: "nouveau_nom" }
 */
router.put('/:id', requireAuth, async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { nom } = req.body;
        if (!nom) {
            return res.status(400).json({ error: 'Le champ "nom" est requis.' });
        }
        const updated = await CategoryController.updateCategory(id, nom);
        if (!updated) {
            return res.status(404).json({ error: 'Catégorie non trouvée.' });
        }
        res.status(200).json(updated);
    } catch (err) {
        console.error('Erreur PUT /api/categories/:id', err);
        // Doublon de nom
        if (err.code === '23505') {
            return res.status(409).json({ error: 'Cette catégorie existe déjà.' });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * DELETE /api/categories/:id
 * Supprime une catégorie
 */
router.delete('/:id', requireAuth, async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const deleted = await CategoryController.deleteCategory(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Catégorie non trouvée.' });
        }
        res.status(200).json({ message: 'Catégorie supprimée.' });
    } catch (err) {
        console.error('Erreur DELETE /api/categories/:id', err);
        // Si des articles ou vidéos sont rattachés : contrainte FK
        if (err.code === '23503') {
            return res.status(409).json({ error: 'Impossible de supprimer : des éléments y sont liés.' });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
