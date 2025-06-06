// src/middleware/requireAuth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

function requireAuth(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = auth.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // Si besoin, vous pouvez attacher payload à req.user pour l’utiliser dans la route
        req.user = payload;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

module.exports = requireAuth;
