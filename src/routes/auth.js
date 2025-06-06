// src/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const router = express.Router();

/**
 * POST /api/login
 * Body attendu : { "password": "votreMotDePasse" }
 * - Compare avec le hash stocké en ENV
 * - Si ok, renvoie un JWT
 */
router.post('/', async (req, res) => {
    const { password } = req.body;
    if (!password) {
        return res.status(400).json({ error: 'Password is required' });
    }

    try {
        // On récupère le hash du mot de passe administrateur depuis les variables d’environnement
        const hash = process.env.ADMIN_PASSWORD_HASH;
        const match = await bcrypt.compare(password, hash);

        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Génère un token (ici, on encode juste le rôle "admin")
        const token = jwt.sign(
            { role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({ token });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
