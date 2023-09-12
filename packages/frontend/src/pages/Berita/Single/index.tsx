import { useNavigate, useParams } from "react-router-dom"
import useAuth from "../../../hooks/useAuth"
import { Grid, Typography, Skeleton, Box } from "@mui/material"
import useFetch from "../../../hooks/useFetch"
import { BlueSkyButton } from "../../../component/CustomButton"
import { EditBerita } from "./EditBerita"
import Toast from "../../../util/Toast"
import Loading from "../../../util/Loading"
import Swal from "sweetalert2"
import { urlFetch } from "../../../util/fetchData"
export default function BeritaSingle() {
    const nav = useNavigate()
    const { user } = useAuth()
    const { id } = useParams()
    const { data, isLoading, refetch } = useFetch("/api/berita/" + id)
    if (isLoading) {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Skeleton height={200} width={"100%"} />
                </Grid>
            </Grid>
        )
    }
    async function deleteBerita() {
        const { isConfirmed } = await Swal.fire({
            title: "Peringatan",
            text: "Apakah anda yakin ingin menghapus berita ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Hapus",
            cancelButtonText: "Batal",
        })
        if(isConfirmed === false) return
        try {
            Loading.fire()
            const response = await fetch(urlFetch("/api/berita/"+id), {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const json = await response.json()
            if(response.ok === false) return Toast.fire("Error", json.message, "error")
            Toast.fire("Berhasil", "", "success")
            nav("/")
        } catch (err) {
            console.log(err)
            Toast.fire("Error", "Server error: ", "error")
        }
    }
    return (
        <>
            <Grid container spacing={2} direction={"column"}>
                <Grid item>
                    <Box width={"100%"} sx={{ objectFit: "contain" }}>
                        <img style={{ width: "100%", height: "100%" }} src={"/api/gambar/" + data.thumb} />
                    </Box>
                </Grid>
                {
                    user?.role == "admin" &&
                    <Grid item>
                        <Grid container spacing={3} >
                            <Grid item>
                                <EditBerita refetch={refetch} data={data} />
                            </Grid>
                            <Grid item>
                                <BlueSkyButton variant="contained" color="error" onClick={() => {
                                    deleteBerita()
                                }}>
                                    Delete
                                </BlueSkyButton>
                            </Grid>
                        </Grid>
                    </Grid>
                }
                <Grid item>
                    <Typography variant="body1">
                        Diupdate pada {new Date(data.updated_at).toLocaleString("id-ID", { day: "numeric", month: "long", year: "2-digit" })}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h4">
                        {data.title}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body2">
                        {data.isi}
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
} 