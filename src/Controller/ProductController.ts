import { Request, Response, NextFunction } from 'express';
import { createProduct, getProductById, getAllProductsByCategory, deleteSingleProduct, updateProduct } from '../Services/ProductService';

const createProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await createProduct(req, res, next); 
    } catch (error) {
        console.error('Error in create category controller:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getProductByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await getProductById(req, res, next); 
    } catch (error) {
        console.error('Error in create category controller:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getProductsByCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await getAllProductsByCategory(req, res, next); 
    } catch (error) {
        console.error('Error in create category controller:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteSingleProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await deleteSingleProduct(req, res, next); 
    } catch (error) {
        console.error('Error in create category controller:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await updateProduct(req, res, next); 
    } catch (error) {
        console.error('Error in create category controller:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




export {  createProductController, getProductByIdController, getProductsByCategoryController, deleteSingleProductController, updateProductController };
