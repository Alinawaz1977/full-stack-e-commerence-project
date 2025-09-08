import Stripe from "stripe"
import pkg from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { verify } = pkg;
import usermodel from "../models/userModel.js"

// rest of your code...

import orderModel from "../models/orderModel.js"
//place order using cod 


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const currency = "USD"
const deliveryCharges = 10

const placeOrder = async (req, res) => {
    try {
        const { userid, address, amount, items } = req.body

        const userdata = {
            userid,
            address,
            amount,
            items,
            payment: false,
            paymentmethod: "COD",
            date: Date.now()
        }
        const newOrder = await orderModel.create(userdata)
        await usermodel.findByIdAndUpdate(userid, { cartdata: {} })
        res.send({ success: true, message: "Order Placed" })
    } catch (error) {
        res.send({ success: true, message: error.message })
    }
}
//place order using stripe 
const placeOrderstripe = async (req, res) => {
    try {
        const { userid, address, amount, items } = req.body
        const { origin } = req.headers

        const userdata = {
            userid,
            address,
            amount,
            items,
            payment: false,
            paymentmethod: "stripe",
            date: Date.now()
        }
        const newOrder = await orderModel.create(userdata)

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 280
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "delievery charges"
                },
                unit_amount: deliveryCharges * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderid=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderid=${newOrder._id}`, 
            line_items,
            mode: "payment",
        })
        res.send({ success: true, session_url: session.url })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}

const verifystripe = async (req, res) => {
    try {
        const { orderid, userid, success } = req.body;
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderid, { payment: true })
            await usermodel.findByIdAndUpdate(userid, { cartdata: {} })
            res.send({success:true})
        }
        else {
            await orderModel.findByIdAndDelete(orderid)
            res.json({ success: false })
        }
    } catch (error) {
        res.send({ success: false, message: error.message })
    }

}

//place order using razorpay 
const placeOrderrazorpay = async (req, res) => {

}
//all orders data for admin panen 
const allOrders = async (req, res) => {
    const order = await orderModel.find()


    res.send({ success: true, order })
}
// orders for user
const userOrders = async (req, res) => {
    try {
        const { userid } = req.body
        const order = await orderModel.find({ userid })
        res.send({ success: true, order })
    } catch (error) {
        res.send(error.message)
    }

}
// update status admin pannel
const updatestatus = async (req, res) => {
    try {
        const { orderid, status } = req.body;
        await orderModel.findByIdAndUpdate(orderid, { status })
        res.send({ success: true, message: "status updated" })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }

}
export { placeOrder, placeOrderrazorpay, placeOrderstripe, allOrders, updatestatus, userOrders, verifystripe }