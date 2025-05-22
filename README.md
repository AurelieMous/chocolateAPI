# 🍫 ChocolateAPI

**ChocolateAPI** est une API REST personnelle développée en **Node.js avec TypeScript**. Elle est conçue pour alimenter un blog de recettes de cuisine, avec un système d’authentification, de gestion de recettes, de commentaires, de notes, et de rôles utilisateur.

---

## 🚀 Fonctionnalités principales

- 🔐 **Authentification**

  - Création de compte (utilisateur ou admin)
  - Connexion sécurisée (JWT + bcrypt)
- 📚 **Gestion des recettes**

  - Créer, lire, mettre à jour, supprimer une recette (CRUD)
- ✍️ **Commentaires & notes**

  - Ajouter une note ou un commentaire sur une recette
  - Modifier ou supprimer son propre commentaire
- 👥 **Rôles & permissions**

  - **Utilisateurs** : peuvent consulter, commenter, noter
  - **Admins** : ont tous les droits (modération, suppression, etc.)
- ⚡️ **Performances & cache**

  - Utilisation de **Redis** pour optimiser les performances (mise en cache des recettes les plus consultées)

---

## 🛠️ Stack technique




| Techno         | Rôle                                  |
| -------------- | -------------------------------------- |
| Node.js        | Serveur backend                        |
| TypeScript     | Typage statique                        |
| Express        | Framework HTTP/API REST                |
| Axios          | Requêtes HTTP côté client/API       |
| PostgreSQL     | Base de données relationnelle         |
| Swagger        | Documentation API                      |
| Bcryptjs       | Hashing des mots de passe              |
| JSON Web Token | Authentification                       |
| Docker         | Conteneurisation du projet             |
| Jest           | Tests unitaires                        |
| Redis          | Cache pour améliorer les performances |

## 🧁 Auteur

**ChocolateAPI** a été conçu avec ❤️ par AurelieMous
