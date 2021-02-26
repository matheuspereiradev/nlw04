import {Router} from 'express';
import { UserController } from './controller/userController';
import {Request,Response} from 'express'


const routes = Router();
const userController = new UserController();

routes.get('/users',(req:Request,res:Response)=>{res.json({"mensagem":"oi"})});
routes.post('/users',userController.create)


export {routes};