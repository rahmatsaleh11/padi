import { title } from 'process';
import prisma from '../prisma/prisma';
import { IBerita } from './../types/IBerita';
import { deleteFile } from '../util/file';
export async function postBerita(berita: IBerita, gambarName?: string | null) {
    try {
        const data: IBerita & { created_at: Date, thumb?: string } = {
            title: berita.title,
            isi: berita.isi,

            created_at: new Date(),
        }
        if (gambarName != null) {
            data.thumb = gambarName
        }
        await prisma.berita.create({
            data: data
        })
        return {
            status: false,
            code: 200,
            message: "Ok"
        }
    } catch (err) {
        console.log(err)
        return {
            status: false,
            code: 500,
            message: "server error"
        }
    }
}

export async function getAllBerita() {
    try {
        const result = await prisma.berita.findMany({
            orderBy: {
                created_at: "desc"
            }
        })
        return {
            status: true,
            code: 200,
            data: result,
            message: "Ok"
        }
    } catch (err) {
        console.log(err)
        return {
            status: false,
            code: 500,
            message: "server error"
        }
    }
}


export async function getSingleBerita(id: number) {
    try {
        const result = await prisma.berita.findFirst({
            where: {
                id
            }
        })
        if (result == null) return {
            status: false,
            code: 404,
            message: "berita tidak ditemukan"
        }
        return {
            status: true,
            code: 200,
            data: result,
            message: "Ok"
        }
    } catch (err) {
        console.log(err)
        return {
            status: false,
            code: 500,
            message: "server error"
        }
    }
}

export async function putBerita(id: number, berita: IBerita, gambarName?: string | null) {
    try {
        const data: IBerita & { thumb?: string } = {

            title: berita.title,
            isi: berita.isi

        }
        if (gambarName != null) {
            data.thumb = gambarName
        }
        await prisma.berita.update({
            where: {
                id
            },
            data: data
        })
        return {
            status: false,
            code: 200,
            message: "Ok"
        }
    } catch (err) {
        console.log(err)
        return {
            status: false,
            code: 500,
            message: "server error"
        }
    }
}

export async function deleteBerita(id: number) {
    try {
        const berita = await prisma.berita.findFirst({
            where: {
                id
            }
        })
        if (berita == null) return {
            status: false,
            code: 404,
            message: "berita tidak ditemukan"
        }
        deleteFile(berita.thumb || "errorTest")
        await prisma.berita.delete({
            where: {
                id
            }
        })
        return {
            status: true,
            code: 200,
            message: "Ok"
        }
    } catch (err) {
        console.log(err)
        return {
            status: false,
            code: 500,
            message: "server error"
        }
    }
}