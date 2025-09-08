import express from "express"
import {placeOrder,placeOrderrazorpay,placeOrderstripe,allOrders,updatestatus,userOrders, verifystripe} from "../controllers/orderController.js"
import adminauth from "../middleware/adminAuth.js"
import authUser from "../middleware/userAuth.js"

const orderRouter=express.Router()

// admin features
orderRouter.post("/list",adminauth,allOrders)
orderRouter.post("/update",adminauth,updatestatus)

// payment features
orderRouter.post("/place",authUser,placeOrder)
orderRouter.post("/stripe",authUser,placeOrderstripe)
orderRouter.post("/razorpay",authUser,placeOrderrazorpay)
orderRouter.post("/verifystripe",authUser,verifystripe)

// user features
orderRouter.post("/userorders",authUser,userOrders)

export default orderRouter