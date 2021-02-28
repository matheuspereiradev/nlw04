import {Request,Response} from 'express'
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/userRepository';

class UserController{
    async create(request:Request,response:Response) {
        const {name,email} = request.body;

        const userRepository = getCustomRepository(UserRepository);

        const userAlreadyExists = await userRepository.findOne({
            email
        })

        if(userAlreadyExists){
            return response.status(400).json({
                "error":"user already exist, the email is unique"
            })
        }


        const user = userRepository.create({
            name,email
        });

        await userRepository.save(user) 

        return response.status(201).json(user);
    }
};

export{UserController};