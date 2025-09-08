import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/producdModel.js"
import bodyParser from "body-parser"
import { loginUser } from "./userController.js"
const {json} = "body-Parser"

const addProduct = async (req, res) => {
    try {
        const { name, description, price, subcategory, category, sizes, bestseller, image, date } = req.body
        console.log(sizes);
        
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]
        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        const imageUrl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" })
                return result.secure_url
            })
        )
        const productdata = {
            name,
            description,
            price,
            sizes:JSON.parse(sizes),
            date: Date.now(),
            bestseller,
            category,
            subcategory,
            image: imageUrl
        }

        const product = await productModel.create(productdata)


        res.json({ success: true ,message:"Product added"})

    } catch (error) {
        res.json({ success: false ,message:"Product not added" })
    }
}
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find()
        res.json({ success: true, products })
    } catch (error) {
        res.json({ success: false })
    }

}
const removeProduct = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true ,message:"Product removed" })
    } catch (error) {
        res.json({ success: false })
    }
}
const singleProduct = async (req,res) => {
    try {
        const product = await productModel.findById(req.body.id)
        res.send(product)
    } catch (error) {
        res.json({ success: false })
    }

}

export { addProduct, listProduct, removeProduct, singleProduct } 