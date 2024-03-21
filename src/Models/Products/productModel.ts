import mongoose, { mongo } from 'mongoose'; 
import crypto from 'crypto'; 
import { v4 as uuidv4 } from 'uuid'
uuidv4()

interface IProduct extends Document{
    name: string; 
    description: string, 
    price?: string, 
    quantity: Number; 
    photo?: string; 
    shipping?: Boolean; 
    category: mongoose.Schema.Types.ObjectId; 
}


const productSchema: mongoose.Schema<IProduct> = new mongoose.Schema<IProduct>({
    name: {
        type: String, 
        required: true, 
        maxlength: 32
    }, 
    description : {
        type: String, 
        required: true, 
        maxlength: 1000
    }, 
    price: {
        type: Number, 
        trim: true, 
        required: true, 
        maxlength: 32
    }, 
    quantity : {
        type: Number,
        required: true
    }, 
    photo : {
        type: String, 
        required : false
    },
    shipping : {
        type: String, 
        required : false
    }, 
    category : {
        type : mongoose.Schema.Types.ObjectId, 
        ref: "Category", 
        required : true
    }
}); 

export {productSchema}

