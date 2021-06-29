import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sequelize from './database/Database';

const app = express();
sequelize.addModels([]);
app.use(cors());
app.use(bodyParser.json());

export default app;
