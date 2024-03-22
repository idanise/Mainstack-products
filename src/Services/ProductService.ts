import { Request, Response, NextFunction, response } from 'express';
import {collections} from "../Services/database.service";
import { IProduct, Product } from '../Models/Products/productModel';

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


export {createProduct}