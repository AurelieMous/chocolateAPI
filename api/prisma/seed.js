import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // 1. Création des utilisateurs
    const users = await prisma.user.createMany({
        data: [
            { email: "admin@exemple.com", name: "admin", role: "admin" },
            { email: 'alice@example.com', name: 'Alice', role: "user" },
            { email: 'bob@example.com', name: 'Bob', role: "user" },
            { email: 'carol@example.com', name: 'Carol', role: "user" },
        ],
    })

    // Récupérer les users avec leurs IDs
    const [alice, bob, carol] = await prisma.user.findMany()

    // 2. Création des recettes
    const recipes = await prisma.recipe.createMany({
        data: [
            {
                title: 'Tarte aux pommes',
                description: 'Une délicieuse tarte aux pommes maison',
                recipe: '1. Étaler la pâte 2. Ajouter les pommes 3. Cuire 30min',
                userId: alice.id,
            },
            {
                title: 'Pâtes à la carbonara',
                description: 'Recette italienne authentique',
                recipe: '1. Cuire les pâtes 2. Préparer la sauce 3. Mélanger',
                userId: bob.id,
            },
            {
                title: 'Salade César',
                description: 'Une salade fraîche et croquante',
                recipe: '1. Préparer la sauce 2. Ajouter les ingrédients 3. Servir froid',
                userId: carol.id,
            },
        ],
    })

    const [recipe1, recipe2, recipe3] = await prisma.recipe.findMany()

    // 3. Création des commentaires
    await prisma.comment.createMany({
        data: [
            {
                content: "J'adore cette tarte, elle est parfaite pour l'automne !",
                userId: bob.id,
                recipeId: recipe1.id,
            },
            {
                content: 'Recette simple et rapide, merci !',
                userId: carol.id,
                recipeId: recipe2.id,
            },
            {
                content: 'Très bon mais j’ai ajouté un peu de parmesan en plus :)',
                userId: alice.id,
                recipeId: recipe3.id,
            },
        ],
    })

    console.log('Seed terminé ✅')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(() => {
        prisma.$disconnect()
    })
