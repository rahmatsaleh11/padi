import { Outlet } from "react-router-dom";
import Auth from "./provider/auth";
import { createTheme, ThemeProvider } from "@mui/material"
import Guard from "./component/Guard";

const theme = createTheme({
    typography: {
        fontFamily: [
            "Mulish Variable"
        ].join(','),
    }
})
export default function Layout() {
    return (
        <Auth>
            <ThemeProvider theme={theme}>
                <Guard>
                    <Outlet />
                </Guard>
            </ThemeProvider>
        </Auth>
    )
}