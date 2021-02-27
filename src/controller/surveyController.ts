
import {Request,Response} from 'express'
import { getCustomRepository } from 'typeorm'
import {SurveyRepository} from '../repositories/surveyRepository'


class SurveyController {

    async create(req:Request,res:Response){

        const {title,description} = req.body;

        const surveyRepository = getCustomRepository(SurveyRepository);

        


    }

}

export{SurveyController}