import { Box, Grid, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { BlueSkyButton } from "../../../component/CustomButton";
import calculateHarvestDate from "../../../util/CalculatePadi";
import Loading from "../../../util/Loading";
import Toast from "../../../util/Toast";
import { useNavigate } from "react-router-dom";
import { urlFetch } from "../../../util/fetchData";

export default function CreatePadi() {
    const [tanggal, setTanggal] = useState<null | Dayjs>(dayjs(new Date()))
    const [tanggalpanen, setTanggalPanen] = useState<null | Dayjs>(dayjs(calculateHarvestDate(new Date())))
    const nav = useNavigate()
    async function simpanData() {
       try {
        Loading.fire()
        const response = await fetch(urlFetch("/api/padi"), {
            method :"POST",
            body : JSON.stringify({
                tanggal_awal : tanggal,
                tanggal_panen : tanggalpanen,
                
            }),
            headers : {
                "Content-Type" : "application/json"
            }
        })
        const json = await response.json()
        if(response.ok === false) return Toast.fire("Error", json.message, "error")
        Toast.fire("Success", json.message, "success")
        nav('/')
       }catch(err) {
        console.log(err)
        Toast.fire("Error", "Server Error", "error")
       }
    }
    
    return (
        <Box>
            <Grid container direction={"column"} spacing={3}>
                <Grid item>
                    <Typography variant="h4">
                        Atur Perkiraan Tanggal Panen
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1">
                        Pilih Bagaimana anda ingin memperkirakan tanggal panen Anda. Anda dapat mengubahnya kapan saja
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography>
                        Tanggal : 
                    </Typography>
                    <DatePicker value={tanggal} onChange={(newval) => {
                        setTanggal(newval)
                        if(newval == null) return
                        const tanggalPanen = calculateHarvestDate(newval?.toDate())
                        setTanggalPanen(dayjs(tanggalPanen))
                    }} />
                </Grid>
                <Grid item>
                    <Typography>
                        Perkiraan Tanggal Panen
                    </Typography>
                    <DatePicker value={tanggalpanen} readOnly />
                    
                </Grid>
                <Grid item>
                    <BlueSkyButton variant="contained" onClick={() => {
                        simpanData()
                    }}>
                        Simpan
                    </BlueSkyButton>
                </Grid>
            </Grid>
        </Box>
    )
}