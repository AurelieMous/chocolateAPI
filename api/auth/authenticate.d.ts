import {Role} from "@prisma/client";

export interface AuthenticatedUserPayload {
    id: number;
    email: string;
    name?: string;
    role?: Role;
    isVerified?: boolean;
    iat?: number;
    exp?: number;
}