"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var mongoose_1 = require("mongoose");
var productSchema = new mongoose_1.Schema({
    name: { type: String, required: true, maxlength: 32 },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category', required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    createdBy: { type: String, required: true },
    numberSold: { type: Number },
    photo: { type: Buffer },
}, {
    timestamps: true
});
var Product = mongoose_1.default.model('Product', productSchema);
exports.Product = Product;
