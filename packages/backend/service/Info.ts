import prisma from "../prisma/prisma";
import { IInfo } from "../types/IInfo";

export async function getSingleInfo(umur : number) {
    try {
        const result = await prisma.info.findFirst({
            where : {
                umur
            }
        })
        if(result == null) return {
            status : false,
            message : "Data tidak ditemukan",
            code : 404
        }
        return {
            status : true,
            code : 200,
            message :"Ok",
            data : result
        }
    }catch(err) {
        console.log(err);
        return {
            status : false,
            message : "Server error",
            code : 500
        }
    }
}

export async function getAllInfo() {
    try {
        const result = await prisma.info.findMany()
        return {
            status : true,
            code : 200,
            message :"Ok",
            data : result
        }
    }catch(err) {
        console.log(err);
        return {
            status : false,
            message : "Server error",
            code : 500
        }
    }
}

export async function putInfo(data : IInfo, umur : number) {
    try {
        await prisma.info.update({
            where : {
                umur
            },
            data : {
              ...data
            }
        })
        return {
            status : true,
            code : 200,
            message :"Ok",
            
        }
    }catch(err) {
        console.log(err)
        return {
            status : false,
            code : 500,
            message : "Server error"
        }
    }
}