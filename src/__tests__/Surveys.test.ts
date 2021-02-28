import request from 'supertest'
import { app } from '../app'
import createConnection from '../database'

describe("Surveys",()=>{
    // beforeAll(async()=>{
    //     const connection = await createConnection();
    //     await connection.runMigrations();
    // });

    it("Shoud be able to create a new survey",async ()=>{
        const response = await request(app).post("/surveys").send({
            title:"Experience user",
            description:'Do you like our products'
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id")
    });

    it("Shoud have 2 survey",async ()=>{
        await request(app).post("/surveys").send({
            title:"Experience user",
            description:'Do you like our products'
        });

        const res = await request(app).get("/surveys")

        expect(res.body.length).toBe(2)
    });

})