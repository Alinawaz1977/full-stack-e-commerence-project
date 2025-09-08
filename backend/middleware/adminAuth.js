import jwt from "jsonwebtoken"

const adminauth = async (req, res, next) => {
    try {
        const { token } = req.headers
        if (!token) {
           return res.send({ success: false, message: "Invalid credentials login again" })
        }
        const decodeToken = jwt.verify(token, process.env.TOKEN)
        if (decodeToken !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
        ) {
          return  res.send({ success: false, message: 'Invalid credentials login again' })
        }
        next()
    } catch (error) {
        res.send({ success: false, message: error.message })
    }

}

export default adminauth