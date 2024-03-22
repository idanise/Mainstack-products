import { Request, Response, NextFunction } from 'express';
import { createCategory

} from '../Services/CategoryService';


const createCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await createCategory(req, res, next); 
    } catch (error) {
        console.error('Error in create category controller:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export {  createCategoryController };
