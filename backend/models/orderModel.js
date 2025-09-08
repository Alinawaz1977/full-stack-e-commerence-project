import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    userid: { type: String, require: true },
    items: { type: Array, require: true },
    amount: { type: Number, require: true },
    address: { type: Object, require: true },
    paymentmethod: { type: String, require: true, default: "COD" },
    payment: { type: Boolean, default: false },
    date: { type: Number, require: true },
    status: { type: String, default: "Order Placed", require: true }
})

const orderModel = mongoose.models.orderModel || mongoose.model("order", orderSchema)

export default orderModel 