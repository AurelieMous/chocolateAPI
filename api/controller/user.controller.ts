import {UserService} from "../service/user.service";
import {Request, Response} from "express";

class UserController {
    private userService : UserService;
    constructor() {
        this.userService = new UserService();
    }

    getAllUsers = async (_req: Request, res: Response) => {
        try{
            const users = await this.userService.getAllUser();
            const safeUsers = users.map(({ password, ...rest }) => rest);
            return res.status(200).json(safeUsers);
        }catch(err){
            console.error('Error in getAllUsers', err);
            return res.status(500).json(err);
        }
    }

    getOneUser = async (req: Request, res: Response) => {
        try{
            const id = parseInt(req.params.id);
            const user = await this.userService.getUserById(id);
            const { password, ...safeUser } = user;
            return res.status(200).json(safeUser);
        }
        catch(err){
            console.error('Error in getOneUser', err);
            return res.status(500).json(err);
        }
    }

    updateUser = async (req: Request, res: Response) => {
        try{
            const id = parseInt(req.params.id);
            const data = req.body;
            const user = await this.userService.updateUser(id, data);
            return res.status(200).json(user);
        }
        catch(err){
            console.error('Error in update User', err);
            return res.status(500).json(err);
        }
    }

    deleteUser = async (req: Request, res: Response) => {
        try{
            const id = parseInt(req.params.id);
            const user = await this.userService.deleteUser(id);
            return res.status(200).json(user);
        }
        catch(err){
            console.error('Error in delete user', err);
            return res.status(500).json(err);
        }
    }

    createUser = async (req: Request, res: Response) => {
        try{
            const data = req.body;
            const user = await this.userService.createUser(data);
            return res.status(200).json(user);
        }
        catch(err){
            console.error('Error in create user', err);
            return res.status(500).json(err);
        }
    }
}

export default new UserController();