import mongoose, { Schema, Document, Types } from 'mongoose';

interface IProduct extends Document {
    name: string;
    category: Types.ObjectId;
    description: string;
    price: number;
    quantity: number;
    numberSold?: number;
    photo?: Buffer;
    createdAt: Date;
    updatedAt: Date;
    createdBy: String; 
}

const productSchema: Schema<IProduct> = new Schema<IProduct>({
    name: { type: String, required: true, maxlength: 32 },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true }, 
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    createdBy: {type: String, required: true},
    numberSold: { type: Number },
    photo: { type: Buffer },
}, {
    timestamps: true
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export { IProduct, Product };
