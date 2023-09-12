import { Router } from "express";
import { AuthMiddleware, CustomUserRequest } from "../util/auth";
import formidable from "formidable";
import { AllBerita, RemoveBerita, createBerita, editBerita, singleBerita } from "../controller/Berita";

const BeritaRout = Router()

BeritaRout.get('/:id', AuthMiddleware,async(req,res) => {
    const result = await singleBerita(parseInt(req.params.id, 10))
    return res.status(result.code).json(result)
})
BeritaRout.get('/', AuthMiddleware,async(req,res) => {
    const result = await AllBerita()
    return res.status(result.code).json(result)
})
BeritaRout.post("/", AuthMiddleware,async (req, res) => {
    const user = (req as CustomUserRequest).user
    if(user?.role != "admin") return res.status(403).json({
        status : false,
        code : 403,
        message : "Access Denied"
    })
    const formid = formidable()
    formid.parse(req, async(err, fields, file) => {
        if(err) {
            return res.status(400).json({
                status : false,
                code : 400,
                message : "Image Error"
            })
        }
        const result = await createBerita(fields as any, file.gambar as formidable.File)
        return res.status(result.code).json(result) 
    })
})
BeritaRout.put("/:id", AuthMiddleware,async(req,res) => {
    const user = (req as CustomUserRequest).user
    if(user?.role != "admin") return res.status(403).json({
        status : false,
        code : 403,
        message : "Access Denied"
    })
    const formid = formidable()
    formid.parse(req, async(err, fields, file) => {
        if(err) {
            return res.status(400).json({
                status : false,
                code : 400,
                message : "Image Error"
            })
        }
        const result = await editBerita(parseInt(req.params.id),fields as any, file.gambar as formidable.File)
        return res.status(result.code).json(result) 
    })
})

BeritaRout.delete("/:id", AuthMiddleware,async(req,res) => {
    const user = (req as CustomUserRequest).user
    if(user?.role != "admin") return {
        status : false,
        code : 403,
        message : "Access Denied"
    }
    const result = await RemoveBerita(parseInt(req.params.id))
    return res.status(result.code).json(result) 
})

export default BeritaRout