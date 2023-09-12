import { createContext, useState, useEffect } from "react"
import {  useLocation, useNavigate } from "react-router-dom"
import Toast from "../util/Toast"
import Loading from "../util/Loading"
import { urlFetch } from "../util/fetchData"
type User = {
    username: string,
    id: number,
    role: "user" | "admin",
    no_hp : string
}

interface AuthTypes {
    user: null | User,
    isLoading: boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    login: (username: string, password: string, cb: (...any: any) => void) => Promise<void>,
    logout: () => Promise<void>
    setUser: (value: React.SetStateAction<User | null>) => void,
    auth: () => Promise<void>
}

export const AuthContext = createContext<AuthTypes>({
    user: null,
    isLoading: false,
    login: async (username: string, password: string) => {
        console.log(username)
        console.log(password)
    },
    async logout() {
        console.log("logged out")
    },
    setUser: () => { return },
    auth: async () => { return }
})

export default function Auth({ children }: { children: any }) {
    const [user, setUser] = useState<null | User>(null)
    const [isLoading, setLoading] = useState<boolean>(true)
    const nav = useNavigate()
    const loc = useLocation()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function login(username: string, password: string, cb: (...any: any) => void) {
        try {
            Loading.fire()
            const fetData = await fetch(urlFetch("/api/user/login"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            })
            const data = await fetData.json()
            if (!fetData.ok) {
                cb(data.message)
                Toast.fire({
                    title: "Login Failed",
                    icon: "error"
                })
                return
            }
            Toast.fire({
                title: "Login Success",
                icon: "success"
            })
            const returnData = new URLSearchParams(loc.search).get("callback")
            console.log(data.data)
            setUser(data.data.user)
            if (returnData != null) {
                nav(returnData)
                return
            }
            nav("/")
        } catch (err) {
            console.log(err)
            Loading.close()
            cb("Server Error")
        }
    }

    async function logout() {
        try {
            await fetch(urlFetch("/api/user/logout"))
            setUser(null)
            nav("/login")
        } catch (err) {
            console.log(err)
        }
    }

    
    async function auth() {
        try {
            setLoading(true)
            const fetData = await fetch(urlFetch("/api/user/authuser"))
            const data = await fetData.json()


            if (!fetData.ok) {
                console.log(data.message)
                setUser(null)
                if (loc.pathname == "/" || loc.pathname == "/login") {
                    nav("/login")
                } else {
                    const cb = new URLSearchParams({ callback: loc.pathname })
                    nav('/login?' + cb)
                }
                return
            }
            console.log(loc.pathname)
            if (loc.pathname == "/login") {
                nav("/")
            }
            setUser(data.data)
        } catch (err) {
            console.log(err)
            setUser(null)

            if (loc.pathname == "/" || loc.pathname == "/login") {
                nav("/login")
            } else {
                const cb = new URLSearchParams({ callback: loc.pathname })
                nav('/login?' + cb)
            }

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        auth()
    }, [])
    const defaultValue = {
        user,
        isLoading,
        login,
        logout,
        setUser,
        auth
    }
    return (
        <AuthContext.Provider value={defaultValue}>
            {
                children
            }
        </AuthContext.Provider>
    )
}