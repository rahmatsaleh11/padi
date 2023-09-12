import { Box, Grid, TextField, Typography } from "@mui/material";
import { BlueSkyButton } from "../../component/CustomButton";
import { useRef, useState } from "react";
import Loading from "../../util/Loading";
import Toast from "../../util/Toast";
import { useNavigate } from "react-router-dom";
import { urlFetch } from "../../util/fetchData";

export default function CreateBerita() {
    const fileRef = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<any>(null)
    const [isi, setIsi] = useState("")
    const [title, setTitle] = useState("")
    const nav = useNavigate()
async function saveData() {
    try {
        Loading.fire()
        const form = new FormData()
        form.append("title", title)
        form.append("isi", isi)
        form.append("gambar", file)
        const response = await fetch(urlFetch('/api/berita'), {
            method : "POST",
            body : form
        })
        const json = await response.json()
        if(!response.ok) return Toast.fire("Error", json.message, "error")
        nav("/")
        return Toast.fire("Sukses", json.message, "success")
    }catch(err) {
        console.log(err)
        Toast.fire("Error", "Server Error", "error")
    }
}

    return (
        <Box>
            <Grid container direction={"column"} spacing={2}>
                <Grid item>
                    <Typography variant="h5">
                        Tambah Berita
                    </Typography>

                </Grid>
                <Grid item>
                    <TextField fullWidth

                        label="Judul"
                        multiline
                        maxRows={20}
                        value={title}
                        onChange={(ev) => setTitle(ev.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField fullWidth

                        label="Isi"
                        multiline
                        maxRows={20}
                        value={isi}
                        onChange={(ev) => setIsi(ev.target.value)}
                    />
                </Grid>
                <Grid item>
                    <input type="file" accept="image/*" ref={fileRef} style={{ display: "none" }} onChange={(ev) => {
                        if(ev.target.files?.[0] == null) return
                        setFile(ev.target.files[0])
                    }} />
                    <BlueSkyButton variant="contained" color="primary" onClick={() => {
                        fileRef?.current?.click();
                    }}>
                        Pilih Thumb
                    </BlueSkyButton>


                </Grid>
                <Grid item>
                    {
                        file != null && <img style={{ width: 200, height: 200, objectFit: "contain" }} src={URL.createObjectURL(file)} />
                    }
                </Grid>
                <Grid item>
                    <BlueSkyButton variant="contained" onClick={() => saveData()}>
                        Simpan
                    </BlueSkyButton>
                </Grid>
            </Grid>
        </Box>
    )
}