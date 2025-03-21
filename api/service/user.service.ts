import {Prisma, PrismaClient, Recipe, User} from '@prisma/client'

const prisma = new PrismaClient()

export class UserService {
    async getAllUser(): Promise<User[]> {
        return prisma.user.findMany({
            include: {
                recipes: true,
                comments: true,
            },
        })
    }
}

export default new UserService()