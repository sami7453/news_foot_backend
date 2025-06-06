// src/routes/auteurs.js
const express = require('express');
const router = express.Router();
const AuteurController = require('../controllers/auteursController');
const requireAuth = require('../middleware/requireAuth');

// GET /api/auteurs
router.get('/', async (req, res) => {
    try {
        const data = await AuteurController.getAllAuteurs();
        res.status(200).json(data);
    } catch (err) {
        console.error('Erreur GET /api/auteurs', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST /api/auteurs      body: { nom, prenom }
router.post('/', requireAuth, async (req, res) => {
    try {
        const { nom, prenom } = req.body;
        if (!nom || !prenom) {
            return res.status(400).json({ error: 'Les champs nom et prenom sont requis.' });
        }
        const newAuteur = await AuteurController.createAuteur({ nom, prenom });
        res.status(201).json(newAuteur);
    } catch (err) {
        console.error('Erreur POST /api/auteurs', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /api/auteurs/:id
router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const auteur = await AuteurController.getAuteurById(id);
        if (!auteur) return res.status(404).json({ error: 'Auteur non trouvé.' });
        res.status(200).json(auteur);
    } catch (err) {
        console.error('Erreur GET /api/auteurs/:id', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT /api/auteurs/:id   body: { nom, prenom }
router.put('/:id', requireAuth, async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { nom, prenom } = req.body;
        if (!nom || !prenom) {
            return res.status(400).json({ error: 'Les champs nom et prenom sont requis.' });
        }
        const updated = await AuteurController.updateAuteur(id, { nom, prenom });
        if (!updated) return res.status(404).json({ error: 'Auteur non trouvé.' });
        res.status(200).json(updated);
    } catch (err) {
        console.error('Erreur PUT /api/auteurs/:id', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE /api/auteurs/:id
router.delete('/:id', requireAuth, async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const deleted = await AuteurController.deleteAuteur(id);
        if (!deleted) return res.status(404).json({ error: 'Auteur non trouvé.' });
        res.status(200).json({ message: 'Auteur supprimé.' });
    } catch (err) {
        console.error('Erreur DELETE /api/auteurs/:id', err);
        // Si contrainte FK violée (articles/vidéos rattachés), code = '23503'
        if (err.code === '23503') {
            return res.status(409).json({ error: 'Impossible de supprimer : cet auteur est référencé.' });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
