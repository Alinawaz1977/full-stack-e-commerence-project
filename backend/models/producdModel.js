import mongoose, { model } from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        require: true,
        type: String,
        
    },
    description: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    subcategory: {
        type: String,
        require: true
    },
    bestseller: {
        type: Boolean,
    },
    image: {
        type: Array,
        require: true
    },
    sizes: {
        type: Array,
        require:true
    },
    date: {
        type: Number,
    },
    price: {
        type: Number,
        require: true
    }
})

const productModel=mongoose.models.product || mongoose.model("product",productSchema)

export default productModel