import {Prisma, PrismaClient, Recipe} from '@prisma/client'

const prisma = new PrismaClient()

export class RecipesService {
    async getAllRecipes(): Promise<Recipe[]> {
        return prisma.recipe.findMany({
            include: {
                user: true,
                comments: true,
            },
        })
    }

    async getRecipeById(id: number): Promise<Recipe | null> {
        return prisma.recipe.findUnique({
            where: { id },
            include: {
                user: true,
                comments: true,
            },
        })
    }

    async createRecipe(data: {
        title: string
        description: string
        recipe: string
        userId: number
    }): Promise<Recipe> {
        return prisma.recipe.create({
            data: {
                title: data.title,
                description: data.description,
                recipe: data.recipe,
                user: {
                    connect: { id: data.userId },
                },
            },
        })
    }

    async deleteRecipe(id: number): Promise<Recipe> {
        return prisma.recipe.delete({where: { id: id }})
    }

    async updateRecipe(id: number, data: Prisma.RecipeUpdateInput): Promise<Recipe> {
        return prisma.recipe.update({
            where: { id },
            data,
        })
    }
}

export default new RecipesService();