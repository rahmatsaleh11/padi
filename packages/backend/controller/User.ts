import { z } from "zod";
import { Login, Register, checkUser, getContact, getUsers, putUser, putUserPassword } from "../service/User";
import { IResult } from "../types/IResult";
import { IChangePassword, IUser, IUserAdd, IUserOnly, ZChangePassword, ZUser, ZUserAdd } from "../types/IUser";
import { compareToken } from "../util/jwt";
import { Iid } from "../types/IUtil";

export default async function LoginUser(user: IUser): IResult<{
    user: {
        username: string,
        role:string,
        id : number
    },
    token : string
}> {
    const validation = ZUser.safeParse(user)
    if(validation.success === false) return {
        status : false,
        code : 400,
        message : validation.error.issues[0].path + " : " + validation.error.issues[0].message 
    }

    return await Login(user)
}

export async function RegisterUser(user: IUserAdd): IResult<null> {
    const validation = ZUserAdd.safeParse(user)
    if(validation.success === false) {
        return {
            status : false,
            code : 400,
            message :  validation.error.issues[0].path + " : " + validation.error.issues[0].message 
        }
    }
    return await Register(user)
}

export async function AuthUser(token : string) :IResult<{
    username : string,
    role : "admin" | "user",
    id : number
}> {
    if(!z.string().nonempty().safeParse(token).success) {
        return {
            status : false,
            code : 400,
            message : "Invalid token"
        }
    }

    const decode = compareToken(token)
    if(decode === false) {
        return {
            status : false,
            code : 401,
            message : "Not authorized"
        }
    }

    

    return await checkUser(decode.id)
}

export async function editUser(id : number, username : string) : IResult<null> {
    if(z.number().int().nonnegative().safeParse(id).success === false) return {
        status : false,
        code : 400,
        message : "Id is not a number"
    }

    if(z.string().nonempty().safeParse(username).success === false) return {
        status : false,
        code : 400,
        message :"Username is not a string or empty"
    }

    return await putUser(id, {username})

}

export async function changePassword(id : number, passwords : IChangePassword) :IResult<null> {
    if(Iid.safeParse(id).success === false) return {
        status : false,
        code : 400,
        message : "id is not number"
    }
    const validation = ZChangePassword.safeParse(passwords)
    console.log(passwords)
    if(validation.success === false) return {
        status : false,
        code : 400,
        message : validation.error.issues[0].path + " : " + validation.error.issues[0].message 
    }

    if(passwords.password == passwords.new_password) {
        return {
            status : false,
            code : 400,
            message : "New password cant be same as old password"
        }
    }

    return await putUserPassword(id, passwords)

}

export async function changeUserNoHP(id : number, newno_hp : string) {
    if(z.number().int().nonnegative().safeParse(id).success === false) return {
        status : false,
        code : 400,
        message : "Id is not a number"
    }

    if(z.string().nonempty().regex(/^[0-9]+$/, "Harus angka").safeParse(newno_hp).success === false) return {
        status : false,
        code : 400,
        message :"No HP is not a string or empty"
    }

    return await putUser(id, {no_hp : newno_hp})
}

export async function AllUser() :IResult<IUserOnly[]> {
    return await getUsers()
}

export async function Contact() : IResult<string[]> {
    return await getContact()
}