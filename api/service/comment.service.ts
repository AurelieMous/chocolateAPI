import {Prisma, PrismaClient} from '@prisma/client'
import { Comment } from '@prisma/client';


const prisma = new PrismaClient()

export class CommentService {
    // On veut charger les commentaires par rapport à l'id d'une recette
    async getAllCommentsByRecipe(recipeId: number): Promise<Comment[]> {
        return prisma.comment.findMany({
            where: {
                recipeId: recipeId, // Permet de trier les commentaires avec le paramètre id de la recette
            },
            include: {
                user: true,
                recipe: false,
            },
        })
    }

    async getCommentByUser(userId: number): Promise<Comment[]> {
        return prisma.comment.findMany({
            where: {
                userId: userId,
            },
            include: {
                user: false,
                recipe: true,
            }
        })
    }

    // On passe l'id du commentaire
    async updateComment(id: number, data: Prisma.CommentUpdateInput): Promise<Comment> {
        return prisma.comment.update({
            where: { id },
            data
        })
    }
    async createComment(content: string, userId: number, recipeId: number): Promise<Comment> {
        return prisma.comment.create({
            data: {
                content: content,
                recipe: {
                    connect: { id: recipeId },
                },
                user: {
                    connect: { id: userId },
                },
            },
        });
    }

    async deleteComment(commentId: number): Promise<Comment> {
        return prisma.comment.delete({where : {id: commentId}})
    }
}

export default new CommentService();