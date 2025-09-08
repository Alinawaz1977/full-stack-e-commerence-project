import  jwt  from "jsonwebtoken"

const createToken=(id)=>{
    return jwt.sign({id},process.env.TOKEN)
}

export default createToken