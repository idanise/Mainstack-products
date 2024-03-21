
import * as mongoDB from 'mongodb'; 
import dotenv from 'dotenv'; 
import User from '../Models/Auth/userModel';
dotenv.config();

export const collections: { users?: mongoDB.Collection } = {}

const DB_CONN_STRING = process.env.DB_CONN_STRING as string; 
const Mainstack_Collection = process.env.Mainstack_Collection as string; 

export async function connectToDatabase () {
    
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(DB_CONN_STRING);

    await client.connect();
    
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
    console.log(db); 
   
    const usersCollection: mongoDB.Collection = db.collection(Mainstack_Collection);
 
  collections.users = usersCollection;
       
         console.log(`Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`);
 }
 

