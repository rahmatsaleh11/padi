import formidable from "formidable";
import { IBerita, ZBerita } from "../types/IBerita";
import { IResult } from "../types/IResult";
import { saveFile } from "../util/file";
import { deleteBerita, getAllBerita, getSingleBerita, postBerita, putBerita } from "../service/Berita";
import { Berita } from "@prisma/client";
import { z } from "zod";

export async function createBerita(berita: IBerita, image?: formidable.File): IResult<null> {
    const validation = ZBerita.safeParse(berita)
    if (validation.success === false) return {
        status: false,
        code: 400,
        message: validation.error.issues[0].path + " : " + validation.error.issues[0].message
    }

    let gambarNama: string | null = null
    if (image != null) {
        gambarNama = await saveFile(image.originalFilename || "gambar", image.filepath)
    }

    return await postBerita(berita, gambarNama)
}

export async function AllBerita(): IResult<Berita[]> {
    return await getAllBerita()
}

export async function singleBerita(id: number): IResult<Berita> {
    if (z.number().nonnegative().int().safeParse(id).success === false) return {
        status: false,
        code: 400,
        message: "ID tidak valid"
    }
    return await getSingleBerita(id)
}


export async function editBerita(id : number, berita: IBerita, image?: formidable.File): IResult<null> {
    
    if(z.number().nonnegative().int().safeParse(id).success === false) return {
        status : false,
        code : 400,
        message : "Id is not a number"
    }

    const validation = ZBerita.safeParse(berita)
    if (validation.success === false) return {
        status: false,
        code: 400,
        message: validation.error.issues[0].path + " : " + validation.error.issues[0].message
    }

    let gambarNama: string | null = null
    if (image != null) {
        gambarNama = await saveFile(image.originalFilename || "gambar", image.filepath)
    }

    return await putBerita(id, berita, gambarNama)
}

export async function RemoveBerita(id : number) :IResult<null> {
    if(z.number().nonnegative().int().safeParse(id).success === false) return {
        status : false,
        code : 400,
        message : "Id is not a number"
    }

    return await deleteBerita(id)

}