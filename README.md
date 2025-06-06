# API Backend – Documentation pour le Front‑End

**Base URL**

```
https://newsfootbackend-production.up.railway.app
```

---

## Table des matières

1. [Authentification](#authentification)
2. [Catégories](#categories)
3. [Auteurs](#auteurs)
4. [Articles](#articles)

   * [Lister tous les articles](#lister-tous-les-articles)
   * [Rechercher des articles (LIKE)](#rechercher-des-articles-like)
   * [Lister les articles d’un auteur](#lister-les-articles-dun-auteur)
   * [Récupérer un article par ID](#recuperer-un-article-par-id)
   * [Créer un article (upload d’image)](#creer-un-article-upload-dimage)
   * [Mettre à jour un article](#mettre-a-jour-un-article)
   * [Supprimer un article](#supprimer-un-article)
5. [Vidéos](#videos)

   * [Lister toutes les vidéos](#lister-toutes-les-videos)
   * [Récupérer la dernière vidéo](#recuperer-la-derniere-video)
   * [Récupérer une vidéo par ID](#recuperer-une-video-par-id)
   * [Créer une vidéo](#creer-une-video)
   * [Mettre à jour une vidéo](#mettre-a-jour-une-video)
   * [Supprimer une vidéo](#supprimer-une-video)

---

## Authentification

### 1. Login (obtenir un JWT)

* **URL** :

  ```
  POST /api/login
  ```
* **Headers** :

  ```
  Content-Type: application/json
  ```
* **Body (JSON)** :

  ```json
  {
    "password": "votreMotDePasseAdmin"
  }
  ```
* **Réponse** (200) :

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.…"
  }
  ```

  * `token` : JSON Web Token à inclure dans `Authorization: Bearer <token>` pour tous les endpoints protégés.
* **Erreurs possibles** :

  * 400 si `password` manquant
  * 401 si mot de passe invalide

---

## Catégories

> **Note** : Les routes Catégories ne nécessitent pas d’authentification.

### 2. Lister toutes les catégories

* **URL** :

  ```
  GET /api/categories
  ```
* **Headers** :
  Aucun spécifique.
* **Réponse** (200) :

  ```json
  [

    { "id_categorie": 1, "nom": "foot pro" },
    { "id_categorie": 2, "nom": "foot amateur" },
    { "id_categorie": 3, "nom": "news" },
    { "id_categorie": 4, "nom": "video" }
  ]
  ```

### 3. Créer une catégorie

* **URL** :

  ```
  POST /api/categories
  ```
* **Headers** :

  ```
  Content-Type: application/json
  Authorization: Bearer <token>
  ```
* **Body (JSON)** :

  ```json
  {
    "nom": "nouvelle catégorie"
  }
  ```
* **Réponse** (201) :

  ```json
  {
    "id_categorie": 5,
    "nom": "nouvelle catégorie"
  }
  ```
* **Erreurs possibles** :

  * 400 si `nom` manquant
  * 409 si la catégorie existe déjà

### 4. Récupérer une catégorie par ID

* **URL** :

  ```
  GET /api/categories/:id
  ```
* **Exemple** :

  ```
  GET /api/categories/3
  ```
* **Headers** :
  Aucun spécifique.
* **Réponse** (200) :

  ```json
  {
    "id_categorie": 3,
    "nom": "foot pro"
  }
  ```
* **Erreurs possibles** :

  * 404 si la catégorie n’existe pas

### 5. Mettre à jour une catégorie

* **URL** :

  ```
  PUT /api/categories/:id
  ```
* **Exemple** :

  ```
  PUT /api/categories/3
  ```
* **Headers** :

  ```
  Content-Type: application/json
  Authorization: Bearer <token>
  ```
* **Body (JSON)** :

  ```json
  {
    "nom": "foot professionnel"
  }
  ```
* **Réponse** (200) :

  ```json
  {
    "id_categorie": 3,
    "nom": "foot professionnel"
  }
  ```
* **Erreurs possibles** :

  * 400 si `nom` manquant
  * 404 si la catégorie n’existe pas
  * 409 si le nouveau nom existe déjà

### 6. Supprimer une catégorie

* **URL** :

  ```
  DELETE /api/categories/:id
  ```
* **Exemple** :

  ```
  DELETE /api/categories/3
  ```
* **Headers** :

  ```
  Authorization: Bearer <token> 
  ```
* **Réponse** (200) :

  ```json
  {
    "message": "Catégorie supprimée."
  }
  ```
* **Erreurs possibles** :

  * 404 si la catégorie n’existe pas
  * 409 si des articles ou vidéos sont encore liés à cette catégorie

---

## Auteurs

> **Note** : Les routes Auteurs ne nécessitent pas d’authentification par défaut, mais vous pouvez les protéger selon votre choix.

### 7. Lister tous les auteurs

* **URL** :

  ```
  GET /api/auteurs
  ```
* **Headers** :
  Aucun spécifique.
* **Réponse** (200) :

  ```json
  [
    { "id_auteur": 1, "nom": "Dupont", "prenom": "Jean" },
    { "id_auteur": 2, "nom": "Martin", "prenom": "Marie" },
    { "id_auteur": 3, "nom": "Durant", "prenom": "Paul" }
  ]
  ```

### 8. Créer un auteur

* **URL** :

  ```
  POST /api/auteurs
  ```
* **Headers** :

  ```
  Content-Type: application/json
  Authorization: Bearer <token>  
  ```
* **Body (JSON)** :

  ```json
  {
    "nom": "NomAuteur",
    "prenom": "PrenomAuteur"
  }
  ```
* **Réponse** (201) :

  ```json
  {
    "id_auteur": 4,
    "nom": "NomAuteur",
    "prenom": "PrenomAuteur"
  }
  ```
* **Erreurs possibles** :

  * 400 si `nom` ou `prenom` manquant

### 9. Récupérer un auteur par ID

* **URL** :

  ```
  GET /api/auteurs/:id
  ```
* **Exemple** :

  ```
  GET /api/auteurs/2
  ```
* **Headers** :
  Aucun spécifique.
* **Réponse** (200) :

  ```json
  {
    "id_auteur": 2,
    "nom": "Martin",
    "prenom": "Marie"
  }
  ```
* **Erreurs possibles** :

  * 404 si l’auteur n’existe pas

### 10. Mettre à jour un auteur

* **URL** :

  ```
  PUT /api/auteurs/:id
  ```
* **Exemple** :

  ```
  PUT /api/auteurs/2
  ```
* **Headers** :

  ```
  Content-Type: application/json
  Authorization: Bearer <token>  
  ```
* **Body (JSON)** :

  ```json
  {
    "nom": "NouveauNom",
    "prenom": "NouveauPrenom"
  }
  ```
* **Réponse** (200) :

  ```json
  {
    "id_auteur": 2,
    "nom": "NouveauNom",
    "prenom": "NouveauPrenom"
  }
  ```
* **Erreurs possibles** :

  * 400 si `nom` ou `prenom` manquant
  * 404 si l’auteur n’existe pas

### 11. Supprimer un auteur

* **URL** :

  ```
  DELETE /api/auteurs/:id
  ```
* **Exemple** :

  ```
  DELETE /api/auteurs/2
  ```
* **Headers** :

  ```
  Authorization: Bearer <token>  
  ```
* **Réponse** (200) :

  ```json
  {
    "message": "Auteur supprimé."
  }
  ```
* **Erreurs possibles** :

  * 404 si l’auteur n’existe pas
  * 409 si cet auteur est encore référencé par des articles ou vidéos

---

## Articles

> **Note** : Les routes Articles doivent être protégées par JWT (via `Authorization: Bearer <token>`).

### 12. Lister tous les articles

* **URL** :

  ```
  GET /api/articles
  ```
* **Headers** :

  ```
  Authorization: Bearer <token>
  ```
* **Réponse** (200) :

  ```json
  [
    {
      "id_article": 1,
      "titre": "Les transferts du mercato d’été",
      "contenu": "Le mercato d’été 2025 bat son plein…",
      "image": "uploads/ancien-mercato.jpg",
      "date_creation": "2025-06-01T12:34:56.000Z",
      "date_modification": "2025-06-01T12:34:56.000Z",
      "categorie": "news",
      "auteur_nom": "Dupont",
      "auteur_prenom": "Jean"
    },
    … (autres articles)
  ]
  ```

---

### 13. Rechercher des articles (LIKE sur titre et contenu)

* **URL** :

  ```
  GET /api/articles/search?query=<terme>
  ```
* **Exemple** :

  ```
  GET /api/articles/search?query=mercato
  ```
* **Headers** :

  ```
  Authorization: Bearer <token>
  ```
* **Réponse** (200) :

  ```json
  [
    {
      "id_article": 1,
      "titre": "Les transferts du mercato d’été",
      "contenu": "Le mercato d’été 2025 bat son plein…",
      "image": "uploads/ancien-mercato.jpg",
      "date_creation": "2025-06-01T12:34:56.000Z",
      "date_modification": "2025-06-01T12:34:56.000Z",
      "categorie": "news",
      "auteur_nom": "Dupont",
      "auteur_prenom": "Jean"
    },
    … (articles dont le titre OU le contenu contient “mercato”)
  ]
  ```
* **Erreurs possibles** :

  * 400 si `query` manquant ou vide

---

### 14. Lister les articles d’un auteur

* **URL** :

  ```
  GET /api/articles/author/:id
  ```
* **Exemple** :

  ```
  GET /api/articles/author/2
  ```
* **Headers** :

  ```
  Authorization: Bearer <token>
  ```
* **Réponse** (200) :

  ```json
  [
    {
      "id_article": 3,
      "titre": "Portrait d’un gardien amateur passionné",
      "contenu": "Rencontre avec Julien…",
      "image": "uploads/gardien-st-martin.jpg",
      "date_creation": "2025-06-02T14:22:11.000Z",
      "date_modification": "2025-06-02T14:22:11.000Z",
      "categorie": "foot amateur",
      "auteur_nom": "Martin",
      "auteur_prenom": "Marie"
    },
    … (autres articles de l’auteur 2)
  ]
  ```
* **Erreurs possibles** :

  * 400 si `:id` n’est pas un entier

---

### 15. Récupérer un article par ID

* **URL** :

  ```
  GET /api/articles/:id
  ```
* **Exemple** :

  ```
  GET /api/articles/1
  ```
* **Headers** :

  ```
  Authorization: Bearer <token>
  ```
* **Réponse** (200) :

  ```json
  {
    "id_article": 1,
    "titre": "Les transferts du mercato d’été",
    "contenu": "Le mercato d’été 2025 bat son plein…",
    "image": "uploads/ancien-mercato.jpg",
    "date_creation": "2025-06-01T12:34:56.000Z",
    "date_modification": "2025-06-01T12:34:56.000Z",
    "categorie": "news",
    "auteur_nom": "Dupont",
    "auteur_prenom": "Jean"
  }
  ```
* **Erreurs possibles** :

  * 404 si l’article n’existe pas

---

### 16. Créer un article (upload d’image)

* **URL** :

  ```
  POST /api/articles
  ```

* **Headers** :

  ```
  Authorization: Bearer <token>
  Content-Type: multipart/form-data
  ```

* **Body (form-data)** :

  | Clé            | Valeur                                         | Type |
  | -------------- | ---------------------------------------------- | ---- |
  | `id_categorie` | `2`                                            | text |
  | `id_auteur`    | `1`                                            | text |
  | `titre`        | `Premier article foot`                         | text |
  | `contenu`      | `Voici le contenu de l’article…`               | text |
  | `image`        | Sélectionner un fichier image (`.jpg`, `.png`) | file |

* **Réponse** (201) :

  ```json
  {
    "id_article": 9,
    "id_categorie": 2,
    "id_auteur": 1,
    "titre": "Premier article foot",
    "contenu": "Voici le contenu de l’article…",
    "image": "uploads/article-1685884123456.jpg",
    "date_creation": "2025-06-06T10:15:00.000Z",
    "date_modification": "2025-06-06T10:15:00.000Z"
  }
  ```

* **Erreurs possibles** :

  * 400 si l’un des champs obligatoires (hors `image` géré par Multer) manque
  * 400 si Multer rejette le fichier (type non autorisé, taille trop grande…)
  * 400 si `id_categorie` ou `id_auteur` invalide (FK non existante)

---

### 17. Mettre à jour un article

* **URL** :

  ```
  PUT /api/articles/:id
  ```

* **Exemple** :

  ```
  PUT /api/articles/9
  ```

* **Headers** :

  ```
  Authorization: Bearer <token>
  Content-Type: multipart/form-data
  ```

* **Scénarios possibles** :

  1. **Sans changer la photo**

     * Ne pas inclure de nouveau fichier `image`.
     * Ajouter un champ texte `imageAncienne` contenant le chemin enregistré précédemment (e.g. `uploads/article-1685884123456.jpg`).

  2. **Avec nouvelle photo**

     * Inclure le fichier sous la clé `image`.
     * Ne pas envoyer `imageAncienne`.

* **Body (form-data) – Exemple sans nouvelle photo** :

  | Clé             | Valeur                               | Type |
  | --------------- | ------------------------------------ | ---- |
  | `id_categorie`  | `3`                                  | text |
  | `id_auteur`     | `2`                                  | text |
  | `titre`         | `Titre modifié`                      | text |
  | `contenu`       | `Contenu mis à jour pour l’article.` | text |
  | `imageAncienne` | `uploads/article-1685884123456.jpg`  | text |

* **Body (form-data) – Exemple avec nouvelle photo** :

  | Clé            | Valeur                                           | Type |
  | -------------- | ------------------------------------------------ | ---- |
  | `id_categorie` | `3`                                              | text |
  | `id_auteur`    | `2`                                              | text |
  | `titre`        | `Titre modifié`                                  | text |
  | `contenu`      | `Contenu mis à jour pour l’article.`             | text |
  | `image`        | Sélectionner un nouveau fichier (`.jpg`, `.png`) | file |

* **Réponse** (200) :

  ```json
  {
    "id_article": 9,
    "id_categorie": 3,
    "id_auteur": 2,
    "titre": "Titre modifié",
    "contenu": "Contenu mis à jour pour l’article.",
    "image": "uploads/article-1685884127890.jpg",   // ou l’ancienne si non changée
    "date_creation": "2025-06-06T10:15:00.000Z",
    "date_modification": "2025-06-06T11:00:00.000Z"
  }
  ```

* **Erreurs possibles** :

  * 400 si un champ obligatoire manque ou `imageAncienne` absent lorsque nécessaire
  * 404 si l’article n’existe pas
  * 400 si FK invalide (`id_categorie` ou `id_auteur`)

---

### 18. Supprimer un article

* **URL** :

  ```
  DELETE /api/articles/:id
  ```
* **Exemple** :

  ```
  DELETE /api/articles/9
  ```
* **Headers** :

  ```
  Authorization: Bearer <token>
  ```
* **Réponse** (200) :

  ```json
  {
    "message": "Article supprimé."
  }
  ```
* **Erreurs possibles** :

  * 404 si l’article n’existe pas

---

## Vidéos

> **Note** : Les routes Vidéos doivent être protégées par JWT (via `Authorization: Bearer <token>`).

### 19. Lister toutes les vidéos

* **URL** :

  ```
  GET /api/videos
  ```
* **Headers** :

  ```
  Authorization: Bearer <token>
  ```
* **Réponse** (200) :

  ```json
  [
    {
      "id_video": 1,
      "titre": "Top 10 dribbles de la semaine",
      "url_youtube": "https://www.youtube.com/watch?v=ABCDEFG1234",
      "description": "Compilation des meilleurs dribbles vus…",
      "date_creation": "2025-06-02T09:45:00.000Z",
      "date_modification": "2025-06-02T09:45:00.000Z",
      "categorie": "video du lundi",
      "auteur_nom": "Dupont",
      "auteur_prenom": "Jean"
    },
    … (autres vidéos)
  ]
  ```

### 20. Récupérer la dernière vidéo (la plus récente)

* **URL** :

  ```
  GET /api/videos/latest
  ```
* **Headers** :

  ```
  Authorization: Bearer <token>
  ```
* **Réponse** (200) :

  ```json
  {
    "id_video": 2,
    "titre": "Résumé : Lyon vs Bayern Munich",
    "url_youtube": "https://www.youtube.com/watch?v=HIJKLMN5678",
    "description": "Revivez les temps forts…",
    "date_creation": "2025-06-05T16:30:00.000Z",
    "date_modification": "2025-06-05T16:30:00.000Z",
    "categorie": "foot pro",
    "auteur_nom": "Durant",
    "auteur_prenom": "Paul"
  }
  ```
* **Erreurs possibles** :

  * 404 si aucune vidéo n’existe

### 21. Récupérer une vidéo par ID

* **URL** :

  ```
  GET /api/videos/:id
  ```
* **Exemple** :

  ```
  GET /api/videos/1
  ```
* **Headers** :

  ```
  Authorization: Bearer <token>
  ```
* **Réponse** (200) :

  ```json
  {
    "id_video": 1,
    "titre": "Top 10 dribbles de la semaine",
    "url_youtube": "https://www.youtube.com/watch?v=ABCDEFG1234",
    "description": "Compilation des meilleurs dribbles vus…",
    "date_creation": "2025-06-02T09:45:00.000Z",
    "date_modification": "2025-06-02T09:45:00.000Z",
    "categorie": "video du lundi",
    "auteur_nom": "Dupont",
    "auteur_prenom": "Jean"
  }
  ```
* **Erreurs possibles** :

  * 404 si la vidéo n’existe pas

### 22. Créer une vidéo

* **URL** :

  ```
  POST /api/videos
  ```
* **Headers** :

  ```
  Content-Type: application/json
  Authorization: Bearer <token>
  ```
* **Body (JSON)** :

  ```json
  {
    "id_categorie": 4,
    "id_auteur": 1,
    "titre": "Nouvelle vidéo Foot",
    "url_youtube": "https://www.youtube.com/watch?v=XYZ123",
    "description": "Description de la vidéo de test."
  }
  ```
* **Réponse** (201) :

  ```json
  {
    "id_video": 3,
    "id_categorie": 4,
    "id_auteur": 1,
    "titre": "Nouvelle vidéo Foot",
    "url_youtube": "https://www.youtube.com/watch?v=XYZ123",
    "description": "Description de la vidéo de test.",
    "date_creation": "2025-06-06T11:00:00.000Z",
    "date_modification": "2025-06-06T11:00:00.000Z"
  }
  ```
* **Erreurs possibles** :

  * 400 si champs obligatoires manquants (`id_categorie`, `id_auteur`, `titre`, `url_youtube`)
  * 400 si `id_categorie` ou `id_auteur` invalide

### 23. Mettre à jour une vidéo

* **URL** :

  ```
  PUT /api/videos/:id
  ```
* **Exemple** :

  ```
  PUT /api/videos/3
  ```
* **Headers** :

  ```
  Content-Type: application/json
  Authorization: Bearer <token>
  ```
* **Body (JSON)** :

  ```json
  {
    "id_categorie": 3,
    "id_auteur": 2,
    "titre": "Titre vidéo modifié",
    "url_youtube": "https://www.youtube.com/watch?v=ABC789",
    "description": "Description mise à jour."
  }
  ```
* **Réponse** (200) :

  ```json
  {
    "id_video": 3,
    "id_categorie": 3,
    "id_auteur": 2,
    "titre": "Titre vidéo modifié",
    "url_youtube": "https://www.youtube.com/watch?v=ABC789",
    "description": "Description mise à jour.",
    "date_creation": "2025-06-06T11:00:00.000Z",
    "date_modification": "2025-06-06T11:30:00.000Z"
  }
  ```
* **Erreurs possibles** :

  * 400 si champs obligatoires manquants
  * 404 si la vidéo n’existe pas
  * 400 si FK invalide (`id_categorie` ou `id_auteur`)

### 24. Supprimer une vidéo

* **URL** :

  ```
  DELETE /api/videos/:id
  ```
* **Exemple** :

  ```
  DELETE /api/videos/3
  ```
* **Headers** :

  ```
  Authorization: Bearer <token>
  ```
* **Réponse** (200) :

  ```json
  {
    "message": "Vidéo supprimée."
  }
  ```
* **Erreurs possibles** :

  * 404 si la vidéo n’existe pas

---

## Notes complémentaires

* **Gestion du dossier `uploads/`**

  * Les images d’articles sont accessibles via :

    ```
    https://newsfootbackend-production.up.railway.app/src/uploads/<nom_du_fichier.jpg>
    ```
  * Assurez‑vous de toujours stocker en base le chemin relatif retourné par Multer (`uploads/...`).

* **Environnements (développement vs production)**

  * En local, utilisez `http://localhost:4000`.
  * En production, utilisez `https://newsfootbackend-production.up.railway.app`.

* **Ordre d’appel pour un CRUD Article fluide**

  1. Appeler `GET /api/auteurs` (alimenter un dropdown ou typeahead).
  2. Si l’auteur n’existe pas, appeler `POST /api/auteurs { nom, prenom }`.
  3. Dans le formulaire d’article, envoyer `id_auteur` → appeler `POST /api/articles` avec form-data (incluant `image`).
  4. Pour modifier un article sans changer la photo, envoyer `imageAncienne` + autres champs via `PUT /api/articles/:id`.

* **JWT : gestion de l’authentification**

  * Obtenez un token en appelant `POST /api/login { "password": "..." }`.
  * Incluez ensuite dans chaque requête protégée :

    ```
    Authorization: Bearer <token>
    ```

---

### Exemple rapide d’utilisation dans Postman

1. **Login**

   * `POST https://newsfootbackend-production.up.railway.app/api/login`
   * Body (JSON) :

     ```json
     { "password": "tonMotDePasseAdmin" }
     ```

2. **Créer un auteur**

   * `POST https://newsfootbackend-production.up.railway.app/api/auteurs`
   * Headers :

     ```
     Authorization: Bearer <token>
     Content-Type: application/json
     ```
   * Body :

     ```json
     { "nom": "Dupond", "prenom": "Alice" }
     ```

3. **Créer une catégorie**

   * `POST https://newsfootbackend-production.up.railway.app/api/categories`
   * Headers :

     ```
     Authorization: Bearer <token>
     Content-Type: application/json
     ```
   * Body :

     ```json
     { "nom": "test catégorie" }
     ```

4. **Créer un article (avec upload)**

   * `POST https://newsfootbackend-production.up.railway.app/api/articles`
   * Headers :

     ```
     Authorization: Bearer <token>
     Content-Type: multipart/form-data
     ```
   * Form-data :

     * `id_categorie` = `1`
     * `id_auteur`    = `1`
     * `titre`        = `Mon titre d’article`
     * `contenu`      = `Le contenu détaillé…`
     * `image` (file) = **choisissez un fichier image**

5. **Lister les articles**

   * `GET https://newsfootbackend-production.up.railway.app/api/articles`
   * Headers :

     ```
     Authorization: Bearer <token>
     ```

6. **Rechercher des articles**

   * `GET https://newsfootbackend-production.up.railway.app/api/articles/search?query=mercato`
   * Headers :

     ```
     Authorization: Bearer <token>
     ```

7. **Lister les vidéos**

   * `GET https://newsfootbackend-production.up.railway.app/api/videos`
   * Headers :

     ```
     Authorization: Bearer <token>
     ```

8. **Récupérer la dernière vidéo**

   * `GET https://newsfootbackend-production.up.railway.app/api/videos/latest`
   * Headers :

     ```
     Authorization: Bearer <token>
     ```


