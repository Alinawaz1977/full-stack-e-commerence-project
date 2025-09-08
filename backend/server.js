import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import connectdb from "./config/mongodb.js"
import connectcloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import productRoute from "./routes/productRoute.js"
import cartRouter from "./routes/userCartRouter.js"
import orderRouter from "./routes/orderRoute.js"


dotenv.config()
const app = express()
const port = process.env.port || 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
connectdb()
connectcloudinary()



app.get("/", (req, res) => {
    res.send("server is running successfully")
})

app.use("/api/user", userRouter)
app.use("/api/product", productRoute)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.listen(port, () => {
    console.log(`server is running at port http://localhost:${port}`);
})