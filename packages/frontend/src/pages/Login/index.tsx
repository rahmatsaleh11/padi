import { Box, Grid, TextField, Typography, Button, buttonClasses, Paper } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react"
import { z } from "zod";
import Toast from "../../util/Toast";

import Loading from "../../util/Loading";
import { urlFetch } from "../../util/fetchData";
type Input = {
    username: string,
    password: string,
    no_hp? : string
}
export default function Login() {
    const [isLogin, setIsLogin] = useState(true)
    const { login } = useAuth()
    const { setError, register, handleSubmit, formState: { errors } } = useForm<Input>({
        mode: "onBlur",
        resolver: zodResolver(z.object({
            username: z.string().nonempty().regex(/^[^\s]+$/, "Tidak boleh ada spasi"),
            password: z.string().nonempty().regex(/^[^\s]+$/, "Tidak boleh ada spasi"),
            no_hp: z.string().regex(/^[^\s]+$/, "Harus angka").optional()
        }))
    })

    const loginUser: SubmitHandler<Input> = data => {
        if (isLogin) {
            login(data.username, data.password, (err) => {
                setError("username", { message: err })
            })
            return
        }
        Loading.fire()
        Register(data)
    };
    async function Register(data: Input) {
        try {
            const result = await fetch(urlFetch("/api/user/register"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...data, role: "admin" })
            })
            const json = await result.json()
            if (result.ok === false) {
                Toast.fire("Error", json.message, "error")
                return
            }
            Toast.fire("Berhasil membuat akun", "", "success")
        } catch (err) {
            console.log(err)
            Toast.fire("Error", "", "error")
        }
    }
    return (
        <Box component={"form"} onSubmit={handleSubmit(loginUser)} sx={{ backgroundImage: "url(/Padi.jpeg)" }} >
            <Grid container direction={"column"} sx={{ minHeight: "100vh" }} alignItems={"center"} justifyContent={"center"} spacing={3}>
                <Grid item>
                    <Paper sx={{ paddingX: 5, paddingY: 2 }}>
                        <Grid container direction={"column"} spacing={3} alignItems={"center"}>
                            <Grid item>
                                <Typography variant="h2">
                                    Login
                                </Typography>
                            </Grid>
                            <Grid item>
                                <TextField label={"Username"} {...register("username")}

                                    error={!!errors.username}
                                    helperText={errors.username?.message as string || ""}
                                />
                            </Grid>
                            <Grid item>
                                <TextField label={"Password"} type="password" {...register("password")}


                                    error={!!errors.password}
                                    helperText={errors.password?.message as string || ""}
                                />
                            </Grid>
                            {
                                !isLogin && <Grid item>
                                    <TextField label={"No HP"} type="tel" {...register("no_hp")}
                                        error={!!errors.no_hp}
                                        helperText={errors.no_hp?.message as string || "Gunakan nomor wa yang masih aktif"}
                                    />
                                </Grid>
                            }
                            <Grid item>
                                <Button type="submit" variant="outlined">
                                    {isLogin ? "Login" : "Register"}
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button sx={{
                                    [`&.${buttonClasses.text}`]: {
                                        fontSize: "9px",
                                        textDecoration: "underline"
                                    }
                                }} onClick={() => {
                                    setIsLogin(ev => !ev)
                                }}>
                                    {isLogin ? "Belum mempunyai akun?" : "sudah mempunyai akun?"}
                                </Button>
                            </Grid>
                        </Grid>

                    </Paper>

                </Grid>


            </Grid>
        </Box>
    )
}