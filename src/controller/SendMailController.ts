import {Request,Response} from 'express'
import { getCustomRepository } from 'typeorm';
import {UserRepository} from '../repositories/userRepository'
import {SurveyRepository} from '../repositories/surveyRepository'
import {SurveyUsersRepository} from '../repositories/surveysUsersRespository'

class SendMailController{
    async execute(request:Request,response:Response){
        const {email,survey_id} = request.body;

        const userRepository = getCustomRepository(UserRepository);
        const surveyRepository = getCustomRepository(SurveyRepository);
        const surveyUsersRepository = getCustomRepository(SurveyUsersRepository);

        const userExist = await userRepository.findOne(email);

        if(!userExist){
            return response.status(400).json({
                error:"user does not exist"
            });
        }

        const surveyExist = await surveyRepository.findOne({id:survey_id});

        if(!surveyExist){
            return response.status(400).json({
                error:"survey does not exist"
            });
        }

        const surveyUser = await surveyUsersRepository.create({
            user_id:userExist.id,survey_id
        })
    }
}

export {SendMailController}