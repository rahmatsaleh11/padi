import { Info } from "@prisma/client";
import { IResult } from "../types/IResult";
import { z } from "zod";
import { getAllInfo, getSingleInfo, putInfo } from "../service/Info";
import { IInfo, ZInfo } from "../types/IInfo";
import formidable from "formidable";
import { saveFile, saveInfo } from "../util/file";

export async function getInfo(umur : number) : IResult<Info> {
    if(z.number().nonnegative().int().safeParse(umur).success === false) return {
        status : false,
        code : 400,
        message : "umur tidak valid"
    }
    return getSingleInfo(umur)
}
export async function AllInfo() :IResult<Info[]> {
    return await getAllInfo()
}

export async function editInfo(info : IInfo, umur : number, gambar : formidable.File) : IResult<null> {
    if(z.number().int().nonnegative().safeParse(umur).success === false) return {
        status : false,
        code : 400,
        message : "umur tidak valid"
    }
    const validation = ZInfo.safeParse(info)
    if(validation.success == false) return {
        status : false,
        code : 400,
        message : validation.error.issues[0].path + " : " + validation.error.issues[0].message
    }

    if(gambar != null) {
        await saveInfo(umur, gambar.filepath)
    }

    return putInfo(validation.data, umur)
}

export async function kirimGambarInfo(gambar : formidable.File, umur : number) : IResult<null> {
    if(z.number().nonnegative().safeParse(umur).success === false) return {
        status : false,
        code : 400,
        message :"Umur is not a valid number"
    }
    if(gambar == null) return {
        status : false,
        code : 400,
        message :"File is null"
    }
    const result = await saveInfo(umur, gambar.filepath)
    if(result) return {
        status : true,
        code : 200,
        message :"File successfully uploaded"
    }
    return {
        status : false,
        code : 400,
        message  :"Error"
    }
}