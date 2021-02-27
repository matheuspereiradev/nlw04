import {Request,Response} from 'express'
import { getRepository } from 'typeorm';
import { Users } from '../models/Users';

class UserController{
    async create(request:Request,response:Response) {
        const {name,email} = request.body;

        const userRepository = await getRepository(Users);

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

        return response.json(user);
    }
};

export{UserController};