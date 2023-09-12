import { Box, Grid, Skeleton, Card, CardActionArea, CardMedia, CardContent, Typography, Drawer, TextField, IconButton, InputAdornment } from "@mui/material"
import useFetch from "../../hooks/useFetch"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import CloseIcon from '@mui/icons-material/Close';
import { BlueSkyButton } from "../../component/CustomButton"
import Toast from "../../util/Toast"
import Loading from "../../util/Loading"
import Navigator from "../../component/Navigator"
import { urlFetch } from "../../util/fetchData"
type Inputs = {
    info: string,
    tinggi: number
}

export default function InfoEdit() {
    const fileRef = useRef<HTMLInputElement>(null)
    const { data, isLoading, error } = useFetch("/api/info")
    const [open, setOpen] = useState(false)
    const [select, setSelect] = useState(false)
    const [file, setFile] = useState<any>(null)
    const { register, formState: { errors }, setValue, handleSubmit } = useForm<Inputs>({
        mode: "onBlur",
        resolver: zodResolver(z.object({
            info: z.string().nonempty(),
            tinggi: z.number().nonnegative()
        }))
    })
    function handleOpen(data: any) {
        console.log(data)
        setValue("info", data.info)
        setValue("tinggi", data.tinggi)
        setSelect(data.umur)
        setOpen(true)
    }
    async function editData(data: Inputs) {
        console.log(data)
        try {
            Loading.fire()
            setOpen(false)
            const form = new FormData()
            form.append("info", data.info)
            form.append("tinggi", data.tinggi+"")
            form.append("gambar", file)
            const response = await fetch(urlFetch("/api/info/" + select), {
                method: "PUT",
                body: form
            })
            const json = await response.json();
            if (response.ok === false) {
                return Toast.fire("Error", json.message, "error")
            }
            return Toast.fire("Success", json.message, "success")
        } catch (err) {
            console.log(err)
            Toast.fire("Error", "Server Error", "error")
        }
    }
    if (isLoading) return <Skeleton height={200} />
    if (error) return <Navigator to="/" />
    return (
        <>
            <Box>
                <Grid container direction={"column"} spacing={3}>
                    <Grid item>
                        <Typography variant="h3">
                            Edit Info
                        </Typography>
                    </Grid>
                    {
                        data.map((el: any) => <Grid item>
                            <Card>
                                <CardActionArea onClick={() => handleOpen(el)}>
                                    <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        height="140"
                                        image={"/api/info/gambar/" + (el.umur)}
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {el.umur} minggu
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" component="p">
                                            {el.info}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>)
                    }
                </Grid>
            </Box>
            <Drawer
                open={open}
                anchor="bottom"
                onClose={() => {
                    setOpen(false)
                    setValue("info", "")
                }}
            >
                <Box component={"form"} onSubmit={handleSubmit(editData)} padding={3}>
                    <Grid container direction={"column"} spacing={3}>
                        <Grid item>
                            <Grid container justifyContent={"space-between"}>
                                <Grid item>
                                    <Typography variant="h4">
                                        Edit
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <IconButton onClick={() => {
                                        setOpen(false)
                                        setValue("info", "")
                                    }}>
                                        <CloseIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <TextField fullWidth multiline label={"Info"} {...register("info")} error={!!errors.info} helperText={errors.info?.message} />
                        </Grid>
                        <Grid item>
                            <TextField fullWidth label={"Tinggi"} type="number" InputProps={{
                                endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                            }} {...register("tinggi", { valueAsNumber: true })} error={!!errors.info} helperText={errors.info?.message} />
                        </Grid>
                        <Grid item>
                            <input type="file" accept="image/*" ref={fileRef} style={{ display: "none" }} onChange={(ev) => {
                                if (ev.target.files?.[0] == null) return
                                setFile(ev.target.files[0])
                            }} />
                            <BlueSkyButton variant="contained" color="primary" onClick={() => {
                                fileRef?.current?.click();
                            }}>
                                Pilih Gambar
                            </BlueSkyButton>
                        </Grid>
                        <Grid item>
                            {
                                file != null && <img style={{ width: 200, height: 200, objectFit: "contain" }} src={URL.createObjectURL(file)} />
                            }
                        </Grid>
                        <Grid item>
                            <BlueSkyButton type="submit" variant="contained">
                                Submit
                            </BlueSkyButton>
                        </Grid>
                    </Grid>
                </Box>
            </Drawer>
        </>

    )
}