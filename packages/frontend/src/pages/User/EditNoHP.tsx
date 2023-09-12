import { Button, Drawer, Box, Grid, TextField, Typography } from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import useAuth from "../../hooks/useAuth";
import { useState } from "react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Loading from "../../util/Loading";
import Toast from "../../util/Toast";
import { urlFetch } from "../../util/fetchData";

type Inputs = {
    newno_hp: string
}

export default function EditNOHP() {
    const { auth, user } = useAuth()
    const [open, setOpen] = useState(false)
    const { register, setError, formState: { errors }, handleSubmit } = useForm<Inputs>({
        mode: "onBlur",
        values: {
            newno_hp: user?.no_hp || ""
        },
        resolver: zodResolver(z.object({
            newno_hp: z.string().nonempty().regex(/^[0-9]+$/, "Tidak boleh ada spasi dan harus angka"),
        }))
    })
    async function updateUserName(data: Inputs) {
        try {
            Loading.fire()
            const result = await fetch(urlFetch("/api/user/editnohp/" + user?.id), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ no_hp: data.newno_hp })
            })
            const json = await result.json()
            if (!result.ok) {
                Toast.fire("Error", json.message, "error")
                return setError("newno_hp", { message: json.message })
            }
            setOpen(false)
            auth()
            return Toast.fire("Success", json.message + "\nPerubahan akan terjadi setelah anda login ulang", "success")
        } catch (err) {
            console.log(err)
            Toast.fire("Error", "Server Error", "error")
        }
    }

    return (
        <>
            <Button startIcon={<BorderColorIcon />} onClick={() => setOpen(true)}>

            </Button>

            <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                <Box component={"form"} onSubmit={handleSubmit(updateUserName)} sx={{ width: { xs: "80vw", sm: "100%" } }}>
                    <Grid container direction={"column"} spacing={4} sx={{
                        xs: {
                            justifyContent: "center",
                            alignItems: "center"
                        }, sm: {
                            justifyContent: "start",
                            alignItems: "start"
                        }
                    }}>
                        <Grid item>
                            <Typography variant="h4">
                                Ganti Nomor Handphone
                            </Typography>
                        </Grid>
                        <Grid item>
                            <TextField size="small" label={"New Username"} {...register("newno_hp")}
                                error={!!errors.newno_hp}
                                helperText={errors.newno_hp?.message}
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