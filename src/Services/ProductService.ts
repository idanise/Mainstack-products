import { Request, Response, NextFunction, response } from 'express';
import { collections } from "../Services/database.service";
import { IProduct, Product } from '../Models/Products/productModel';
import mongoose from 'mongoose';
import { ResponseInfo } from '../Helpers/Response';

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
                responseCode: ResponseInfo.Success.code,
                responseMessage: ResponseInfo.Success.description,
                data: result
            }
            : {
                responseCode: ResponseInfo.Failed.code,
                responseMessage: ResponseInfo.Failed.description,
                data: null
            };

        res.status(response ? 200 : 400).json(response);

    } catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json({ responseCode: ResponseInfo.SystemMalfunction.code, responseMessage: ResponseInfo.SystemMalfunction.description });
    }
};

const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.query.productId as string;
    try {

        console.log(productId);
        const product = await collections.products?.findOne({ _id: new mongoose.Types.ObjectId(productId) });

        const response = product
            ? {
                responseCode: ResponseInfo.Success.code,
                responseMessage: ResponseInfo.Success.description,
                data: product
            }
            : {
                responseCode: ResponseInfo.Failed.code,
                responseMessage: ResponseInfo.Failed.description,
                data: null
            };

        res.status(response ? 200 : 400).json(response);
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        return res.status(500).json({ responseCode: ResponseInfo.SystemMalfunction.code, responseMessage: ResponseInfo.SystemMalfunction.description });
    }
};

const getAllProductsByCategory = async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.query.categoryId as string; 

    try {
        if (!categoryId) {
            return res.status(400).json({ error: 'Category ID is required' });
        }

        const productsCursor = collections.products?.find({ category: categoryId });
        console.log(categoryId); 

        if (!productsCursor) {
            return res.status(404).json({
                responseCode: ResponseInfo.ProductNotFound.code,
                responseMessage: ResponseInfo.ProductNotFound.description,
            });
        }

        const products = await productsCursor.toArray();

        if (!products || products.length === 0) {
            return res.status(404).json({
                responseCode: ResponseInfo.CategoryNotFound.code,
                responseMessage: ResponseInfo.CategoryNotFound.description,
            });
        }

        res.status(200).json({
            responseCode: ResponseInfo.Success.code,
            responseMessage: ResponseInfo.Success.description,
            data: products
        });
    } catch (err) {
        console.error('Error fetching product by ID:', err);
        return res.status(500).json({ responseCode: ResponseInfo.SystemMalfunction.code, responseMessage: ResponseInfo.SystemMalfunction.description });
    }

};


const deleteSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.query.productId as string;

    try {

        const product = await collections.products?.findOne({ _id: new mongoose.Types.ObjectId(productId) });

        if (!product) {
            return res.status(400).json({
                responseCode: ResponseInfo.ProductNotFound.code,
                responseMessage: ResponseInfo.ProductNotFound.description,
            });
        }

        const result = await collections.products?.deleteOne({ _id: new mongoose.Types.ObjectId(productId) });

        const response = result
            ? {
                responseCode: ResponseInfo.Success.code,
                responseMessage: ResponseInfo.Success.description,
                data: null
            }
            : {
                responseCode: ResponseInfo.Failed.code,
                responseMessage: ResponseInfo.Failed.description,
                data: null
            };

        res.status(response ? 200 : 400).json(response);
    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ responseCode: ResponseInfo.SystemMalfunction.code, responseMessage: ResponseInfo.SystemMalfunction.description });
    }
}

const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.query.productId as string;

    try {

        const product = await collections.products?.findOne({ _id: new mongoose.Types.ObjectId(productId) });

        if (!product) {
            return res.status(400).json({
                responseCode: ResponseInfo.ProductNotFound.code,
                responseMessage: ResponseInfo.ProductNotFound.description,
            });
        }

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
                responseCode: ResponseInfo.Success.code,
                responseMessage: ResponseInfo.Success.description,
                data: null
            }
            : {
                responseCode: ResponseInfo.Failed.code,
                responseMessage: ResponseInfo.Failed.description,
                data: null
            };

        res.status(response ? 200 : 400).json(response);

    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ responseCode: ResponseInfo.SystemMalfunction.code, responseMessage: ResponseInfo.SystemMalfunction.description });
    }
}

export { createProduct, getProductById, getAllProductsByCategory, deleteSingleProduct, updateProduct }