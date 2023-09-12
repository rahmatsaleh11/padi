import { padi } from "@prisma/client";
import { IResult } from "../types/IResult";
import { z } from "zod";
import { getUserPadi, postPadi, putPadi } from "../service/Padi";
import { IPadiAdd, IPadiEdit, ZPadiAdd, ZPadiEdit } from "../types/IPadi";

export async function getPadiInfo(user_id: number): IResult<padi> {
    if (z.number().int().nonnegative().safeParse(user_id).success === false) return {
        status: false,
        code: 400,
        message: "user_id must be a number"
    }
    return await getUserPadi(user_id)
}

export async function createPadi(padi: IPadiAdd, user_id : number) :IResult<null> {
    const validation = ZPadiAdd.safeParse(padi)
    if (validation.success === false) return {
        status: false,
        code: 400,
        message: validation.error.issues[0].path + " : " + validation.error.issues[0].message
    }

    return await postPadi(validation.data, user_id)
}

export async function editPadi(data : IPadiEdit, user_id : number) : IResult<null> {
    const validation = ZPadiEdit.safeParse(data)
    if(validation.success === false) return {
        status : false,
        code : 400,
        message : validation.error.issues[0].path + " : " + validation.error.issues[0].message
    }
    return await putPadi(user_id, validation.data)
}