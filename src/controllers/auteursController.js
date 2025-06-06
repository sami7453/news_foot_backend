// src/controllers/auteursController.js
const pool = require('../db');

async function getAllAuteurs() {
    const result = await pool.query('SELECT * FROM auteur ORDER BY id_auteur');
    return result.rows;
}

async function createAuteur({ nom, prenom }) {
    const result = await pool.query(
        'INSERT INTO auteur (nom, prenom) VALUES ($1, $2) RETURNING *',
        [nom, prenom]
    );
    return result.rows[0];
}

async function getAuteurById(id) {
    const result = await pool.query(
        'SELECT * FROM auteur WHERE id_auteur = $1',
        [id]
    );
    return result.rows[0] || null;
}

async function updateAuteur(id, { nom, prenom }) {
    const result = await pool.query(
        'UPDATE auteur SET nom = $1, prenom = $2 WHERE id_auteur = $3 RETURNING *',
        [nom, prenom, id]
    );
    return result.rows[0] || null;
}

async function deleteAuteur(id) {
    const result = await pool.query(
        'DELETE FROM auteur WHERE id_auteur = $1 RETURNING *',
        [id]
    );
    return result.rows[0] || null;
}

module.exports = {
    getAllAuteurs,
    createAuteur,
    getAuteurById,
    updateAuteur,
    deleteAuteur,
};
