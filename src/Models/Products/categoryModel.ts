import mongoose, { mongo } from 'mongoose'; 
import crypto from 'crypto'; 
import { v4 as uuidv4 } from 'uuid'
uuidv4()

interface ICategory extends Document{
    name: string; 
    dateCreated: Date; 
    createdBy: string
}


const categorySchema: mongoose.Schema<ICategory> = new mongoose.Schema<ICategory>({
    name: {
        type: String, 
        required: true, 
        maxlength: 32
    }, 
    dateCreated : {
        type: Date, 
        required: true, 
    }, 
    createdBy : {
        type: String, 
        required : true, 
        maxlength: 32
    }
}); 

export {categorySchema}

