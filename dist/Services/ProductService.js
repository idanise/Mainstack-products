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
exports.updateProduct = exports.deleteSingleProduct = exports.getAllProductsByCategory = exports.getProductById = exports.createProduct = void 0;
const database_service_1 = require("../Services/database.service");
const mongoose_1 = __importDefault(require("mongoose"));
const Response_1 = require("../Helpers/Response");
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const newProduct = req.body;
        const base64string = req.body.photo;
        const photoBuffer = Buffer.from(base64string, 'base64');
        newProduct.photo = photoBuffer;
        newProduct.createdAt = new Date();
        const result = yield ((_a = database_service_1.collections.products) === null || _a === void 0 ? void 0 : _a.insertOne(newProduct));
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
        console.error('Error adding product:', error);
        return res.status(500).json({ responseCode: Response_1.ResponseInfo.SystemMalfunction.code, responseMessage: Response_1.ResponseInfo.SystemMalfunction.description });
    }
});
exports.createProduct = createProduct;
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const productId = req.query.productId;
    try {
        console.log(productId);
        const product = yield ((_b = database_service_1.collections.products) === null || _b === void 0 ? void 0 : _b.findOne({ _id: new mongoose_1.default.Types.ObjectId(productId) }));
        const response = product
            ? {
                responseCode: Response_1.ResponseInfo.Success.code,
                responseMessage: Response_1.ResponseInfo.Success.description,
                data: product
            }
            : {
                responseCode: Response_1.ResponseInfo.Failed.code,
                responseMessage: Response_1.ResponseInfo.Failed.description,
                data: null
            };
        res.status(response ? 200 : 400).json(response);
    }
    catch (error) {
        console.error('Error fetching product by ID:', error);
        return res.status(500).json({ responseCode: Response_1.ResponseInfo.SystemMalfunction.code, responseMessage: Response_1.ResponseInfo.SystemMalfunction.description });
    }
});
exports.getProductById = getProductById;
const getAllProductsByCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const categoryId = req.query.categoryId;
    try {
        if (!categoryId) {
            return res.status(400).json({ error: 'Category ID is required' });
        }
        const productsCursor = (_c = database_service_1.collections.products) === null || _c === void 0 ? void 0 : _c.find({ category: categoryId });
        console.log(categoryId);
        if (!productsCursor) {
            return res.status(404).json({
                responseCode: Response_1.ResponseInfo.ProductNotFound.code,
                responseMessage: Response_1.ResponseInfo.ProductNotFound.description,
            });
        }
        const products = yield productsCursor.toArray();
        if (!products || products.length === 0) {
            return res.status(404).json({
                responseCode: Response_1.ResponseInfo.CategoryNotFound.code,
                responseMessage: Response_1.ResponseInfo.CategoryNotFound.description,
            });
        }
        res.status(200).json({
            responseCode: Response_1.ResponseInfo.Success.code,
            responseMessage: Response_1.ResponseInfo.Success.description,
            data: products
        });
    }
    catch (err) {
        console.error('Error fetching product by ID:', err);
        return res.status(500).json({ responseCode: Response_1.ResponseInfo.SystemMalfunction.code, responseMessage: Response_1.ResponseInfo.SystemMalfunction.description });
    }
});
exports.getAllProductsByCategory = getAllProductsByCategory;
const deleteSingleProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    const productId = req.query.productId;
    try {
        const product = yield ((_d = database_service_1.collections.products) === null || _d === void 0 ? void 0 : _d.findOne({ _id: new mongoose_1.default.Types.ObjectId(productId) }));
        if (!product) {
            return res.status(400).json({
                responseCode: Response_1.ResponseInfo.ProductNotFound.code,
                responseMessage: Response_1.ResponseInfo.ProductNotFound.description,
            });
        }
        const result = yield ((_e = database_service_1.collections.products) === null || _e === void 0 ? void 0 : _e.deleteOne({ _id: new mongoose_1.default.Types.ObjectId(productId) }));
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
        console.error('Error deleting product:', error);
        return res.status(500).json({ responseCode: Response_1.ResponseInfo.SystemMalfunction.code, responseMessage: Response_1.ResponseInfo.SystemMalfunction.description });
    }
});
exports.deleteSingleProduct = deleteSingleProduct;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
    const productId = req.query.productId;
    try {
        const product = yield ((_f = database_service_1.collections.products) === null || _f === void 0 ? void 0 : _f.findOne({ _id: new mongoose_1.default.Types.ObjectId(productId) }));
        if (!product) {
            return res.status(400).json({
                responseCode: Response_1.ResponseInfo.ProductNotFound.code,
                responseMessage: Response_1.ResponseInfo.ProductNotFound.description,
            });
        }
        const updatedProductData = Object.assign(Object.assign({}, req.body), { updatedAt: new Date() });
        const result = yield ((_g = database_service_1.collections.products) === null || _g === void 0 ? void 0 : _g.updateOne({ _id: new mongoose_1.default.Types.ObjectId(productId) }, { $set: updatedProductData }));
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
        console.error('Error updating product:', error);
        return res.status(500).json({ responseCode: Response_1.ResponseInfo.SystemMalfunction.code, responseMessage: Response_1.ResponseInfo.SystemMalfunction.description });
    }
});
exports.updateProduct = updateProduct;
