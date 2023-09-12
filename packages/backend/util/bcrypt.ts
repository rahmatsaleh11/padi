import bcrypt from "bcrypt"
export function createHash(password : string) {
    const hashPassword  = bcrypt.hashSync(password, 10)
    return hashPassword
}

export function compareHash(plain : string, hash : string) {
    return bcrypt.compareSync(plain, hash)
} 