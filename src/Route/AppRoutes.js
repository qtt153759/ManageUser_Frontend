import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import User from "../components/ManageUser/User";
import Role from "../components/Role/Role";
import PrivateRoutes from "./PrivateRoutes";
const AppRoutes = () => {
    const Project = () => {
        return <div></div>;
    };
    return (
        <>
            <Switch>
                <PrivateRoutes path="/user" component={User} />
                <PrivateRoutes path="/project" component={Project} />
                <PrivateRoutes path="/role" component={Role} />
                <Route path="/" exact>
                    home
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="*">404 not found</Route>
            </Switch>
        </>
    );
};

export default AppRoutes;
