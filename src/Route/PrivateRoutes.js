import { Route } from "react-router-dom";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const PrivateRoutes = (props) => {
    let history = useHistory();
    useEffect(() => {
        let session = sessionStorage.getItem("account");

        if (!session) {
            history.push("/login");
            window.location.reload();
        }
    }, []);
    return (
        <>
            <Route path={props.path} component={props.component} />
        </>
    );
};

export default PrivateRoutes;
