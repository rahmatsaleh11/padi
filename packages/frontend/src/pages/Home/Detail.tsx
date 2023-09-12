import { Box, Button, Drawer, Grid, Paper, Typography, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import { BlueSkyButton } from "../../component/CustomButton";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import CloseIcon from '@mui/icons-material/Close';
import { calculateDateDifference } from "../../util/CalculatePadi";
import InfoDetail from "./InfoDetail";
import useFetch from "../../hooks/useFetch";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { urlFetch } from "../../util/fetchData";
export default function Detail({ tanggal_awal }: { tanggal_awal: Date }) {
    const [open, setOpen] = useState(false)
    const [minggu, setMinggu] = useState(calculateDateDifference(tanggal_awal).weeks)
    const { data,refetch } = useFetch("/api/info/" + minggu)
    useEffect(() => {
        refetch()
    }, [minggu])
    useEffect(() => {
        setMinggu(calculateDateDifference(tanggal_awal).weeks)
    }, [open])
    return (
        <>
            <BlueSkyButton variant="contained" endIcon={<PlayCircleFilledWhiteIcon />} onClick={() => setOpen(true)} >
                Buka
            </BlueSkyButton>
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                anchor="bottom"

            >
                <Box height={"100vh"} sx={{ backgroundImage: `url(${urlFetch(`/api/info/gambar/${minggu}`)})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                    <Box sx={{ position: "absolute", top: 0, right: 0, width: 50, height: 50, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Button startIcon={<CloseIcon fontSize="large" htmlColor="black" sx={{ backgroundColor: "whitesmoke", borderRadius: "50%" }} />} onClick={() => setOpen(false)} >
                        </Button>
                    </Box>
                    <Grid container direction={"column"} justifyContent={"end"} height={"100%"}  >

                        <Grid item mb={3} mx={3} >
                            <Grid container justifyContent={"space-between"} alignItems={"center"}>
                                <Grid item>
                                    <Typography variant="h5" color={"whitesmoke"}>
                                        {data?.tinggi} cm
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Grid container direction={"column"} alignItems={"center"} >
                                        <Grid item>
                                            <Typography variant="h5" color={"whitesmoke"}>
                                                Minggu
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h5" color={"whitesmoke"}>
                                                {minggu}
                                            </Typography>

                                        </Grid>

                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Paper elevation={2} sx={{ minHeight: 30 }}>
                                <Grid container justifyContent={"space-between"} px={2}>
                                    <Grid item>
                                        <IconButton onClick={() => {
                                            setMinggu(el => {
                                                if(el >= 1) return el-1
                                                return el
                                            })
                                        }}>
                                            <ChevronLeftIcon/>
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <InfoDetail informasi={data?.info || ""} />
                                    </Grid>
                                    <Grid item>
                                        
                                        <IconButton onClick={() => {
                                            setMinggu(el => {
                                                if(el <= 13) return el+1
                                                return el
                                            })
                                        }}>
                                            <ChevronRightIcon/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Drawer>
        </>
    )
}