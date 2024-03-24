"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSingleCategory = exports.updateCategory = exports.getCategoryById = exports.getAllCategories = exports.createCategory = void 0;
const database_service_1 = require("../Services/database.service");
const mongoose_1 = __importDefault(require("mongoose"));
const Response_1 = require("../Helpers/Response");
const createCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const newCategory = req.body;
        const result = yield ((_a = database_service_1.collections.categories) === null || _a === void 0 ? void 0 : _a.insertOne(newCategory));
        const response = result
            ? {
                responseCode: Response_1.ResponseInfo.Success.code,
                responseMessage: Response_1.ResponseInfo.Success.description,
                data: result
            }
            : {
                responseCode: Response_1.ResponseInfo.Failed.code,
                responseMessage: Response_1.ResponseInfo.Failed.description,
                data: null
            };
        res.status(response ? 200 : 400).json(response);
    }
    catch (error) {
        console.error('Error creating category:', error);
        return res.status(500).json({ responseCode: Response_1.ResponseInfo.SystemMalfunction.code, responseMessage: Response_1.ResponseInfo.SystemMalfunction.description });
    }
});
exports.createCategory = createCategory;
const getCategoryById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const categoryId = req.query.categoryId;
    try {
        const category = yield ((_b = database_service_1.collections.categories) === null || _b === void 0 ? void 0 : _b.findOne({ _id: new mongoose_1.default.Types.ObjectId(categoryId) }));
        if (!category) {
            const jsonResponse = {
                responseCode: Response_1.ResponseInfo.CategoryNotFound.code,
                responseMessage: Response_1.ResponseInfo.CategoryNotFound.description,
                data: null
            };
            return res.status(400).json(jsonResponse);
        }
        const response = category
            ? {
                responseCode: Response_1.ResponseInfo.Success.code,
                responseMessage: Response_1.ResponseInfo.Success.description,
                data: category
            }
            : {
                responseCode: Response_1.ResponseInfo.Failed.code,
                responseMessage: Response_1.ResponseInfo.Failed.description,
                data: null
            };
        res.status(response ? 200 : 400).json(response);
    }
    catch (error) {
        console.error('Error fetching category by ID:', error);
        return res.status(500).json({ responseCode: Response_1.ResponseInfo.SystemMalfunction.code, responseMessage: Response_1.ResponseInfo.SystemMalfunction.description });
    }
});
exports.getCategoryById = getCategoryById;
const getAllCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const categoryCursor = (_c = database_service_1.collections.categories) === null || _c === void 0 ? void 0 : _c.find();
        if (!categoryCursor) {
            return res.status(400).json({ error: 'Failed to retrieve categories' });
        }
        const categories = yield categoryCursor.toArray();
        const response = categories
            ? {
                responseCode: Response_1.ResponseInfo.Success.code,
                responseMessage: Response_1.ResponseInfo.Success.description,
                data: categories
            }
            : {
                responseCode: Response_1.ResponseInfo.Failed.code,
                responseMessage: Response_1.ResponseInfo.Failed.description,
                data: null
            };
        res.status(response ? 200 : 400).json(response);
    }
    catch (err) {
        console.error('Error fetching categories:', err);
        return res.status(500).json({ responseCode: Response_1.ResponseInfo.SystemMalfunction.code, responseMessage: Response_1.ResponseInfo.SystemMalfunction.description });
    }
});
exports.getAllCategories = getAllCategories;
const deleteSingleCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    const categoryId = req.query.categoryId;
    try {
        const category = yield ((_d = database_service_1.collections.categories) === null || _d === void 0 ? void 0 : _d.findOne({ _id: new mongoose_1.default.Types.ObjectId(categoryId) }));
        if (!category) {
            const jsonResponse = {
                responseCode: Response_1.ResponseInfo.CategoryNotFound.code,
                responseMessage: Response_1.ResponseInfo.CategoryNotFound.description,
                data: null
            };
            return res.status(400).json(jsonResponse);
        }
        const result = yield ((_e = database_service_1.collections.products) === null || _e === void 0 ? void 0 : _e.deleteMany({ category: categoryId }));
        if (!result) {
            console.error('Error deleting products related to category');
            return res.status(500).json({ responseCode: Response_1.ResponseInfo.SystemMalfunction.code, responseMessage: Response_1.ResponseInfo.SystemMalfunction.description });
        }
        const categoryResult = yield ((_f = database_service_1.collections.categories) === null || _f === void 0 ? void 0 : _f.deleteOne({ _id: new mongoose_1.default.Types.ObjectId(categoryId) }));
        if (!categoryResult) {
            console.error('Error deleting category');
            return res.status(500).json({ responseCode: Response_1.ResponseInfo.SystemMalfunction.code, responseMessage: Response_1.ResponseInfo.SystemMalfunction.description });
        }
        const response = {
            responseCode: Response_1.ResponseInfo.Success.code,
            responseMessage: Response_1.ResponseInfo.Success.description,
            data: null
        };
        res.status(200).json(response);
    }
    catch (error) {
        console.error('Error deleting category:', error);
        return res.status(500).json({ responseCode: Response_1.ResponseInfo.SystemMalfunction.code, responseMessage: Response_1.ResponseInfo.SystemMalfunction.description });
    }
});
exports.deleteSingleCategory = deleteSingleCategory;
const updateCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h;
    const categoryId = req.query.categoryId;
    try {
        const category = yield ((_g = database_service_1.collections.categories) === null || _g === void 0 ? void 0 : _g.findOne({ _id: new mongoose_1.default.Types.ObjectId(categoryId) }));
        if (!category) {
            return res.status(400).json({
                responseCode: Response_1.ResponseInfo.CategoryNotFound.code,
                responseMessage: Response_1.ResponseInfo.CategoryNotFound.description,
            });
        }
        const updateCategoryData = Object.assign(Object.assign({}, req.body), { updatedAt: new Date() });
        const result = yield ((_h = database_service_1.collections.categories) === null || _h === void 0 ? void 0 : _h.updateOne({ _id: new mongoose_1.default.Types.ObjectId(categoryId) }, { $set: updateCategoryData }));
        const response = result
            ? {
                responseCode: Response_1.ResponseInfo.Success.code,
                responseMessage: Response_1.ResponseInfo.Success.description,
                data: null
            }
            : {
                responseCode: Response_1.ResponseInfo.Failed.code,
                responseMessage: Response_1.ResponseInfo.Failed.description,
                data: null
            };
        res.status(response ? 200 : 400).json(response);
    }
    catch (error) {
        console.error('Error updating category:', error);
        return res.status(500).json({ responseCode: Response_1.ResponseInfo.SystemMalfunction.code, responseMessage: Response_1.ResponseInfo.SystemMalfunction.description });
    }
});
exports.updateCategory = updateCategory;
