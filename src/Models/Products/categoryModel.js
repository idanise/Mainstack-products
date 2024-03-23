"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
var mongoose_1 = require("mongoose");
var categorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date }
}, {
    timestamps: true
});
var Category = mongoose_1.default.model('Category', categorySchema);
exports.Category = Category;
