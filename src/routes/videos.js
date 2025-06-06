// src/routes/videos.js
const express = require('express');
const router = express.Router();
const VideoController = require('../controllers/videosController');
const requireAuth = require('../middleware/requireAuth');

// GET /api/videos
router.get('/', async (req, res) => {
    try {
        const data = await VideoController.getAllVideos();
        res.status(200).json(data);
    } catch (err) {
        console.error('Erreur GET /api/videos', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST /api/videos      body: { id_categorie, id_auteur, titre, url_youtube, description }
router.post('/', requireAuth, async (req, res) => {
    try {
        const { id_categorie, id_auteur, titre, url_youtube, description } = req.body;
        if (!id_categorie || !id_auteur || !titre || !url_youtube) {
            return res.status(400).json({ error: 'Les champs id_categorie, id_auteur, titre et url_youtube sont requis.' });
        }
        const newVideo = await VideoController.createVideo({
            id_categorie: parseInt(id_categorie, 10),
            id_auteur: parseInt(id_auteur, 10),
            titre,
            url_youtube,
            description: description || null
        });
        res.status(201).json(newVideo);
    } catch (err) {
        console.error('Erreur POST /api/videos', err);
        if (err.code === '23503') {
            return res.status(400).json({ error: 'id_categorie ou id_auteur invalide.' });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * GET /api/videos/latest
 * Récupère la vidéo la plus récente
 */
router.get('/latest', async (req, res) => {
    try {
        const video = await VideoController.getLatestVideo();
        if (!video) {
            return res.status(404).json({ error: 'Aucune vidéo trouvée.' });
        }
        res.status(200).json(video);
    } catch (err) {
        console.error('Erreur GET /api/videos/latest', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// GET /api/videos/:id
router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const video = await VideoController.getVideoById(id);
        if (!video) return res.status(404).json({ error: 'Vidéo non trouvée.' });
        res.status(200).json(video);
    } catch (err) {
        console.error('Erreur GET /api/videos/:id', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT /api/videos/:id   body: { id_categorie, id_auteur, titre, url_youtube, description }
router.put('/:id', requireAuth, async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { id_categorie, id_auteur, titre, url_youtube, description } = req.body;
        if (!id_categorie || !id_auteur || !titre || !url_youtube) {
            return res.status(400).json({ error: 'id_categorie, id_auteur, titre et url_youtube sont requis.' });
        }
        const updated = await VideoController.updateVideo(id, {
            id_categorie: parseInt(id_categorie, 10),
            id_auteur: parseInt(id_auteur, 10),
            titre,
            url_youtube,
            description: description || null
        });
        if (!updated) return res.status(404).json({ error: 'Vidéo non trouvée.' });
        res.status(200).json(updated);
    } catch (err) {
        console.error('Erreur PUT /api/videos/:id', err);
        if (err.code === '23503') {
            return res.status(400).json({ error: 'id_categorie ou id_auteur invalide.' });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE /api/videos/:id
router.delete('/:id', requireAuth, async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const deleted = await VideoController.deleteVideo(id);
        if (!deleted) return res.status(404).json({ error: 'Vidéo non trouvée.' });
        res.status(200).json({ message: 'Vidéo supprimée.' });
    } catch (err) {
        console.error('Erreur DELETE /api/videos/:id', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
