import * as mongoDB from 'mongodb'; 
import dotenv from 'dotenv'; 
dotenv.config();

export const collections: { users?: mongoDB.Collection, categories?: mongoDB.Collection } = {}

const DB_CONN_STRING = process.env.DB_CONN_STRING as string; 
const User_Collection = process.env.User_Collection as string; 
const Category_Collection = process.env.Category_Collection as string; 

export async function connectToDatabase () {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(DB_CONN_STRING);
    await client.connect();
    
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
    console.log(db); 
   
    const usersCollection: mongoDB.Collection = db.collection(User_Collection);
    const categoriesCollection: mongoDB.Collection = db.collection(Category_Collection); 

    collections.users = usersCollection;
    collections.categories = categoriesCollection; 

    console.log(`Successfully connected to database: ${db.databaseName}`);
    console.log(`Users collection: ${usersCollection.collectionName}`);
    console.log(`Categories collection: ${categoriesCollection.collectionName}`);
}
