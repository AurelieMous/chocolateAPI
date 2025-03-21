# 🍫 ChocolateAPI

**ChocolateAPI** est une API REST personnelle développée en **Node.js avec TypeScript**. Elle est conçue pour alimenter un blog de recettes de cuisine, avec un système d’authentification, de gestion de recettes, de commentaires, de notes, et de rôles utilisateur.

---

## 🚀 Fonctionnalités principales

- 🔐 **Authentification**

  - Création de compte (utilisateur ou admin)
  - Connexion sécurisée (JWT + bcrypt)
- 📚 **Gestion des recettes**

  - Créer, lire, mettre à jour, supprimer une recette (CRUD)
  - Filtrer ou rechercher des recettes par titre, ingrédient, etc.
- ✍️ **Commentaires & notes**

  - Ajouter une note ou un commentaire sur une recette
  - Modifier ou supprimer son commentaire
- 👥 **Rôles & permissions**

  - **Utilisateurs** : peuvent consulter, commenter, noter
  - **Admins** : ont tous les droits (modération, suppression, etc.)
- ⚡️ **Performances & cache**

  - Utilisation de **Redis** pour optimiser les performances (mise en cache des recettes les plus consultées)

---

## 🛠️ Stack technique


| Techno         | Rôle                            |
| -------------- | -------------------------------- |
| Node.js        | Serveur backend                  |
| TypeScript     | Typage statique                  |
| Express        | Framework HTTP/API REST          |
| Axios          | Requêtes HTTP côté client/API |
| PostgreSQL     | Base de données relationnelle   |
| Redis          | Cache                            |
| Bcryptjs       | Hashing des mots de passe        |
| JSON Web Token | Authentification                 |
| Docker         | Conteneurisation du projet       |

---

## 🐳 Utilisation avec Docker

ChocolateAPI utilise Docker pour lancer l’API, PostgreSQL et Redis dans un environnement conteneurisé.

---

## 🧱 Routes prévues (à venir)


| Méthode | Route               | Accès     | Description                  |
| -------- | ------------------- | ---------- | ---------------------------- |
| POST     | `/auth/register`    | Public     | Créer un compte utilisateur |
| POST     | `/auth/login`       | Public     | Se connecter                 |
| GET      | `/recipes`          | Public     | Lister toutes les recettes   |
| GET      | `/recipes/:id`      | Public     | Détail d'une recette        |
| POST     | `/recipes`          | Admin/User | Créer une recette           |
| PUT      | `/recipes/:id`      | Admin/User | Modifier une recette         |
| DELETE   | `/recipes/:id`      | Admin      | Supprimer une recette        |
| POST     | `/recipes/:id/rate` | User       | Noter/commenter une recette  |

## 🧁 Auteur

**ChocolateAPI** a été conçu avec ❤️ par AurelieMous
