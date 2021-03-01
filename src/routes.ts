import {Router} from 'express';
import { UserController } from './controller/UserController';
import {Request,Response} from 'express'
import { SurveyController } from './controller/SurveyController';
import { SendMailController } from './controller/SendMailController';


const routes = Router();
const userController = new UserController();
const surveyController = new SurveyController();
const sendMail = new SendMailController();

routes.get('/healthz',(req:Request,res:Response)=>{res.json({"mensagem":"oi"})});

routes.post('/users',userController.create);
routes.post('/surveys',surveyController.create);
routes.get('/surveys',surveyController.show);
routes.post('/sendmail',sendMail.execute)


export {routes};