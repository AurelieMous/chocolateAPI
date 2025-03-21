import {RecipesService} from "../service/recipes.service";
import { Request, Response } from 'express';

class RecipesController {
    private recipesService: RecipesService

    constructor() {
        this.recipesService = new RecipesService();
    }

    getAllRecipes = async (_req: Request, res: Response) => {
        try {
            const recipes = await this.recipesService.getAllRecipes();
            return res.status(200).json(recipes);
        } catch (error) {
            console.error('[getAllRecipes]', error);
            return res.status(500).json({ message: 'Erreur serveur lors de la récupération des recettes.' });
        }
    }

    getOneRecipe = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            const recipe = await this.recipesService.getRecipeById(id);
            return res.status(200).json(recipe);
        } catch(error) {
            console.error('[getOneRecipe, req.params.id]', error);
            return res.status(500).json({ message: 'Erreur serveur lors de la récupération de la recette.' });
        }
    }

    deleteRecipe = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            const recipe = await this.recipesService.deleteRecipe(id);
            return res.status(200).json(recipe);
        } catch(error) {
            console.error('[getOneRecipe, req.params.id]', error);
            return res.status(500).json({ message: 'Erreur serveur lors de la récupération de la recette.' });
        }
    }

    updateRecipe = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            const recipe = await this.recipesService.updateRecipe(id, req.body);
            return res.status(200).json(recipe);
        }
        catch (error) {
            console.error('[updateRecipe, req.params.id]', error);
            return res.status(500).json({ message: 'Erreur serveur lors de la mise à jour.' });
        }
    }

    createRecipe = async (req: Request, res: Response) => {
        try{
            const recipe = await this.recipesService.createRecipe(req.body);
            return res.status(200).json(recipe);
        }
        catch (error) {
            console.error('[createRecipe, req.params.id]', error);
            return res.status(500).json({ message: 'Erreur serveur lors de la création d une recette.' });
        }
    }


}

export default new RecipesController();