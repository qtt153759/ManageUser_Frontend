import React, { useEffect, useState } from "react";
import "./NavHeader.scss";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../Context/UserContext";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { logoutUser } from "../../Service/userService";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
const NavHeader = () => {
    const history = useHistory();
    const { user, logoutContext } = useGlobalContext();
    const location = useLocation();
    const handleLogout = async () => {
        // 3 steps to Logout
        let data = await logoutUser(); //clear cookie from server
        localStorage.removeItem("jwt"); //clear bearer token in localstorage
        logoutContext(); //clear user to re-render
        if (data && +data.EC === 0) {
            toast.success("Log out succeeds...");
            history.push("/login");
        } else {
            toast.error(data.EM);
        }
    };
    if (location.pathname === "/" || (user && user.isAuthenticated === true)) {
        return (
            <div className="nav-header">
                <Navbar bg="header" expand="lg">
                    <Container>
                        <Navbar.Brand href="/" className="nav-branch">
                            React-Bootstrap
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                {/* Mấy cái thư viện thì chỉ cần import className của nó là đủ */}
                                <NavLink to="/" exact className="nav-link">
                                    Home
                                </NavLink>
                                <NavLink to="/user" className="nav-link">
                                    User
                                </NavLink>
                                <NavLink to="/project" className="nav-link">
                                    Project
                                </NavLink>
                                <NavLink to="/about" className="nav-link">
                                    About
                                </NavLink>
                                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">
                                        Another action
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">
                                        Something
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">
                                        Separated link
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav>
                                {user && user.isAuthenticated === true ? (
                                    <>
                                        <Nav.Item className="nav-link" href="#">
                                            Welcome {user.account.username}
                                        </Nav.Item>
                                        <NavDropdown title="Settings" id="basic-nav-dropdown">
                                            <NavDropdown.Item href="#action/3.1">
                                                Change password
                                            </NavDropdown.Item>
                                            <NavDropdown.Item>
                                                <span onClick={() => handleLogout()}>Log out</span>
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login" className="nav-link">
                                            Login
                                        </Link>
                                    </>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    } else {
        return <></>;
    }
};

export default NavHeader;
