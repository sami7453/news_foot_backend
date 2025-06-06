// src/multerConfig.js
const multer = require('multer');
const path = require('path');

// Définir le répertoire de stockage et le nom de fichier pour les images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/'); // Répertoire où les images seront stockées
    },
    filename: (req, file, cb) => {
        // ex: article-1234567890.jpg
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        cb(null, `article-${timestamp}${ext}`);
    }
});

// Filtrer pour n’accepter que les images
function fileFilter(req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Seules les images (jpeg, png, gif) sont autorisées'));
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // max 5 Mo
});

module.exports = upload;
