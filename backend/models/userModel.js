import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    name: { require: true, type: String },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true, },
    cartdata: { type: Object, default: {} }
},{minimize:false})

const usermodel=mongoose.model.user || mongoose.model("user",userSchema)

export default usermodel 