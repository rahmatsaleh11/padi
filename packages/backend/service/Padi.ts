import { Prisma } from "@prisma/client"
import prisma from "../prisma/prisma"
import { IPadiAdd, IPadiEdit } from "../types/IPadi"

export async function getUserPadi(user_id: number) {
    try {
        const result = await prisma.padi.findFirst({
            where: {
                user_id: user_id
            }
        })
        if (result == null) {
            return {
                status: false,
                code: 404,
                message: "Padi tidak ditemukan"
            }
        }
        return {
            status: true,
            code: 200,
            message: "Ok",
            data: result
        }
    } catch (err) {
        console.log(err)
        return {
            status: false,
            code: 500,
            message: "Server Error"
        }
    }
}

export async function postPadi(padi: IPadiAdd, user_id: number) {
    try {
        await prisma.padi.create({
            data: {
                ...padi,
                user: {
                    connect: {
                        id: user_id
                    }
                }
            }
        })

        return {
            status: true,
            code: 200,
            message: "Ok",

        }
    } catch (err) {
        console.log(err)
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                return {
                    status: false,
                    code: 409,
                    message: "Padi sudah ada"
                }
            }
            if (err.code === "P2014") {
                return {
                    status: false,
                    code: 400,
                    message: "Padi untuk user ini sudah ada"
                }
            }
        }
        return {
            status: false,
            code: 500,
            message: "Server Error"
        }
    }
}

export async function putPadi(user_id: number, padi: IPadiEdit) {
    try {
        await prisma.padi.update({
            where: {
                user_id: user_id
            },
            data: {
                ...padi
            }
        })
        return {
            status: true,
            code: 200,
            message: "Ok",
        }
    } catch (err) {
        console.log(err)
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                return {
                    status: false,
                    code: 409,
                    message: "Padi sudah ada"
                }
            }
            if (err.code === "P2014") {
                return {
                    status: false,
                    code: 400,
                    message: "Padi untuk user ini sudah ada"
                }
            }

        }
        return {
            status: false,
            code: 500,
            message: "Server Error"
        }
    }
}