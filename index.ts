import express from 'express'; 
import cookieParser from 'cookie-parser'; 
import cors from 'cors'; 
import dotenv from 'dotenv'; 
import mongoose from 'mongoose'; 
import pino from 'pino'
import  {query} from 'express-validator';
import { connectToDatabase } from './src/Services/database.service';
import authRoute from './src/Routes/authRoutes'
import categoryRoute from './src/Routes/categoryRoute'
import productRoute from './src/Routes/productRoute'
import bodyParser = require('body-parser');

dotenv.config(); 

const url = process.env.MONGO_uri as string; 

connectToDatabase(); 


const PORT = process.env.PORT; 
const logger = require('pino')(); 

const app = express(); 
app.use(bodyParser.json()); 
app.use(express.urlencoded({extended: false})); 
app.use(cors()); 
app.use(cookieParser()); 
app.use(query()); 


app.get("/", (req, res) => {
    res.status(200).send("Hello, world")
}); 


app.use("/api/user",  authRoute); 
app.use("/api/category", categoryRoute); 
app.use("/api/product", productRoute); 


const server = app.listen(PORT,    () => {
    console.log(`App is listening on port ${PORT}`)
    logger.info("App has started")
});

export default server; 