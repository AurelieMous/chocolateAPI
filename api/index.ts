import express from "express";
import RecipesController from "./controller/recipes.controller";
import UserController from "./controller/user.controller";
import AuthenticationController from "./controller/authentication.controller";
import CommentController from "./controller/comment.controller";
import {authenticateJWT} from "./middleware/authentication.middleware";
import {
    authorizeAdmin,
    authorizeResourceOwnerOrAdmin
} from "./middleware/authorization.middleware";

const port = 3000;
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

app.use(express.json());

// Configuration swagger
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Chocolate API',
        version: '1.0.0',
        description: 'Documentation générée automatiquement par Swagger pour Chocolate API.',
    },
    components: {
        // Ajout de la config pour les routes sécurisée
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [{ berarerAuth: [] }]
};

const options = {
    swaggerDefinition,
    apis: ['./index.ts'], // Où Swagger va chercher les commentaires JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

// Route de swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ROUTES DES RECETTES - CRUD
// tout le monde
/**
 * @openapi
 * /recipes:
 *   get:
 *     summary: Récupère toutes les recettes
 *     tags:
 *       - Recettes
 *     responses:
 *       200:
 *         description: Liste des recettes
 */
app.get("/recipes", RecipesController.getAllRecipes);

/**
 * @openapi
 * /recipes/{id}:
 *   get:
 *     summary: Récupère une recette par ID
 *     tags:
 *       - Recettes
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Recette trouvée
 *       404:
 *         description: Recette non trouvée
 */
app.get("/recipes/:id", RecipesController.getOneRecipe);

//app.get("/recipes/:name", RecipesController.getRecipeByName);

/**
 * @openapi
 * /recipes:
 *   post:
 *     summary: Ajout d'une recette (utilisateur connecté via JWT)
 *     tags:
 *       - Recettes
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - recipe
 *             properties:
 *               title:
 *                 type: string
 *                 example: Brownies au chocolat
 *               description:
 *                  type: string
 *                  exemple: Utilisez 2 ouefs, 150g de farine...
 *               recipe:
 *                  type: string
 *                  exemple: Allumer le four sur 180°C
 *     responses:
 *       201:
 *         description: Recette créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 tile:
 *                   type: string
 *                 description::
 *                   type: string
 *                 recipe:
 *                   type: string
 *                 createdAt:
 *                  type: string
 *                  format: date-time
 *                 userId:
 *                  type: integer
 *         401:
 *          description: Token manquant ou invalide
 *         403:
 *          description: Vous n'avez pas les droits nécéssaires
 *
 */
app.post("/recipes", authenticateJWT, RecipesController.createRecipe);

// Seulement les personnes pour qui c'est sa recette + Admin
app.patch("/recipes/:id", authenticateJWT, authorizeResourceOwnerOrAdmin('recipe', 'userId'), RecipesController.updateRecipe);

// USer id et admin
app.delete("/recipes/:id", authenticateJWT, authorizeResourceOwnerOrAdmin('recipe', 'userId'), RecipesController.deleteRecipe);

// ROUTES USER
// Peut voir les user que si la personne est connecté
/**
 * @openapi
 * /user:
 *   get:
 *     summary: Récupère tous les utilisateurs (authentification requise)
 *     tags:
 *       - Utilisateurs
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *       401:
 *         description: Token manquant ou invalide
 *       403:
 *         description: Non autorisé — droits insuffisants
 */
app.get("/user", authenticateJWT, UserController.getAllUsers);
app.get("/user/:id", authenticateJWT, UserController.getOneUser);

//Route pour l'admin (qui peut créer un user)
app.post("/user", authenticateJWT, authorizeAdmin, UserController.createUser);

// Par l'user id ou par l'admin
app.patch("/user/:id", authenticateJWT, authorizeResourceOwnerOrAdmin('user', 'id'),UserController.updateUser);

// Supprimer l'user, par l'user concerné ou l'admin
app.delete("/user/:id", authenticateJWT, authorizeResourceOwnerOrAdmin('user', 'id'), UserController.deleteUser);

// User id ou par l'admin
//app.delete("/user/:id"), UserController.deleteUser);

// ROUTES AUTHENTICATION
/**
 * @openapi
 * /login:
 *   post:
 *     summary: Authentification des utilisateurs
 *     tags:
 *       - Authentification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: monmotdepasse123
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Requête invalide (champs manquants ou mal formatés)
 *       401:
 *         description: Identifiants incorrects
 */
app.post("/login", AuthenticationController.login);
app.post("/register", AuthenticationController.register);

// ROUTES COMMENTAIRES
// app.get("/recipes/:id/comments", CommentController.getAllComments);
app.put("/comment/:id",authenticateJWT, authorizeResourceOwnerOrAdmin('comment', 'userId'), CommentController.updateComment);
app.delete("/comment/:id",authenticateJWT, authorizeResourceOwnerOrAdmin('comment', 'userId'), CommentController.deleteComment);
app.post("/comment",authenticateJWT, CommentController.addComment);

app.listen(port, () => {
    console.log(`🟢 ChocolateAPI fonctionne sur le port (${port})`);
});