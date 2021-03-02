import {Request,Response} from 'express'
import { getCustomRepository } from 'typeorm';
import {UserRepository} from '../repositories/userRepository'
import {SurveyRepository} from '../repositories/surveyRepository'
import {SurveyUsersRepository} from '../repositories/surveysUsersRespository'
import SendEmailService from '../services/SendEmailService';
import {resolve} from 'path';
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

        const pathMail = resolve(__dirname,"..","views","emails","npsMail.hbs");

        const variables = {
            name:user.name,
            title:survey.title,
            description:survey.description,
            user_id:user.id
        }

        await SendEmailService.execute(email,survey.title,variables,pathMail);

        return response.status(201).json(surveyUser);
    }
}

export {SendMailController}