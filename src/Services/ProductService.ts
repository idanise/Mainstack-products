import { Request, Response, NextFunction, response } from 'express';
import {collections} from "../Services/database.service";
import { IProduct, Product } from '../Models/Products/productModel';
import mongoose from 'mongoose';

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newProduct = req.body as IProduct; 

        const base64string = req.body.photo; 
        const photoBuffer = Buffer.from(base64string, 'base64'); 

        newProduct.photo = photoBuffer; 
        newProduct.createdAt = new Date(); 

        const result = await collections.products?.insertOne(newProduct); 

        const response = result
            ? {
                responseCode: "00",
                responseMessage: `Successful added product with id ${result.insertedId}`,
                data: result
            }
            : {
                responseCode: "99",
                responseMessage: "Failed to add product",
                data: null
            };

        res.status(response ? 200 : 400).json(response);

    } catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json({ error: "Something went wrong" });
    }
};

const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId as string;
    try {

        console.log(productId); 
        const product = await collections.products?.findOne({ _id: new mongoose.Types.ObjectId(productId) });

        const response = product
            ? {
                responseCode: "00",
                responseMessage: "Product retreived successfully",
                data: product
            }
            : {
                responseCode: "99",
                responseMessage: "Failed to get product",
                data: null
            };

        res.status(response ? 200 : 400).json(response);
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const getProductByCategory = (req: Request, res: Response, next: NextFunction) => {

}; 

export {createProduct, getProductById}