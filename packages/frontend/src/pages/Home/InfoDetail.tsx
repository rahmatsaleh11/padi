import { Button, Drawer, Typography } from "@mui/material";
import { useState } from "react";
import InfoIcon from '@mui/icons-material/Info';


export default function InfoDetail({ informasi }: { informasi: string }) {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Button startIcon={<InfoIcon htmlColor="black" sx={{ width: 30, height: 30 }} fontSize="large" />} onClick={() => setOpen(true)}>

            </Button>
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                anchor="bottom"
            >
                <Typography variant="h5">
                    Informasi
                </Typography>
                <Typography variant="body1">
                    {informasi}
                </Typography>
            </Drawer>
        </>
    )
}