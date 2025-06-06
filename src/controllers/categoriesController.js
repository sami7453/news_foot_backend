// src/controllers/categoriesController.js
const pool = require('../db');

/**
 * Récupère toutes les catégories triées par ID
 */
async function getAllCategories() {
    const result = await pool.query('SELECT * FROM categorie ORDER BY id_categorie');
    return result.rows;
}

/**
 * Crée une nouvelle catégorie avec le nom passé en paramètre
 * @param {string} nom
 * @returns {object} la catégorie insérée
 */
async function createCategory(nom) {
    const result = await pool.query(
        'INSERT INTO categorie (nom) VALUES ($1) RETURNING *',
        [nom]
    );
    return result.rows[0];
}

/**
 * Récupère une catégorie par son ID
 * @param {number} id
 * @returns {object|null} la catégorie ou null si non trouvée
 */
async function getCategoryById(id) {
    const result = await pool.query(
        'SELECT * FROM categorie WHERE id_categorie = $1',
        [id]
    );
    return result.rows[0] || null;
}

/**
 * Met à jour le nom d’une catégorie
 * @param {number} id
 * @param {string} nom
 * @returns {object|null} la catégorie mise à jour ou null si non trouvée
 */
async function updateCategory(id, nom) {
    const result = await pool.query(
        'UPDATE categorie SET nom = $1 WHERE id_categorie = $2 RETURNING *',
        [nom, id]
    );
    return result.rows[0] || null;
}

/**
 * Supprime une catégorie par son ID
 * @param {number} id
 * @returns {object|null} la catégorie supprimée ou null si non trouvée
 */
async function deleteCategory(id) {
    const result = await pool.query(
        'DELETE FROM categorie WHERE id_categorie = $1 RETURNING *',
        [id]
    );
    return result.rows[0] || null;
}

module.exports = {
    getAllCategories,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
};
