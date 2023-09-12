import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import Navigator from "../../component/Navigator"
import useAuth from "../../hooks/useAuth"
import useFetch from "../../hooks/useFetch"
import { stringAvatar } from "../../util/Avatar"

export default function Users() {
    const {user} = useAuth()
    const {data, isLoading} = useFetch("/api/user/users")
    if(user?.role == "user") {
        return <Navigator to="/"  />
    }
    if(isLoading) return <></>
    return(
        <Box>
            <Typography variant="h3">
                List User
            </Typography>
            <List>
                {
                    data?.map((el : any) => <ListItem>
                        <ListItemAvatar>
                            <Avatar {...stringAvatar(el.username)} />
                        </ListItemAvatar>
                        <ListItemText 
                        primary={el.username}
                        secondary={<>
                            <Typography variant="body2">
                                Role : {el.role}
                            </Typography>
                            <Typography variant="body2">
                                No HP : {el.no_hp}
                            </Typography>
                        </>}
                        />  
                    </ListItem>)
                }
            </List>
        </Box>
    )
}