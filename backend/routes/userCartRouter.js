import express, { Router } from "express"
import { addcart, updatecart, getusercart } from "../controllers/userCart.js"
import { get } from "mongoose"
const cartRouter = express.Router()
import authUser from "../middleware/userAuth.js"

cartRouter.post("/get",authUser, getusercart)
cartRouter.post("/add",authUser, addcart)
cartRouter.post("/update",authUser, updatecart)

export default cartRouter