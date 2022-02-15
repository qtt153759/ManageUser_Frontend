import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const User = () => {
    let history = useHistory();
    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (!session) {
            history.push("/login");
        }
    }, []);
    return <div>ManageUser</div>;
};

export default User;
