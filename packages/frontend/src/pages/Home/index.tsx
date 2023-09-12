import { Box, Grid } from "@mui/material"
import useAuth from "../../hooks/useAuth"



import Berita from "./Berita";
import Padi from "./Padi";

export default function Home() {
    const { user } = useAuth()


    return (
        <Box>
            <Grid container direction={"column"} spacing={3}>
                {
                    user?.role === "user" &&
                    
                        <Padi />
                   
                }
                <Grid item>
                    <Berita />
                </Grid>
            </Grid>
        </Box>
    )
}