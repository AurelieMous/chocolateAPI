// ICI ON METS LES FONCTIONS DE GENERATION ET VERIFICATION DU TOKEN
import jwt from 'jsonwebtoken';

interface JwtUserPayload {
    id: number;
    email: string;
    role?: 'user' | 'admin';
}

const SECRET = process.env.JWT_SECRET || 'votre_clé_secrète';

export function generateToken(user: JwtUserPayload): string {
    return jwt.sign(user, SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string): JwtUserPayload {
    return jwt.verify(token, SECRET) as JwtUserPayload;
}
