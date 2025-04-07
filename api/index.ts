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

app.use(express.json());

// ROUTES DES RECETTES - CRUD
// tout le monde
app.get("/recipes", RecipesController.getAllRecipes);
app.get("/recipes/:id", RecipesController.getOneRecipe);
//app.get("/recipes/:name", RecipesController.getRecipeByName);

// Utilisateur connecté
app.post("/recipes", authenticateJWT, RecipesController.createRecipe);

// Seulement les personnes pour qui c'est sa recette + Admin
app.patch("/recipes/:id", authenticateJWT, authorizeResourceOwnerOrAdmin('recipe', 'userId'), RecipesController.updateRecipe);

// USer id et admin
app.delete("/recipes/:id", authenticateJWT, authorizeResourceOwnerOrAdmin('recipe', 'userId'), RecipesController.deleteRecipe);

// ROUTES USER
// Peut voir les user que si la personne est connecté
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