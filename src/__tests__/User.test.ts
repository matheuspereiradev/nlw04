import request from 'supertest'
import { app } from '../app'
import createConnection from '../database'

describe("User",()=>{
    beforeAll(async()=>{
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("Shoud be able to create a new user",async ()=>{
        const response = await request(app).post("/users").send({
            name:"Matheus Example",
            email:`example@gmail.com`
        });

        expect(response.status).toBe(201)
    });

    it("Shoud not be able to create a new user with a existent email",async ()=>{
        const response = await request(app).post("/users").send({
            name:"Matheus Example",
            email:`example@gmail.com`
        });

        expect(response.status).toBe(400)
    });

})