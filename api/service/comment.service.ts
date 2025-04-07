import {Prisma, PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export class CommentService {
    // On veut charger les commentaires par rapport à l'id d'une recette
    async getAllComments(recipeId: number): Promise<Comment[]> {
        return prisma.comment.findMany({
            where: {
                recipeId: recipeId, // Permet de trier les commentaires avec le paramètre id de la recette
            },
            include: {
                user: true,
                recipe: true,
            },
        })
    }
    // On passe l'id du commentaire
    async updateComment(id: number, data: Prisma.CommentUpdateInput): Promise<Comment> {
        return prisma.comment.update({
            where: { id },
            data
        })
    }
    async createComment(input: {
        content: string,
        userId: number,
        recipeId: number
    }): Promise<Comment> {
        return prisma.comment.create({
            data: {
                content: input.content,
                recipe: {
                    connect: { id: input.recipeId },
                },
                user: {
                    connect: { id: input.userId },
                },
            },
        });
    }
    async deleteComment(commentId: number): Promise<Comment> {
        return prisma.comment.delete({where : {id: commentId}})
    }
}

export default new CommentService();