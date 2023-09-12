import {TypeOf, z} from "zod"

export const ZUserAdd = z.object({
    username : z.string().nonempty().regex(/^[^\s]+$/, "Tidak boleh ada spasi"),
    password : z.string().nonempty().regex(/^[^\s]+$/, "Tidak boleh ada spasi"),
    role : z.enum(["admin", "user"]),
    no_hp : z.string().nonempty().regex(/^[0-9]+$/)
})

export const ZUser = z.object({
    username : z.string().nonempty().regex(/^[^\s]+$/, "Tidak boleh ada spasi"),
    password : z.string().nonempty().regex(/^[^\s]+$/, "Tidak boleh ada spasi"),
})

export const ZChangePassword = z.object({
    password : z.string().nonempty().regex(/^[^\s]+$/, "Tidak boleh ada spasi"),
    new_password  : z.string().nonempty().regex(/^[^\s]+$/, "Tidak boleh ada spasi"),
})

export type IChangePassword = z.infer<typeof ZChangePassword>

export type IUser = z.infer<typeof ZUser>

export type IUserAdd = z.infer<typeof ZUserAdd>

export type IUserOnly = {
    id : number, username : string, role : string, no_hp : string
}