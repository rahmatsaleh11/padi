import { Prisma } from "@prisma/client";
import prisma from "../prisma/prisma";
import { IChangePassword, IUser, IUserAdd } from "../types/IUser";
import { compareHash, createHash } from "../util/bcrypt";
import { createToken } from "../util/jwt";

export async function Login(user: IUser) {
    try {
        const result = await prisma.user.findFirst({
            where: {
                username: user.username
            }
        })
        if (result == null) {
            return {
                status: false,
                code: 404,
                message: "User or Password incorrect"
            }
        }
        if (!compareHash(user.password, result.password)) return {
            status: false,
            code: 400,
            message: "User or Password incorrect"
        }

        const token = createToken(result)
        return {
            status: true,
            code: 200,
            message: "ok",
            data: {
                user: {
                    username: result.username,
                    role: result.role,
                    id: result.id,
                    no_hp: result.no_hp
                },
                token: token
            }
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

export async function checkUser(id: number) {
    try {

        const result = await prisma.user.findFirst({
            where: {
                id: id
            }
        })

        if (result == null) return {
            status: false,
            code: 404,
            message: "Not Found"
        }

        return {
            status: true,
            code: 200,
            message: "Found",
            data: {
                username: result.username,
                role: result.role,
                no_hp: result.no_hp,
                id: result.id
            }
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

export async function Register(user: IUserAdd) {
    try {
        const result = await prisma.user.create({
            data: {
                ...user,
                password: createHash(user.password)
            }
        })
        return {
            status: false,
            code: 200,
            message: "ok",
        }
    } catch (err) {
        console.log(err)
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                return {
                    status: false,
                    code: 400,
                    message: "Username in sudah ada"
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

export async function putUser(id: number, user: { username?: string, no_hp?: string }) {
    try {
        const result = await prisma.user.update({
            where: {
                id
            },
            data: { ...user }
        })
        return {
            status: true,
            code: 200,
            message: "ok",
        }
    } catch (err) {
        console.log(err)
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                return {
                    status: false,
                    code: 400,
                    message: "Username ini sudah ada"
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



export async function putUserPassword(id: number, { password, new_password }: IChangePassword) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                id
            }
        })
        if (user == null) {
            return {
                status: false,
                code: 404,
                message: "User not found"
            }
        }
        if (!compareHash(password, user.password)) {
            return {
                status: false,
                code: 400,
                message: "Password mismatch"
            }
        }
        await prisma.user.update({
            where: {
                id
            },
            data: {
                password: createHash(new_password)
            }
        })
        return {
            status: false,
            code: 200,
            message: "ok",
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

export async function getUsers() {
    try {
        const users = await prisma.user.findMany({
            select: {
                username: true,
                role: true,
                no_hp: true,
                id: true
            }
        })
        return {
            status: true,
            code: 200,
            message: "ok",
            data: users
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

export async function getContact() {
    try {
        const users = await prisma.user.findMany({
            select: {
                no_hp: true,
            },
            where : {
                role : "admin"
            }
        })

        return {
            status: true,
            code: 200,
            message: "ok",
            data: users.map(user => user.no_hp)
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