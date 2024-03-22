import { Request, Response, NextFunction, response } from 'express';
import {collections} from "../Services/database.service";
import { ICategory, Category } from '../Models/Products/categoryModel';

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newCategory = req.body as ICategory; 

        const result = await collections.categories?.insertOne(newCategory); 

        const response = result
            ? {
                responseCode: "00",
                responseMessage: `Successful created category with id ${result.insertedId}`,
                data: result
            }
            : {
                responseCode: "99",
                responseMessage: "Failed to create category",
                data: null
            };

        res.status(response ? 200 : 400).json(response);

    } catch (error) {
        console.error('Error creating category:', error);
        return res.status(500).json({ error: "Something went wrong" });
    }
};


export {createCategory}