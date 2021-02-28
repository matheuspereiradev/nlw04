import 'reflect-metadata';
import express from 'express';

import CreateConection from './database'
import { routes } from './routes';

CreateConection();

const app = express();

app.use(express.json())

app.use(routes)


export {app}