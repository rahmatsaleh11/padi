import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {BottomNavigation, BottomNavigationAction} from "@mui/material"
import {useState, useEffect} from "react"
import { useLocation, useNavigate } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import useAuth from '../../hooks/useAuth';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import InfoIcon from '@mui/icons-material/Info';
import ContactsIcon from '@mui/icons-material/Contacts';
const navItem = [
    {
        label: "Home",
        icon: <HomeIcon/>,
        href: "/",
    },
    {
        label : "Users",
        icon : <PeopleIcon/>,
        href : "/users",
        role : "admin"
    },
    {
        label : "Berita",
        icon : <NewspaperIcon/>,
        href : "/berita",
        role : "admin"
    },
    {
        label : "Info",
        icon : <InfoIcon/>,
        href : "/info",
        role : "admin"
    },
    {
        label : "Contact",
        icon : <ContactsIcon/>,
        role : "user",
        href : "/contact"
    },
    {
        label: "Account",
        icon: <AccountCircleIcon/>,
        href: "/user"
    }

]

export default function Navbar() {
    const [selected, setSelected] = useState("home")
    const nav = useNavigate()
    const loc = useLocation()
    const {user} = useAuth()
    useEffect(() => {
        setSelected(loc.pathname)
    }, [])
    return (
        <BottomNavigation
            showLabels={false}
            value={selected}
            onChange={(_, newselected) => {
                nav(newselected)
                setSelected(newselected);
            }}
            sx={{position : "fixed", bottom : 0, width : "100vw"}}
        >
            {
                navItem.map((item, index) => {
                    if(item.role != null) {
                        if(item.role != user?.role) {
                            return
                        }
                    }
                    return (
                        <BottomNavigationAction
                            key={index}
                            label={item.label}
                            icon={item.icon}
                            value={item.href}
                        />
                    )
                })
            }
        </BottomNavigation>
    )
}