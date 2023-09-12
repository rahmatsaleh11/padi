import { useEffect, useState } from "react";
import { urlFetch } from "../util/fetchData";

export default function useFetch(url : string) {
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<{status : boolean, message : string, code : number} | null>(null)
    const [isLoading, setLoading] = useState(true)

    async function dataFetch(signal?: AbortSignal) {
        
        try {
            setLoading(true)
            const result = await fetch(urlFetch(url), { signal })
            const json = await result.json()
            console.log(json)
            if (!result.ok) {
                setLoading(false)
               return setError(json)
            }
            console.log(json.data)
            setData(json.data)
            setError(null)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setError({status : false,code : 500,message : "Server Error"})
            setLoading(false)
        } 
    }
    useEffect(() => {
        const abort = new AbortController()
        const signal = abort.signal
        dataFetch(signal)

        return () => {
            abort.abort()
        }
    }, [])
    return {
        data,
        error,
        isLoading,
        refetch: dataFetch
    }
}