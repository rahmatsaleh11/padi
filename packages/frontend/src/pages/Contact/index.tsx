import { Box, List, ListItem, ListItemText, Skeleton, Typography, ListItemIcon,ListItemButton } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
export default function Contact() {
    const { data, isLoading } = useFetch("/api/user/contacts")
    if (isLoading) return <Skeleton height={300} />
    return (
        <>
            <Box>
                <Typography variant="h4">
                    Contact
                </Typography>
                <List>
                    {
                        data?.map((el: any) => (<ListItem>
                            <ListItemButton onClick={() => {
                                window.open(`https://wa.me/${el.replace("0", "62")}?${new URLSearchParams({text : "Saya"})}`)
                            }}>
                                <ListItemIcon  >
                                    <WhatsAppIcon htmlColor="green" />
                                </ListItemIcon>
                                <ListItemText primary={el} />
                            </ListItemButton>

                        </ListItem>))
                    }
                </List>
            </Box>
        </>
    )
}