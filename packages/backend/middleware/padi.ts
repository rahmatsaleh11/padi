import { Router } from "express";
import { createPadi, editPadi, getPadiInfo } from "../controller/Padi";
import { AuthMiddleware, CustomUserRequest } from "../util/auth";

const PadiRout = Router()

PadiRout.get("/",AuthMiddleware, async(req , res) => {
    const user = (req as CustomUserRequest).user
    const result = await getPadiInfo(user?.id || -1)
    return res.status(result.code).json(result)   
})

PadiRout.post("/", AuthMiddleware, async(req , res) => {
    const user = (req as CustomUserRequest).user
    const result = await createPadi(req.body, user?.id || -1)
    return res.status(result.code).json(result)
})

PadiRout.put("/", AuthMiddleware, async(req,res) => {
    const user = (req as CustomUserRequest).user
    const result = await editPadi(req.body, user?.id || -1)
    return res.status(result.code).json(result)
})

export default PadiRout