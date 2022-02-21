import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { useGlobalContext } from "../Context/UserContext";
const PrivateRoutes = (props) => {
    const { user } = useGlobalContext();
    console.log("user", user);
    if (user && user.isAuthenticated === true) {
        return (
            <>
                <Route path={props.path} component={props.component} />
            </>
        );
    } else {
        return <Redirect to="/login" />;
    }
};

export default PrivateRoutes;
