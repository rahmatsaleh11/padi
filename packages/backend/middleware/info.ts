import { Router } from "express";
import { AllInfo, editInfo, getInfo, kirimGambarInfo } from "../controller/Info";
import * as fs from "fs"
import { AuthMiddleware, CustomUserRequest } from "../util/auth";
import formidable from "formidable";
const InfoRout = Router()

InfoRout.get("/", AuthMiddleware, async (req, res) => {
    const user = (req as CustomUserRequest).user
    if (user?.role != "admin") return res.status(403).json({ status: false, message: "You not allowed to access this", code: 403 })

    const result = await AllInfo()
    return res.status(result.code).json(result)
});

InfoRout.get("/:umur", async (req, res) => {

    const result = await getInfo(parseInt(req.params.umur))
    return res.status(result.code).json(result);
})

InfoRout.get("/gambar/:umur", async (req, res) => {
    const getInfoGambarList = fs.readdirSync("gambar/info")
    const names = getInfoGambarList.map(filename => filename.split(".").at(0))

    const umur = req.params.umur
    if (!names.includes(umur)) return res.status(404).send("Not Found")
    const ind = names.indexOf(umur)
    try {
        return res.status(200).send(fs.readFileSync("gambar/info/" + getInfoGambarList[ind]))
    } catch (err) {
        return res.status(500).send("Server Error")
    }

})

InfoRout.put("/:umur", AuthMiddleware, async (req, res) => {
    const user = (req as CustomUserRequest).user
    if (user?.role != "admin") return res.status(403).json({ status: false, message: "You not allowed to access this", code: 403 })
    const formid = formidable()
    formid.parse(req, async (err, field, files) => {
        if (err) return res.status(500).json({
            status: false,
            code: 500,
            message: "Server Error"
        })

        const result = await editInfo(field as any, parseInt(req.params.umur), files.gambar as formidable.File)
        return res.status(result.code).json(result)
    })
})
    

    InfoRout.put("/gambar/:umur", AuthMiddleware, async (req, res) => {
    const user = (req as CustomUserRequest).user
    if (user?.role != "admin") return res.status(403).json({ status: false, message: "You not allowed to access this", code: 403 })
    const formid = formidable()
    formid.parse(req, async (err, field, files) => {
        if (err) return res.status(500).json({
            status: false,
            code: 500,
            message: "Server Error"
        })
        const result = await kirimGambarInfo(files.gambar as formidable.File, parseInt(req.params.umur as string))
        return res.status(result.code).json(result)
    })
})

    export default InfoRout