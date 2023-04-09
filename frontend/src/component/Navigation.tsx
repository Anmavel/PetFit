import React from "react";
import "./Navigation.css"
import {NavLink, useLocation} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import {toast} from "react-toastify";

export default function Navigation() {
    const user = useAuth(false);
    const location = useLocation()

    function handleLogOutClick() {
        axios.post("/api/users/logout").then(res => {
            if (res.status === 200) {
                toast.success("You were successfully logout. Bye 👋");
                window.sessionStorage.setItem(
                    "signInRedirect",
                    location.pathname || "/"
                );
            }
        });

        window.location.href = "/sign-in";
    }

    return (
        <nav>
            <link rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <div className="navbar">
                <NavLink to="/" className="active"><i className="fa fa-fw fa-home"></i>Home</NavLink>

                {user ?
                    <>
                        <NavLink to={"#"} onClick={handleLogOutClick}>Sign out</NavLink>
                    </>
                    :
                    <>
                        <NavLink to="/sign-in"><i className="fa fa-fw fa-user"></i>Login</NavLink>
                        <NavLink to="/sign-up"><i className="fa fa-fw fa-user"></i>SignUp</NavLink>
                    </>
                }

            </div>
        </nav>
    )
}