
import {Request, Response} from "express";
import {CommentService} from "../service/comment.service";

class CommentController {

    private commentService: CommentService;
    constructor() {
        this.commentService = new CommentService();
    }

    // Récupère les comments via l'id de la recette
    getAllCommentsByRecipe = async (req: Request, res: Response) => {
        try {
            const recipeId = req.body;
            const comments = this.commentService.getAllCommentsByRecipe(recipeId);
            return res.status(200).json(comments);
        }
        catch (error) {
            res.status(500).json({"message": "Une erreur est survenue lors de la récupération des commentaires", error});
        }
    }

    getCommentByUser = async (req: Request, res: Response) => {
        try{
            const userId = req.body;
            const comments = this.commentService.getCommentByUser(userId);
            return res.status(200).json(comments);
        }
        catch (error) {
            res.status(500).json({"message": "Une erreur est survenue lors de la récupération des commentaires", error});
        }
    }

    updateComment = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            const data = req.body;
            const comment = this.commentService.updateComment(id, data);
            return res.status(200).json(comment);
        }catch (error) {
            return res.status(500).json({"message": "Une erreur est survenue lors de la modification du commentaire", error});
        }
    }

    deleteComment = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            const comment = this.commentService.deleteComment(id)
            return res.status(200).json(comment);
        }catch (error) {
            return res.status(500).json({"message": "Erreur lors de la suppression de commentaire", error});
        }
    }

    addComment = async (req: Request, res: Response) => {
        try {
            // Via le jeton JWT
            const { content, userId, recipeId } = req.body;
            const comment = this.commentService.createComment(content, userId, recipeId);
            return res.status(200).json(comment);
        }
        catch (error) {
            return res.status(500).json({"message": "Erreur lors de la création de commentaire", error});
        }
    }
}

export default new CommentController();