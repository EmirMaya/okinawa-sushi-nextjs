import { MenuItem } from '@/models/MenuItem';
import mongoose from 'mongoose';

export const POST = async (req) => {
    mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    const menuItem = await MenuItem.create(data);
    return Response.json(menuItem);
}

export const PUT = async (req) => {
    mongoose.connect(process.env.MONGO_URL);
    const { _id, ...data } = await req.json();
    await MenuItem.findByIdAndUpdate(_id, data);
    return Response.json(true);

}


export const GET = async (req) => {
    mongoose.connect(process.env.MONGO_URL);
    return Response.json(
        await MenuItem.find()
    )
}