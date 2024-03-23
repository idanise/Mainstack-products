"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSingleCategory = exports.updateCategory = exports.getCategoryById = exports.getAllCategories = exports.createCategory = void 0;
var database_service_1 = require("../Services/database.service");
var mongoose_1 = require("mongoose");
var Response_1 = require("../Helpers/Response");
var createCategory = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var newCategory, result, response_1, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                newCategory = req.body;
                return [4 /*yield*/, ((_a = database_service_1.collections.categories) === null || _a === void 0 ? void 0 : _a.insertOne(newCategory))];
            case 1:
                result = _b.sent();
                response_1 = result
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
                res.status(response_1 ? 200 : 400).json(response_1);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                console.error('Error creating category:', error_1);
                return [2 /*return*/, res.status(500).json({ responseCode: Response_1.ResponseInfo.SystemMalfunction.code, responseMessage: Response_1.ResponseInfo.SystemMalfunction.description })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createCategory = createCategory;
var getCategoryById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var categoryId, category, response_2, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                categoryId = req.query.categoryId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, ((_a = database_service_1.collections.categories) === null || _a === void 0 ? void 0 : _a.findOne({ _id: new mongoose_1.default.Types.ObjectId(categoryId) }))];
            case 2:
                category = _b.sent();
                response_2 = category
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
                res.status(response_2 ? 200 : 400).json(response_2);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.error('Error fetching category by ID:', error_2);
                return [2 /*return*/, res.status(500).json({ responseCode: Response_1.ResponseInfo.SystemMalfunction.code, responseMessage: Response_1.ResponseInfo.SystemMalfunction.description })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getCategoryById = getCategoryById;
var getAllCategories = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var categoryCursor, categories, response_3, err_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                categoryCursor = (_a = database_service_1.collections.categories) === null || _a === void 0 ? void 0 : _a.find();
                if (!categoryCursor) {
                    return [2 /*return*/, res.status(400).json({ error: 'Failed to retrieve categories' })];
                }
                return [4 /*yield*/, categoryCursor.toArray()];
            case 1:
                categories = _b.sent();
                response_3 = categories
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
                res.status(response_3 ? 200 : 400).json(response_3);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _b.sent();
                console.error('Error fetching categories:', err_1);
                return [2 /*return*/, res.status(500).json({ responseCode: Response_1.ResponseInfo.SystemMalfunction.code, responseMessage: Response_1.ResponseInfo.SystemMalfunction.description })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllCategories = getAllCategories;
var deleteSingleCategory = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var categoryId, category, result, response_4, error_3;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                categoryId = req.query.categoryId;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                return [4 /*yield*/, ((_a = database_service_1.collections.categories) === null || _a === void 0 ? void 0 : _a.findOne({ _id: new mongoose_1.default.Types.ObjectId(categoryId) }))];
            case 2:
                category = _c.sent();
                if (!category) {
                    return [2 /*return*/, res.status(400).json({ error: "Category with the id: ".concat(categoryId, " not found") })];
                }
                return [4 /*yield*/, ((_b = database_service_1.collections.categories) === null || _b === void 0 ? void 0 : _b.deleteOne({ _id: new mongoose_1.default.Types.ObjectId(categoryId) }))];
            case 3:
                result = _c.sent();
                response_4 = result
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
                res.status(response_4 ? 200 : 400).json(response_4);
                return [3 /*break*/, 5];
            case 4:
                error_3 = _c.sent();
                console.error('Error deleting category:', error_3);
                return [2 /*return*/, res.status(500).json({ responseCode: Response_1.ResponseInfo.SystemMalfunction.code, responseMessage: Response_1.ResponseInfo.SystemMalfunction.description })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteSingleCategory = deleteSingleCategory;
var updateCategory = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var categoryId, category, updateCategoryData, result, response_5, error_4;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                categoryId = req.query.categoryId;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                return [4 /*yield*/, ((_a = database_service_1.collections.categories) === null || _a === void 0 ? void 0 : _a.findOne({ _id: new mongoose_1.default.Types.ObjectId(categoryId) }))];
            case 2:
                category = _c.sent();
                if (!category) {
                    return [2 /*return*/, res.status(400).json({
                            responseCode: Response_1.ResponseInfo.CategoryNotFound.code,
                            responseMessage: Response_1.ResponseInfo.CategoryNotFound.description,
                        })];
                }
                updateCategoryData = __assign(__assign({}, req.body), { updatedAt: new Date() });
                return [4 /*yield*/, ((_b = database_service_1.collections.categories) === null || _b === void 0 ? void 0 : _b.updateOne({ _id: new mongoose_1.default.Types.ObjectId(categoryId) }, { $set: updateCategoryData }))];
            case 3:
                result = _c.sent();
                response_5 = result
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
                res.status(response_5 ? 200 : 400).json(response_5);
                return [3 /*break*/, 5];
            case 4:
                error_4 = _c.sent();
                console.error('Error updating category:', error_4);
                return [2 /*return*/, res.status(500).json({ responseCode: Response_1.ResponseInfo.SystemMalfunction.code, responseMessage: Response_1.ResponseInfo.SystemMalfunction.description })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateCategory = updateCategory;
