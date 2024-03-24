import { Request, Response, NextFunction, response } from 'express';
import { collections } from "../Services/database.service";
import { ICategory, Category } from '../Models/Products/categoryModel';
import mongoose from 'mongoose';
import { ResponseInfo } from '../Helpers/Response';


//Method to create category
const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {

        //save category to db
        const newCategory = req.body as ICategory;
        const result = await collections.categories?.insertOne(newCategory);

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
        console.error('Error creating category:', error);
        return res.status(500).json({ responseCode: ResponseInfo.SystemMalfunction.code, responseMessage: ResponseInfo.SystemMalfunction.description });
    }
};



//Method to get category by id
const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.query.categoryId as string;
    try {

        //Query db with category id: Return not found if category doesn't exist
        const category = await collections.categories?.findOne({ _id: new mongoose.Types.ObjectId(categoryId) });
        if (!category) {
            const jsonResponse = {
                responseCode: ResponseInfo.CategoryNotFound.code,
                responseMessage: ResponseInfo.CategoryNotFound.description,
                data: null
            };
            return res.status(400).json(jsonResponse);
        }

        const response = category
            ? {
                responseCode: ResponseInfo.Success.code,
                responseMessage: ResponseInfo.Success.description,
                data: category
            }
            : {
                responseCode: ResponseInfo.Failed.code,
                responseMessage: ResponseInfo.Failed.description,
                data: null
            };

        res.status(response ? 200 : 400).json(response);
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        return res.status(500).json({ responseCode: ResponseInfo.SystemMalfunction.code, responseMessage: ResponseInfo.SystemMalfunction.description });
    }
};


//Method that gets all categories
const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {

        //Query db with category
        const categoryCursor = collections.categories?.find();
        if (!categoryCursor) {
            return res.status(400).json({ error: 'Failed to retrieve categories' });
        }

        //Convert category to an array
        const categories = await categoryCursor.toArray();
        const response = categories
            ? {
                responseCode: ResponseInfo.Success.code,
                responseMessage: ResponseInfo.Success.description,
                data: categories
            }
            : {
                responseCode: ResponseInfo.Failed.code,
                responseMessage: ResponseInfo.Failed.description,
                data: null
            };

        res.status(response ? 200 : 400).json(response);
    } catch (err) {
        console.error('Error fetching categories:', err);
        return res.status(500).json({ responseCode: ResponseInfo.SystemMalfunction.code, responseMessage: ResponseInfo.SystemMalfunction.description });
    }

};



//Method that deletes a single category
const deleteSingleCategory = async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.query.categoryId as string;
    try {


        //Query db with category id
        const category = await collections.categories?.findOne({ _id: new mongoose.Types.ObjectId(categoryId) });
        if (!category) {
            const jsonResponse = {
                responseCode: ResponseInfo.CategoryNotFound.code,
                responseMessage: ResponseInfo.CategoryNotFound.description,
                data: null
            };
            return res.status(400).json(jsonResponse);
        }


        //Delete all products that is related ot gategory id
        const result = await collections.products?.deleteMany({ category: categoryId });
        if (!result) {
            console.error('Error deleting products related to category');
            return res.status(500).json({ responseCode: ResponseInfo.SystemMalfunction.code, responseMessage: ResponseInfo.SystemMalfunction.description });
        }


        //Delete category
        const categoryResult = await collections.categories?.deleteOne({ _id: new mongoose.Types.ObjectId(categoryId) });
        if (!categoryResult) {
            console.error('Error deleting category');
            return res.status(500).json({ responseCode: ResponseInfo.SystemMalfunction.code, responseMessage: ResponseInfo.SystemMalfunction.description });
        }

        const response = {
            responseCode: ResponseInfo.Success.code,
            responseMessage: ResponseInfo.Success.description,
            data: null
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Error deleting category:', error);
        return res.status(500).json({ responseCode: ResponseInfo.SystemMalfunction.code, responseMessage: ResponseInfo.SystemMalfunction.description });
    }
}


//Method to update category
const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.query.categoryId as string;

    try {

        //Query db with category id
        const category = await collections.categories?.findOne({ _id: new mongoose.Types.ObjectId(categoryId) });
        if (!category) {
            return res.status(400).json({
                responseCode: ResponseInfo.CategoryNotFound.code,
                responseMessage: ResponseInfo.CategoryNotFound.description,
            });
        }


        //Update db with new data
        const updateCategoryData = {
            ...req.body,
            updatedAt: new Date()
        };
        const result = await collections.categories?.updateOne(
            { _id: new mongoose.Types.ObjectId(categoryId) },
            { $set: updateCategoryData }
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
        console.error('Error updating category:', error);
        return res.status(500).json({ responseCode: ResponseInfo.SystemMalfunction.code, responseMessage: ResponseInfo.SystemMalfunction.description });
    }
}

export { createCategory, getAllCategories, getCategoryById, updateCategory, deleteSingleCategory }