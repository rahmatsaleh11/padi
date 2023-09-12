import { Avatar, Box, Grid, Paper, Typography } from "@mui/material"
import useAuth from "../../hooks/useAuth"
import { stringAvatar } from "../../util/Avatar"
import EditUsername from "./EditUsername"
import EditNOHP from "./EditNoHP"
import EditPassword from "./EditPassword"
import { BlueSkyButton } from "../../component/CustomButton"

export default function User() {
    const { user, logout } = useAuth()
    return (
        <Box width={"100vw"} minHeight={"100vh"} sx={{ backgroundColor: "#DFE0E0" }}>
            <Grid container direction={"column"} >
                <Grid item mt={4} alignSelf={"start"}>
                    <Typography variant="h3">
                        {user?.role == "admin" ? "Admin" : "User"}
                    </Typography>
                </Grid>
                <Grid item mt={6} margin={3}>
                    <Paper elevation={2} sx={{ padding: 3 }}>
                        <Grid container direction={"column"} spacing={3} >
                            <Grid item alignSelf={"center"}>
                                <Avatar  {...stringAvatar(user?.username, { width: 70, height: 70, fontSize: 30 })} />
                            </Grid>
                            <Grid item>
                                <Typography variant="h6">
                                    Username :
                                </Typography>

                                <Paper sx={{ padding: 1 }}>
                                    <Grid container spacing={3} justifyContent={"space-between"} alignItems={"center"}>
                                        <Grid item>
                                            <Typography variant="body1" >
                                                {user?.username}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <EditUsername />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6">
                                    No HP :
                                </Typography>
                                <Paper sx={{ padding: 1 }}>
                                    <Grid container spacing={3} justifyContent={"space-between"} alignItems={"center"}>
                                        <Grid item>
                                            <Typography variant="body1" >
                                                {user?.no_hp}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <EditNOHP/>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item>
                                <EditPassword/>
                            </Grid>
                            <Grid item>
                                <BlueSkyButton onClick={() => {
                                    logout()
                                }} variant="contained" color="error" >
                                    Log Out
                                </BlueSkyButton>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}