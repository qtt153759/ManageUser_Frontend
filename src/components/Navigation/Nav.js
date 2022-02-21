import React, { useEffect, useState } from "react";
import "./Nav.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../Context/UserContext";
const Nav = () => {
    const { user } = useGlobalContext();
    const location = useLocation();
    if (location.pathname === "/" || (user && user.isAuthenticated === true)) {
        return (
            <div className="topnav">
                <NavLink to="/" exact>
                    Home
                </NavLink>
                <NavLink to="/user">User</NavLink>
                <NavLink to="/project">Project</NavLink>
                <NavLink to="/about">About</NavLink>
            </div>
        );
    } else {
        return <></>;
    }
};

export default Nav;
