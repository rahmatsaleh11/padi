import useAuth from "../../hooks/useAuth"
import { Box, Grid, CircularProgress } from "@mui/material"
import Navbar from "../Navbar"
export default function Guard({ children }: { children: any }) {
    const { isLoading, user } = useAuth()

    if (isLoading) {
        return (
            <Box>
                <Grid container sx={{ minHeight: "100vh" }} justifyContent={"center"} alignItems={"center"}>
                    <Grid item>
                        <CircularProgress />
                    </Grid>
                </Grid>
            </Box>
        )
    }
    if (user == null) {
        return (
            <>
                {children}
            </>
        )
    }
    return (
        <>
            <Box mb={5}>
                {children}
            </Box>
            <Navbar />
        </>
    )
}