import {HiOutlineBars3} from "react-icons/hi2";
import {Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import InfoIcon from "@mui/icons-material/Info"
import CommentRoundedIcon from "@mui/icons-material/CommentRounded"
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded"
import Logo from "../Assets/Petfit_logo_long.png"
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";


export default function NavigationBar() {

    const [openMenu, setOpenMenu] = useState(false)
    const menuOptions = [
        {text: "Home", icon: <HomeIcon/>,},
        {text: "About", icon: <InfoIcon/>,},
        {text: "Testimonials", icon: <CommentRoundedIcon/>,},
        {text: "Contact", icon: <PhoneRoundedIcon/>,},
    ]
    const navigate = useNavigate()

    function handleClickSignIn() {
        navigate("/sign-in")
    }

    return (
        <nav>
            <div className={"nav-logo-container"}>
                <img src={Logo} alt={""}/>
            </div>
            <div className={"navbar-links-container"}>
                <a href={"/"}>Home</a>
                <a href={"/about"}>About</a>
                <a href={"/work"}>Work</a>
                <a href={"/testimonials"}>Testimonials</a>
                <a href={"/"}>Contact</a>
                <button onClick={handleClickSignIn} className={"primary-button"}>Sign In</button>
            </div>
            <div className={"navbar-menu-container"}>
                <HiOutlineBars3 onClick={() => setOpenMenu(true)}/>
            </div>
            <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
                <Box sx={{width: 250}}
                     role="presentation"
                     onClick={() => setOpenMenu(false)}
                     onKeyDown={() => setOpenMenu(false)}
                >
                    <List>
                        {menuOptions.map((item) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>{item.icon}
                                        <ListItemText primary={item.text}/>
                                    </ListItemIcon>
                                </ListItemButton>

                            </ListItem>
                        ))}


                    </List>


                </Box>

            </Drawer>
        </nav>
    )

}
