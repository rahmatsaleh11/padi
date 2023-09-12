import { Button, Drawer, Paper, Grid, Typography } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from "react"
import {  calculateRemainingDays, calculateRemainingTime } from "../../util/CalculatePadi";

import EditTanggalAwal from "./Edit";
export default function Info({ data,refetch }: { data: any,refetch : any }) {
    const [open, setOpen] = useState(false)
   
    return (
        <>
            <Button startIcon={<ChevronRightIcon htmlColor="black" />} onClick={() => setOpen(true)}>
                
            </Button>
            <Drawer
                anchor="bottom"
                open={open}
                onClose={() => setOpen(false)}
            >
                <Paper elevation={2} sx={{ height: "50vh" }}>
                    <Grid container direction={"column"} spacing={5}>
                        <Grid item>
                            <Typography variant="h5">
                                Sudah Berapa Lama
                            </Typography>
                        </Grid>
                        <Grid item mx={3}>
                            <Grid container direction={"column"} spacing={3}>
                                <Grid item>

                                    <Typography variant="body2" fontSize={"light"}>
                                        Perkiraan Tanggal Panen anda adalah {new Date(data?.tanggal_panen).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "2-digit" })}
                                    </Typography>

                                </Grid>
                                <Grid item>
                                    <Typography variant="body2" fontSize={"light"}>
                                        Ini artinya sisa {calculateRemainingDays(new Date(data?.tanggal_panen))} Hari lagi
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2" fontSize={"light"}>
                                         Anda masih memiliki {calculateRemainingTime(new Date(data?.tanggal_panen)).weeks} Minggu, {calculateRemainingTime(new Date(data?.tanggal_panen)).days} Hari Lagi
                                    </Typography>
                                </Grid>
                            </Grid>


                        </Grid>
                        <Grid item alignSelf={"center"} >
                           <EditTanggalAwal {...data} setOpen2={setOpen} refetch={refetch} />
                        </Grid>
                    </Grid>
                </Paper>
            </Drawer>
        </>
    )
}