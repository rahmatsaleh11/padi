import express, { Router } from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import UserRout from "./middleware/user"
import PadiRout from "./middleware/padi"
import BeritaRout from "./middleware/berita"
import { AuthMiddleware } from "./util/auth"
import * as fs from "fs"
import { z } from "zod"
import { initAccount, initInfo } from "./util/infoDefault"
import InfoRout from "./middleware/info"
import cors from "cors"
dotenv.config()
const app = express()
const ApiRout = Router()
initInfo()
initAccount()
app.use(cors({
    origin :"*"
}))

app.use(express.json())
app.use(cookieParser(process.env.SECRET_KEY))

ApiRout.use("/user", UserRout)
ApiRout.use("/padi", PadiRout)
ApiRout.use("/berita", BeritaRout)
ApiRout.use("/info", InfoRout)

ApiRout.get("/gambar/:path", AuthMiddleware, async(req,res) => {
    try {
        const path = req.params.path
        if(z.string().nonempty().safeParse(path).success === false) return res.status(400).send("Invalid file path")
        const gambar = fs.readFileSync("gambar/"+path)
        return res.status(200).send(gambar)
    }catch(err) {
        console.log(err)
        return res.status(404).send("Not Found")
    }
})
ApiRout.get("/", (req,res) => {
    res.status(200).send("Hello World")
})
app.use("/api", ApiRout)

app.listen(process.env.PORT || 3000, () => {
    console.log("listening on port : "+process.env.PORT || 3000)
})