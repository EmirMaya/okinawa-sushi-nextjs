import { model, models, Schema } from 'mongoose';

const MenuItemSchema = new Schema({
    image: { type: String },
    name: { type: String },
    description: { type: String },
    price: { type: Number },
}, { timestamps: true });

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);