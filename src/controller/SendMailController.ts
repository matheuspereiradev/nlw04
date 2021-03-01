import {Request,Response} from 'express'
import { getCustomRepository } from 'typeorm';
import {UserRepository} from '../repositories/userRepository'
import {SurveyRepository} from '../repositories/surveyRepository'
import {SurveyUsersRepository} from '../repositories/surveysUsersRespository'
import SendEmailService from '../services/SendEmailService';

class SendMailController{
    async execute(request:Request,response:Response){
        const {email,survey_id} = request.body;

        const userRepository = getCustomRepository(UserRepository);
        const surveyRepository = getCustomRepository(SurveyRepository);
        const surveyUsersRepository = getCustomRepository(SurveyUsersRepository);

        const user = await userRepository.findOne({
            email
        })

        if(!user){
            return response.status(400).json({
                "error":"user does not exist"
            })
        }

        const survey = await surveyRepository.findOne({id:survey_id});

        if(!survey){
            return response.status(400).json({
                error:"survey does not exist"
            });
        }

        const surveyUser = surveyUsersRepository.create({
            user_id:user.id,survey_id
        });

        await surveyUsersRepository.save(surveyUser);

        await SendEmailService.execute(email,survey.title,survey.description);

        return response.status(201).json(surveyUser);
    }
}

export {SendMailController}