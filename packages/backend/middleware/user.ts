import { Router } from "express";
import LoginUser, { AllUser, AuthUser, Contact, RegisterUser, changePassword, changeUserNoHP, editUser } from "../controller/User";
const UserRout = Router()
import { AuthMiddleware, CustomUserRequest } from "../util/auth";

UserRout.post("/login", async(req,res) => {
    const result = await LoginUser(req.body);
    if(result.status) {
         res.cookie("token", result.data?.token, {signed : true, maxAge : 60 * 60 * 1000})
    }
    return res.status(result.code).json(result);
})

UserRout.post("/register", async(req,res) => {
    const result = await RegisterUser({...req.body, role : "user"});
    return res.status(result.code).json(result);
})

UserRout.get("/authuser", async(req,res) => {
    const result = await AuthUser(req.signedCookies.token)
    if(result.status === false) {
        res.cookie("token", "", {maxAge : 0})
    }
    return res.status(result.code).json(result)
})

UserRout.get("/logout", AuthMiddleware,(req,res) => {
    res.cookie("token", "", {maxAge : 0}).send("Ok")
})

UserRout.get("/users", AuthMiddleware,async(req,res) => {
    const user = (req as CustomUserRequest).user
    if(user?.role != "admin") return res.status(403).json({status : false,message : "You not allowed to access this", code : 403})
    const result = await AllUser()
    return res.status(result.code).json(result)
})

UserRout.put("/edituser/:id", async(req,res) => {
    const result = await editUser(parseInt(req.params.id), req.body.username)
    return res.status(result.code).json(result)
})
UserRout.put("/editnohp/:id", async(req,res) => {
    const result = await changeUserNoHP(parseInt(req.params.id), req.body.no_hp)
    return res.status(result.code).json(result)
})

UserRout.put("/changepass/:id", async(req,res) => {
    const result = await changePassword(parseInt(req.params.id), req.body)
    return res.status(result.code).json(result)
})

UserRout.get("/contacts", AuthMiddleware, async(req,res) => {
    const result = await Contact()
    return res.status(result.code).json(result)
})

export default UserRout