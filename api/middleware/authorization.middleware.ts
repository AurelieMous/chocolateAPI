import { Request, Response, NextFunction } from "express";

import {Prisma, PrismaClient} from "@prisma/client";

// Autorisation si Owner ou Admin pour les routes ayant besoin de sécurité
// On utilise les ressources pour éviter de recopier le code plusieurs fois pour les 3 ressources différentes (user, comment et recipe)
export function authorizeResourceOwnerOrAdmin(
    modelName: keyof PrismaClient,
    ownerField: string
) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const resourceId = parseInt(req.params.id);
        const { id, role } = req.body;

        if (!id) {
            return res.status(401).json({ message: 'Non authentifié' });
        }

        try {
            // Exemple : prisma.recipe.findUnique({ where: { id: recipeId } })
            const resource = await (Prisma[modelName] as any).findUnique({
                where: { id: resourceId },
                select: { [ownerField]: true },
            });

            if (!resource) {
                return res.status(404).json({ message: `${String(modelName)} non trouvé` });
            }

            const isOwner = resource[ownerField] === id;
            const isAdmin = role === 'admin';

            if (!isOwner && !isAdmin) {
                return res.status(403).json({ message: 'Accès interdit' });
            }

            next();
        } catch (error) {
            console.error(`[authorizeResourceOwnerOrAdmin] ${String(modelName)}`, error);
            res.status(500).json({ message: 'Erreur serveur' });
        }
    };
}

// Autorisation si la personne est seulement admin
export function authorizeAdmin(req: Request, res: Response, next: NextFunction) {
    const { id, role } = req.body;

    if (!id) {
        return res.status(401).json({ message: 'Non authentifié' });
    }

    if (role !== 'admin') {
        return res.status(403).json({ message: 'Accès réservé aux administrateurs' });
    }

    next();
}