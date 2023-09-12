import { useState } from "react";
import { BlueSkyButton } from "../../component/CustomButton";
import { Drawer, Typography, Grid } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import calculateHarvestDate from "../../util/CalculatePadi";
import Toast from "../../util/Toast";
import Loading from "../../util/Loading";
import { urlFetch } from "../../util/fetchData";

export default function EditTanggalAwal({ tanggal_awal, tanggal_panen, setOpen2, refetch }: { tanggal_awal: Date, tanggal_panen: Date, setOpen2 : any, refetch : any }) {
    const [open, setOpen] = useState(false)
    const [tanggal, setTanggal] = useState<Dayjs | null>(dayjs(tanggal_awal))
    const [tanggalPanen, setTanggalPanen] = useState<Dayjs | null>(dayjs(tanggal_panen))
    async function submit() {
        try {
            
            setOpen(false)
            setOpen2(false)
            Loading.fire()
            const res = await fetch(urlFetch('/api/padi/'), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    tanggal_awal: tanggal,
                    tanggal_panen: tanggalPanen
                })
            })
            const json = await res.json()
            if (res.ok == false) return Toast.fire("Error", json.message, "error")
            Toast.fire("Success", json.message, "success")
            refetch()
        } catch (err) {
            console.log(err)
            Toast.fire("Error", "Server Error", "error")
        }
    }
    return (
        <>
            <BlueSkyButton variant="contained" onClick={() => setOpen(true)}>
                Edit Tanggal Penanaman
            </BlueSkyButton>

            <Drawer
                open={open}
                onClose={() => {
                    setOpen(false)
                    setTanggal(dayjs(tanggal_awal))
                    setTanggalPanen(dayjs(tanggal_panen))
                }}
                anchor="bottom"
            >
                <Typography variant="h5">
                    Edit Tanggal Penanaman
                </Typography>
                <Grid container my={3} alignItems={"center"} direction={"column"} spacing={3} >
                    <Grid item>
                        <Typography variant="body1">
                            Tanggal Penanaman : 
                        </Typography>
                        <DatePicker value={tanggal} onChange={(newVal) => {
                            setTanggal(newVal)
                            setTanggalPanen(dayjs(calculateHarvestDate(newVal?.toDate() || new Date())))
                        }} />
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">
                            Tanggal Panen : 
                        </Typography>
                        <DatePicker value={tanggalPanen} readOnly />
                    </Grid>
                    <Grid item>
                        <BlueSkyButton variant="contained" onClick={() => {
                            submit()
                        }}>
                            Simpan
                        </BlueSkyButton>
                    </Grid>
                </Grid>
            </Drawer>
        </>
    )
}