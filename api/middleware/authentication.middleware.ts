import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {AuthenticatedUserPayload} from "../auth/authenticate";

const SECRET_KEY = process.env.JWT_SECRET || 'secret';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token manquant' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as AuthenticatedUserPayload;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token invalide' });
    }
};
