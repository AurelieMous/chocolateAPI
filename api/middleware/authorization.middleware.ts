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
        const user = req.user;

        if (!user) {
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

            const isOwner = resource[ownerField] === user.id;
            const isAdmin = user.role === 'admin';

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

// Autorisation si la personne est seulement admin, pas besoin des ressources, juste vérifier le role
export function authorizeAdmin(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
        return res.status(401).json({ message: 'Non authentifié' });
    }

    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Accès réservé aux administrateurs' });
    }

    next();
}