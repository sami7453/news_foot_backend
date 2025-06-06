// src/controllers/articlesController.js
const pool = require('../db');

// 1. Récupérer tous les articles (avec jointure catégorie + auteur)
async function getAllArticles() {
    const result = await pool.query(`
    SELECT a.id_article,
           a.titre,
           a.contenu,
           a.image,
           a.date_creation,
           a.date_modification,
           c.nom AS categorie,
           au.nom AS auteur_nom,
           au.prenom AS auteur_prenom
    FROM article a
    JOIN categorie c ON a.id_categorie = c.id_categorie
    JOIN auteur au ON a.id_auteur = au.id_auteur
    ORDER BY a.date_creation DESC
  `);
    return result.rows;
}

// 2. Créer un nouvel article
async function createArticle({ id_categorie, id_auteur, titre, contenu, image }) {
    const result = await pool.query(
        `INSERT INTO article 
       (id_categorie, id_auteur, titre, contenu, image) 
     VALUES 
       ($1, $2, $3, $4, $5) 
     RETURNING *`,
        [id_categorie, id_auteur, titre, contenu, image]
    );
    return result.rows[0];
}

// 3. Récupérer un article par ID
async function getArticleById(id) {
    const result = await pool.query(`
    SELECT a.id_article,
           a.titre,
           a.contenu,
           a.image,
           a.date_creation,
           a.date_modification,
           c.nom AS categorie,
           au.nom AS auteur_nom,
           au.prenom AS auteur_prenom
    FROM article a
    JOIN categorie c ON a.id_categorie = c.id_categorie
    JOIN auteur au ON a.id_auteur = au.id_auteur
    WHERE a.id_article = $1
  `, [id]);
    return result.rows[0] || null;
}

// 4. Mettre à jour un article
async function updateArticle(id, { id_categorie, id_auteur, titre, contenu, image }) {
    const result = await pool.query(
        `UPDATE article
     SET id_categorie      = $1,
         id_auteur         = $2,
         titre             = $3,
         contenu           = $4,
         image             = $5,
         date_modification = CURRENT_TIMESTAMP
     WHERE id_article = $6
     RETURNING *`,
        [id_categorie, id_auteur, titre, contenu, image, id]
    );
    return result.rows[0] || null;
}

// 5. Supprimer un article
async function deleteArticle(id) {
    const result = await pool.query(
        'DELETE FROM article WHERE id_article = $1 RETURNING *',
        [id]
    );
    return result.rows[0] || null;
}

async function searchArticles(searchTerm) {
    const query = `
    SELECT a.id_article,
           a.titre,
           a.contenu,
           a.image,
           a.date_creation,
           a.date_modification,
           c.nom AS categorie,
           au.nom AS auteur_nom,
           au.prenom AS auteur_prenom
    FROM article a
    JOIN categorie c ON a.id_categorie = c.id_categorie
    JOIN auteur au ON a.id_auteur = au.id_auteur
    WHERE a.titre ILIKE $1
       OR a.contenu ILIKE $1
    ORDER BY a.date_creation DESC
  `;
    // On enveloppe searchTerm dans %…% pour faire un LIKE partiel
    const values = [`%${searchTerm}%`];
    const result = await pool.query(query, values);
    return result.rows;
}

async function getArticlesByAuthor(authorId) {
    const query = `
    SELECT a.id_article,
           a.titre,
           a.contenu,
           a.image,
           a.date_creation,
           a.date_modification,
           c.nom AS categorie,
           au.nom AS auteur_nom,
           au.prenom AS auteur_prenom
    FROM article a
    JOIN categorie c ON a.id_categorie = c.id_categorie
    JOIN auteur au ON a.id_auteur = au.id_auteur
    WHERE a.id_auteur = $1
    ORDER BY a.date_creation DESC
  `;
    const result = await pool.query(query, [authorId]);
    return result.rows;
}

module.exports = {
    getAllArticles,
    createArticle,
    getArticleById,
    updateArticle,
    deleteArticle,
    searchArticles,
    getArticlesByAuthor
};
