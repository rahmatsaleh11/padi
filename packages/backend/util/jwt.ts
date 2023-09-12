import { user } from "@prisma/client";
import jwt from "jsonwebtoken"
export function createToken({id, username} : user) {
    const token = jwt.sign({
        username,
        id
    }, process.env.SECRET_KEY || "", {expiresIn: '1h'})
    return token
}

export function compareToken(token : string) {
    try {

        const payload : any = jwt.verify(token, process.env.SECRET_KEY || "")
        return {
            username : payload.username,
            role : payload.role,
            id : payload.id
        }        
    }catch(err) {
        console.log(err)
        return false
    }
} 