import * as mongoDB from 'mongodb'; 
const dotenv = require('dotenv');
import { mongo } from 'mongoose';
dotenv.config();

export const collections: { users?: mongoDB.Collection, categories?: mongoDB.Collection, products?: mongoDB.Collection } = {}

const DB_CONN_STRING = process.env.DB_CONN_STRING as string; 
const User_Collection = process.env.User_Collection as string; 
const Category_Collection = process.env.Category_Collection as string; 
const Product_Collection = process.env.Product_Collection as string; 

export async function connectToDatabase () {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(DB_CONN_STRING);
    await client.connect();
    
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
   
    const usersCollection: mongoDB.Collection = db.collection(User_Collection);
    const categoriesCollection: mongoDB.Collection = db.collection(Category_Collection); 
    const productsCollection: mongoDB.Collection = db.collection(Product_Collection); 

    collections.users = usersCollection;
    collections.categories = categoriesCollection; 
    collections.products = productsCollection; 

    console.log(`Successfully connected to database: ${db.databaseName}`);
}
