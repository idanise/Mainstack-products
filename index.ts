import express from 'express'; 
import cookieParser from 'cookie-parser'; 
import cors from 'cors'; 
import dotenv from 'dotenv'; 
import mongoose from 'mongoose'; 
import * as mongo from './src/mongo'; 
import pino from 'pino'
import  {query} from 'express-validator';



dotenv.config(); 

mongo.connectToMongoDB();

const PORT = process.env.PORT; 
const logger = require('pino')(); 

const app = express(); 

app.use(express.json()); 
app.use(express.urlencoded({extended: false})); 
app.use(cors()); 
app.use(cookieParser()); 
app.use(query()); 


app.get("/", (req, res) => {
    res.status(200).send("Hello, world")
}); 

app.listen(PORT,    () => {
    console.log(`App is listening on port ${PORT}`)
    logger.info("App has started")
})