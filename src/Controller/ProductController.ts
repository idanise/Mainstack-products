import { Request, Response, NextFunction } from 'express';
import { createProduct } from '../Services/ProductService';

const createProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await createProduct(req, res, next); 
    } catch (error) {
        console.error('Error in create category controller:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export {  createProductController };
