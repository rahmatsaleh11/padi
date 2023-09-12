import { zodResolver } from "@hookform/resolvers/zod";
import { BlueSkyButton } from "../../../component/CustomButton";
import { Drawer, Grid, Box, TextField, Typography } from "@mui/material"
import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod";
import Toast from "../../../util/Toast";
import Loading from "../../../util/Loading";
import { urlFetch } from "../../../util/fetchData";

interface Inputs {
    title: string,
    isi: string
}

export function EditBerita({ refetch, data }: { refetch: any, data: { id: number, title: string, isi: string, thumb?: string } }) {
    const fileRef = useRef<HTMLInputElement>(null)
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState<any>(null)
    const { register, formState: { errors }, handleSubmit } = useForm<Inputs>({
        resolver: zodResolver(
            z.object({
                title: z.string().nonempty().max(200),
                isi: z.string().nonempty()
            })
        ),
        mode: "onBlur",
        values: { ...data }
    })

    async function editBerita(data2: Inputs) {
        console.log(data2)
        setOpen(false)
        try {
            Loading.fire()
            const form = new FormData()
            form.append("title", data2.title)
            form.append("isi", data2.isi)
            form.append("gambar", file)
            const result = await fetch(urlFetch("/api/berita/"+ data.id) , {
                method: "PUT",
                body: form
            })
            const json = await result.json()
            if (result.ok === false) return Toast.fire("Error", json.message, "error")
            refetch()
            return Toast.fire("Success", json.message, "success")
        } catch (err) {
            console.log(err)
            Toast.fire("Error", "Server Error", "error")
        }
    }
    return (
        <>
            <BlueSkyButton variant="contained" color="primary" onClick={() => setOpen(true)}>
                Edit
            </BlueSkyButton>
            <Drawer
                anchor="bottom"
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box component={"form"} onSubmit={handleSubmit(editBerita)} height={"90vh"} maxHeight={"90vh"} overflow={"auto"}>
                    <Grid container direction={"column"} spacing={3} width={"100%"}>
                        <Grid item>
                            <Typography variant="h5">
                                Edit Berita
                            </Typography>
                        </Grid>
                        <Grid item>
                            <TextField label={"Judul"} {...register("title")} fullWidth
                                error={!!errors.title}
                                helperText={!!errors.title}
                            />
                        </Grid>
                        <Grid item >
                            <TextField label={"Isi"} {...register("isi")} fullWidth
                                error={!!errors.isi}
                                helperText={!!errors.isi}
                                multiline

                            />
                        </Grid>
                        <Grid item>
                            <input type="file" accept="image/*" ref={fileRef} style={{ display: "none" }} onChange={(ev) => {
                                if (ev.target.files?.[0] == null) return
                                setFile(ev.target.files[0])
                            }} />
                            <BlueSkyButton variant="contained" color="primary" onClick={() => {
                                fileRef?.current?.click();
                            }}>
                                Pilih Thumb
                            </BlueSkyButton>
                        </Grid>
                        {
                            (data.thumb != null || file != null) && <Grid item>
                                <Box width={"100%"} height={300} sx={{ objectFit: "contain" }}>
                                    <img style={{ width: "100%", height: "100%" }} src={(file != null ? URL.createObjectURL(file) :"/api/gambar/" + data.thumb)} />
                                </Box>
                            </Grid>
                        }
                        <Grid item>
                            <BlueSkyButton variant="contained" color="primary" type="submit">
                                Submit
                            </BlueSkyButton>
                        </Grid>
                    </Grid>
                </Box>
            </Drawer>
        </>
    )
}