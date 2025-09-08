import express, { Router } from "express"
import { addProduct, listProduct, removeProduct, singleProduct } from "../controllers/productController.js"
import upload from "../middleware/multer.js"
import adminauth from "../middleware/adminAuth.js"

const productRoute=express.Router()

productRoute.post("/add",adminauth,upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),addProduct)
productRoute.post("/remove",adminauth,removeProduct)
productRoute.post("/signle",adminauth,singleProduct)
productRoute.get("/list",listProduct)

export default productRoute