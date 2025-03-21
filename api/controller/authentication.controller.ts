import {UserService} from "../service/user.service";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

class AuthenticationController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body

        try {
            const user = await this.userService.getUserByEmail(email)

            if (!user) {
                return res.status(401).json({ message: "Email incorrect ou utilisateur non trouvé" })
            }

            const isValid = await bcrypt.compare(password, user.password)

            if (!isValid) {
                return res.status(401).json({ message: "Mot de passe incorrect" })
            }

            const { password: _, ...safeUser } = user
            return res.status(200).json(safeUser)

        } catch (err) {
            console.error('Erreur lors du login', err)
            return res.status(500).json({ message: "Erreur serveur" })
        }
    }

    register = async (req: Request, res: Response) => {
        const {name, email, password} = req.body;
        const newUser = await this.userService.createUser({name, email, password});
    }
}

export default new AuthenticationController();