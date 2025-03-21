import express from "express";
import RecipesController from "./controller/recipes.controller";
import UserController from "./controller/user.controller";
import AuthenticationController from "./controller/authentication.controller";

const port = 3000;
const app = express();

app.use(express.json());

// ROUTES DES RECETTES - CRUD
// tout le monde
app.get("/recipes", RecipesController.getAllRecipes);
app.get("/recipes/:id", RecipesController.getOneRecipe);
//app.get("/recipes/:name", RecipesController.getRecipeByName);

// Utilisateur connecté
app.post("/recipes", RecipesController.createRecipe);

// Seulement les personnes pour qui c'est sa recette + Admin
app.patch("/recipes/:id", RecipesController.updateRecipe);

// USer id et admin
app.delete("/recipes/:id", RecipesController.deleteRecipe);

// ROUTES USER
// Admin
app.get("/user", UserController.getAllUsers);
// Tout le monde
app.get("/user/:id", UserController.getOneUser);

//Route pour l'admin (qui peut créer un user)
app.post("/user", UserController.createUser);

// Par l'user id ou par l'admin
app.patch("/user/:id", UserController.updateUser);

// User id ou par l'admin
//app.delete("/user/:id"), UserController.deleteUser);

// ROUTES AUTHENTICATION
app.post("/login", AuthenticationController.login);
app.post("/register", AuthenticationController.register);

// ROUTES COMMENTAIRES

app.listen(port, () => {
    console.log(`🟢 ChocolateAPI fonctionne sur le port (${port})`);
});