import jwt from "jsonwebtoken"

const authUser = async (req, res, next) => {
    const { token } = req.headers
    if (!token) {
        return res.send({ success: false, message: "Invalid credentials Login again" })
    }
    try {
        const token_decode = jwt.verify(token, process.env.TOKEN)
        req.body.userid = token_decode.id
        next()
    } catch (error) {
        return res.send({ success: false, message: error.message })
    }
}

export default authUser
