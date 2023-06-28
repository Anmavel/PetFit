import {HiOutlineBars3} from "react-icons/hi2";
import React, {useState} from "react";
import {useLocation, useNavigate, Link} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import useAuth from "../hooks/useAuth";
import {Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Home as HomeIcon, Info as AboutIcon, Lightbulb as WorkIcon, CommentRounded as TestimonialsIcon, PhoneRounded as ContactIcon, Pets as PetsIcon, Logout as LogoutIcon,} from "@mui/icons-material";
import Logo from "../Assets/Petfit_logo_long.png";

export default function NavigationBar() {
    const [openMenu, setOpenMenu] = useState(false);
    const menuOptions = [
        {text: "Home", icon: <HomeIcon/>, link: "/"},
        {text: "About", icon: <AboutIcon/>, link: "/about"},
        {text: "Work", icon: <WorkIcon/>, link: "/work"},
        {text: "Testimonials", icon: <TestimonialsIcon/>, link: "/testimonials"},
        {text: "Contact", icon: <ContactIcon/>, link: "/contact"},
        {text: "Pets", icon: <PetsIcon/>, link: "/pets"},
        {text: "Sign Out", icon: <LogoutIcon/>, link: "/", onClick: handleLogOutClick},
    ];
    const navigate = useNavigate();
    const location = useLocation();
    const user = useAuth(false);

    function handleClickSignIn() {
        navigate("/sign-in");
    }

    function handleLogOutClick() {
        axios
            .post("/api/users/logout")
            .then((res) => {
                if (res.status === 200) {
                    window.sessionStorage.setItem("signInRedirect", location.pathname || "/");
                    navigate("/sign-in");
                    toast.success("Bye");
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <nav>
            <div className={"nav-logo-container"}>
                <img src={Logo} alt={""}/>
            </div>
            <div className={"navbar-links-container"}>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/work">Work</Link>
                <Link to="/testimonials">Testimonials</Link>
                <Link to="/contact">Contact</Link>
                {user ? (
                    <>
                        <Link to="/pets">Pets</Link>
                        <button onClick={handleLogOutClick} className={"primary-button"}>
                            Sign Out
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={handleClickSignIn} className={"primary-button"}>
                            Sign In
                        </button>
                    </>
                )}
            </div>
            <div className={"navbar-menu-container"}>
                <HiOutlineBars3 onClick={() => setOpenMenu(true)}/>
            </div>
            <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
                <Box
                    sx={{width: 250}}
                    role="presentation"
                    onClick={() => setOpenMenu(false)}
                    onKeyDown={() => setOpenMenu(false)}
                >
                    <List>
                        {menuOptions.map((item) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton component={Link} to={item.link} onClick={item.onClick}>
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </nav>
    );
}
