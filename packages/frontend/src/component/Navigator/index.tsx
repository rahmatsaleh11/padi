import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Navigator({to} : {to : string}) {
    
    const nav = useNavigate()
    useEffect(() => {
        nav(to)
    }, [])
    
    return(
        <></>
    )
}