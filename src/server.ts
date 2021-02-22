import express from 'express';

const app = express();

app.get('/',(req,res)=>{
    res.json({"mensage":"running"})
})

app.listen(3000,()=>{
    console.log("Server run in port 3000");
})

//yarn tsc --init