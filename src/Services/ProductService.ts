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
    const productId = req.query.productId as string;
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

const getAllProductsByCategory = async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.query.categoryId;

    try 
    {
        console.log(categoryId);
        const productsCursor = collections.products?.find({ category: categoryId });


        if (!productsCursor) {
            return res.status(404).json({ error: 'No products found for the specified category' });
        }

        const products = await productsCursor.toArray();

        if (!products || products.length === 0) {
            return res.status(404).json({ error: 'No products found for the specified category' });
        }

        res.status(200).json({
            responseCode: "00",
            responseMessage: "Products retrieved successfully",
            data: products
        });
    } catch(err){
        console.error('Error fetching product by ID:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }

}; 


const deleteSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.query.productId as string;

    try {
        const result = await collections.products?.deleteOne({ _id: new mongoose.Types.ObjectId(productId) });

        const response = result
        ? {
            responseCode: "00",
            responseMessage: "Product deleted successfully",
            data: null
        }
        : {
            responseCode: "99",
            responseMessage: "Failed to delete product",
            data: null
        };

    res.status(response ? 200 : 400).json(response);
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.query.productId as string;

    try {
        const updatedProductData = {
            ...req.body, 
            updatedAt: new Date() 
        };
        const result = await collections.products?.updateOne(
            { _id: new mongoose.Types.ObjectId(productId) },
            { $set: updatedProductData }
        );

        const response = result
        ? {
            responseCode: "00",
            responseMessage: "Product updated successfully",
            data: null
        }
        : {
            responseCode: "99",
            responseMessage: "Failed to update product",
            data: null
        };

        res.status(response ? 200 : 400).json(response);

    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export {createProduct, getProductById, getAllProductsByCategory, deleteSingleProduct, updateProduct}