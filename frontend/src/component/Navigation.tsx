import React from "react";
import "./Navigation.css"
import {NavLink} from "react-router-dom";

export default function Navigation() {

    return (
        <nav>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <div className="navbar">
                <NavLink to="/" className="active"><i className="fa fa-fw fa-home"></i> Home</NavLink>
                <NavLink to="#"><i className="fa fa-fw fa-user"></i> Login</NavLink>
            </div>
        </nav>
            )
            }