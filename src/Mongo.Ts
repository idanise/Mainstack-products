import { MongoClient, MongoClientOptions, Db } from 'mongodb';
import dotenv from 'dotenv'; 


dotenv.config(); 



const url = process.env.MONGO_URI as string;
const dbName = process.env.dbName as string;

const client = new MongoClient(url);

export async function connectToMongoDB(): Promise<Db> {
    try {
        await client.connect(); 
        console.log("Connected to MongoDB");
        return client.db(dbName); 
    } catch(err) {
        console.error("Error connecting to MongoDB: ", err); 
        throw err; 
    }
}

export async function closeDbMongoConnection(): Promise<void> {
   try {
       await client.close(); 
       console.log("Disconnected from MongoDB");
   } catch(err) {
       console.error("Error closing connection: ",  err); 
       throw err;
   }
}

export { MongoClient, MongoClientOptions, Db, url, dbName };
