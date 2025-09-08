import validator from "validator"
import userModel from "../models/userModel.js"
import bcrypt, { hash } from "bcrypt"
import createToken from "../utils/userToken.js"
import usermodel from "../models/userModel.js"
import jwt from "jsonwebtoken"
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await usermodel.findOne({ email })
    if (!user) {
      res.send({ success: false, message: "Invalid Credentials" })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (isMatch) {
      const token = createToken(user._id)
      res.send({ success: true, token })
    }
    else {
      res.send({ success: false, message: "Invalid Credentials" })
    }
  } catch (error) {
    res.send({ success: false, message: error.message })
  }
}

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const exists = await userModel.findOne({ email })
    if (exists) {
      return res.status(409).send("Registration failed. Please check your details and try again.")
    }
    if (!validator.isEmail(email)) {
      return res.send("invalid email")
    }
    if (password.length < 3) {
      return res.send("password length must be greater than 3")
    }
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(password, salt)
    const newUser = await userModel.create({
      name,
      email,
      password: hashpassword
    })
    const token = createToken(newUser._id)
    res.json({ success: true, token })

  }
  catch (error) {
    res.send(error)
  }
}
const adminUser = async (req, res) => {
  try {

    const { email, password } = req.body
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.TOKEN)
      res.send({ success: true, token })
    }
    else {
      res.send({ success: false, message: "Invalid credentials" })
    }
  } catch (error) {
    res.send({ success: false, error })
  }
}

export { loginUser, registerUser, adminUser }