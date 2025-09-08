
import usermodel from "../models/userModel.js"


const addcart = async (req, res) => {
    try {
        const {userid, itemid, size } = req.body
    let user = await usermodel.findById(userid)
    let cartdata = await user.cartdata
    if (cartdata[itemid]) {
        if (cartdata[itemid][size]) {
            cartdata[itemid][size] += 1
        }
        else {
            cartdata[itemid][size] = 1
        }
    }
    else {
        cartdata[itemid] = {}
        cartdata[itemid][size] = 1
    }
    await usermodel.findByIdAndUpdate( userid , { cartdata })
    res.send({success:true,message:"Product added"})
    } catch (error) {
        res.send({success:false,message:error.message})
    }
    
}
const updatecart = async (req, res) => {
    const { userid, itemid, size, quantity } = req.body
    let user = await usermodel.findById(userid)
    let cartdata = await user.cartdata
    cartdata[itemid][size] = quantity;
    await usermodel.findByIdAndUpdate(userid,{cartdata})
    res.send({success:true,message:"Updated Cart"})
}
const getusercart = async (req, res) => {
    const { userid } = req.body
    let user = await usermodel.findById( userid )
    let cartdata = await user.cartdata
    res.send({success:true,cartdata})
}

export { getusercart, addcart, updatecart }