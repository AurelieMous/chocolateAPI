import {Prisma, PrismaClient, User} from '@prisma/client'
import bcrypt from 'bcrypt';

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

    async getUserById(id: number): Promise<User> {
        return prisma.user.findUnique({
            where: { id },
            include: {
                recipes: true,
                comments: true,
            },
        })
    }

    async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
        return prisma.user.update({
            where: { id },
            data,
        })
    }

    async deleteUser(id: number): Promise<User> {
        return prisma.user.delete({where: { id: id }})
    }

    async createUser(data: {
        email: string,
        password: string,
        name: string,
    }): Promise<User> {
        const hashedPassword = await bcrypt.hash(data.password, 10)

        return prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                name: data.name,
            },
        })
    }
}

export default new UserService()