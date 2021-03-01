import {Router} from 'express';
import { UserController } from './controller/UserController';
import {Request,Response} from 'express'
import { SurveyController } from './controller/SurveyController';


const routes = Router();
const userController = new UserController();
const surveyController = new SurveyController();

routes.get('/healthz',(req:Request,res:Response)=>{res.json({"mensagem":"oi"})});

routes.post('/users',userController.create);
routes.post('/surveys',surveyController.create);
routes.get('/surveys',surveyController.show);


export {routes};