// src/controllers/videosController.js
const pool = require('../db');

// 1. Récupérer toutes les vidéos
async function getAllVideos() {
    const result = await pool.query(`
    SELECT v.id_video,
           v.titre,
           v.url_youtube,
           v.description,
           v.date_creation,
           v.date_modification,
           c.nom AS categorie,
           au.nom AS auteur_nom,
           au.prenom AS auteur_prenom
    FROM video v
    JOIN categorie c ON v.id_categorie = c.id_categorie
    JOIN auteur au ON v.id_auteur = au.id_auteur
    ORDER BY v.date_creation DESC
  `);
    return result.rows;
}

// 2. Créer une nouvelle vidéo
async function createVideo({ id_categorie, id_auteur, titre, url_youtube, description }) {
    const result = await pool.query(
        `INSERT INTO video 
       (id_categorie, id_auteur, titre, url_youtube, description) 
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
        [id_categorie, id_auteur, titre, url_youtube, description]
    );
    return result.rows[0];
}

// 3. Récupérer une vidéo par ID
async function getVideoById(id) {
    const result = await pool.query(`
    SELECT v.id_video,
           v.titre,
           v.url_youtube,
           v.description,
           v.date_creation,
           v.date_modification,
           c.nom AS categorie,
           au.nom AS auteur_nom,
           au.prenom AS auteur_prenom
    FROM video v
    JOIN categorie c ON v.id_categorie = c.id_categorie
    JOIN auteur au ON v.id_auteur = au.id_auteur
    WHERE v.id_video = $1
  `, [id]);
    return result.rows[0] || null;
}

// 4. Mettre à jour une vidéo
async function updateVideo(id, { id_categorie, id_auteur, titre, url_youtube, description }) {
    const result = await pool.query(
        `UPDATE video
     SET id_categorie = $1,
         id_auteur    = $2,
         titre        = $3,
         url_youtube  = $4,
         description  = $5,
         date_modification = CURRENT_TIMESTAMP
     WHERE id_video = $6
     RETURNING *`,
        [id_categorie, id_auteur, titre, url_youtube, description, id]
    );
    return result.rows[0] || null;
}

// 5. Supprimer une vidéo
async function deleteVideo(id) {
    const result = await pool.query(
        'DELETE FROM video WHERE id_video = $1 RETURNING *',
        [id]
    );
    return result.rows[0] || null;
}

/**
 * Récupère la vidéo la plus récente (triée par date_creation DESC, LIMIT 1)
 */
async function getLatestVideo() {
    const result = await pool.query(`
    SELECT v.id_video,
           v.titre,
           v.url_youtube,
           v.description,
           v.date_creation,
           v.date_modification,
           c.nom AS categorie,
           au.nom AS auteur_nom,
           au.prenom AS auteur_prenom
    FROM video v
    JOIN categorie c ON v.id_categorie = c.id_categorie
    JOIN auteur au ON v.id_auteur = au.id_auteur
    ORDER BY v.date_creation DESC
    LIMIT 1
  `);
    return result.rows[0] || null;
}

module.exports = {
    getAllVideos,
    createVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    getLatestVideo   // ← on exporte la nouvelle fonction
};

