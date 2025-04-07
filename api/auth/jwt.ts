// ICI ON METS LES FONCTIONS DE GENERATION ET VERIFICATION DU TOKEN
import jwt from 'jsonwebtoken';
import {Role} from "@prisma/client";

interface JwtUserPayload {
    id: number;
    email: string;
    role?: Role;
    name: string;
    isVerified: boolean;
}

const SECRET = process.env.JWT_SECRET;

export function generateToken(user: JwtUserPayload): string {
    return jwt.sign(user, SECRET, { expiresIn: '1h' });
}

