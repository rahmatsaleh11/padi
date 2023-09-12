import { useMemo } from "react"
import useFetch from "../../hooks/useFetch"
import { useNavigate } from "react-router-dom"
import {  Button, Grid, Skeleton, Typography, buttonClasses, Card, CardMedia, CardContent } from "@mui/material"
import { calculateDateDifference, calculateDaysFromDate } from "../../util/CalculatePadi"
import Info from "./Info"
import Detail from "./Detail"
export default function Padi() {
    const nav = useNavigate()
    const { data, error, refetch, isLoading } = useFetch("/api/padi")
    const calcWeek = useMemo(() => {
        if (data == null) return
        return calculateDateDifference(new Date(data.tanggal_awal))
    }, [data])
    if (isLoading) return (
        <Skeleton width={"100%"} height={"50vh"} />
    )
    if (error != null) return (
        <Grid container justifyContent={"center"} alignItems={"center"} height={"100vh"}>
            <Grid item>
                <Typography variant="h5" textAlign={"center"} >
                    {error.code}
                </Typography>
                <Typography variant="h5" >
                    {error.message}
                </Typography>
                {
                    error.code === 404 && <Button sx={{
                        [`&.${buttonClasses.contained}`]: {
                            backgroundColor: "#25C5DF"
                        }
                    }} variant="contained" onClick={() => {
                        nav("/padi/create")
                    }}>
                        Membuat Penjadwalan Padi
                    </Button>
                }
            </Grid>
        </Grid>
    )
    return (
        <>
            <Grid item mt={3}>

                <Typography variant="h5">
                    Hari ini
                </Typography>
            </Grid>
            <Grid item>
                <Card>
                    <CardMedia sx={{ width: "100%", height: 300, objectFit: "contain" }} image={"/api/info/gambar/" + (calculateDateDifference(new Date(data?.tanggal_awal)).weeks + 1)} title="Padi" />
                    <CardContent>
                        <Grid container direction={"column"} spacing={3}>
                            <Grid item>
                                <Grid container justifyContent={"space-between"} alignItems={"center"}>
                                    <Grid item>
                                        <Typography variant="h6">
                                            Hari ke {calculateDaysFromDate(new Date(data?.tanggal_awal) || new Date())}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Detail tanggal_awal={new Date(data?.tanggal_awal)} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container justifyContent={"space-between"} alignItems={"center"}>
                                    <Grid item>
                                        <Typography variant="h6">
                                            Minggu ke {
                                                calcWeek?.weeks
                                            }, hari ke {
                                                (calcWeek?.days || 0) + 1
                                            }
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontSize: 11, fontWeight: "light" }}>
                                            Perkiraan Tanggal Panen {
                                                new Date(data?.tanggal_panen).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: "2-digit" })
                                            }
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Info data={data} refetch={refetch} />
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>

                    </CardContent>

                </Card>
            </Grid>
        </>
    )
}