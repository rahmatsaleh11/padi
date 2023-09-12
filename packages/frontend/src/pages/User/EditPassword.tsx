import { Button, Drawer, Box, Grid, Typography, TextField } from "@mui/material"
import { useState } from "react"
import useAuth from "../../hooks/useAuth"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Toast from "../../util/Toast"
import Loading from "../../util/Loading"
import { urlFetch } from "../../util/fetchData"


type Inputs = {
    password: string,
    new_password: string
}

export default function EditPassword() {
    const [open, setOpen] = useState(false)
    const { user, auth } = useAuth()

    const { register, formState: { errors }, handleSubmit, setError } = useForm<Inputs>({
        mode: "onBlur",
        resolver: zodResolver(z.object({
            password: z.string().nonempty().regex(/^[^\s]+$/, "Tidak boleh ada spasi"),
            new_password: z.string().nonempty().regex(/^[^\s]+$/, "Tidak boleh ada spasi"),
        }))
    })

    async function editPass(data: Inputs) {
        try {
            Loading.fire()
            const result = await fetch(urlFetch("/api/user/changepass/" + user?.id), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const json = await result.json()
            if (!result.ok) {
                Toast.fire("Error", json.message, "error")
                return setError("password", { message: json.message })
            }
            setOpen(false)
            auth()
            return Toast.fire("Success", json.message + "\nPerubahan akan terjadi setelah anda login ulang", "success")
        } catch (err) {
            console.log(err)
            Toast.fire("Error", "Server Error", "error")
            setError("password", { message: "Server Error" })
        }
    }

    return (
        <>
            <Button onClick={() => {
                setOpen(true)
            }}>
                Edit Password
            </Button>
            <Drawer
                open={open}
                anchor="right"
                onClose={() => setOpen(false)}
            >
                <Box component={"form"} onSubmit={handleSubmit(editPass)} sx={{
                    xs: {
                        width: "80vw"
                    }, sm: {
                        width: "100%"
                    },
                    padding: 4
                }} >
                    <Grid container direction={"column"} spacing={5}  >
                        <Grid item>
                            <Typography variant="h5">
                                Edit Password
                            </Typography>
                        </Grid>
                        <Grid item>
                            <TextField
                                {...register("password")}
                                label={"Old Password"}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                {...register("new_password")}
                                label={"New Password"}
                                error={!!errors.new_password}
                                helperText={errors.new_password?.message}
                            />
                        </Grid>
                        <Grid item>
                            <Button type="submit">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Drawer>
        </>
    )
}