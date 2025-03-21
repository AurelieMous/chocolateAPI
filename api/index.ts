import express, { Request, Response} from "express";
import RecipesController from "./controller/recipes.controller";

const port = 3000;
const app = express();

app.use(express.json());

// Route des recettes
app.get("/recipes", RecipesController.getAllRecipes);
app.get("/recipes/:id", RecipesController.getOneRecipe);
//app.get("/recipes/:name", RecipesController.getRecipeByName);

// Créer une recette
app.post("/recipes", RecipesController.createRecipe);

// Modifier (admin et le créateur de la recette) - Ajouter un middleware pour controler les droits
app.patch("/recipes/:id", RecipesController.updateRecipe);

// Modifier (admin et le créateur de la recette) - Ajouter un middleware pour controler les droits
app.delete("/recipes/:id", RecipesController.deleteRecipe);

// Route de l'authentification


// Route pour les commentaires

app.listen(port, () => {
    console.log(`🟢 ChocolateAPI fonctionne sur le port (${port})`);
});