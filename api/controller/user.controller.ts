import {UserService} from "../service/user.service";
import {Request, Response} from "express";

class UserController {
    private userService : UserService;
    constructor() {
        this.userService = new UserService();
    }

    getAllUsers = async (_req: Request, res: Response) => {
        try{
            const users = this.userService.getAllUser();
            return res.status(200).json(users);
        }catch(err){
            console.error('Error in getAllUsers', err);
            return res.status(500).json(err);
        }

    }
}

export default new UserController();