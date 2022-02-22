import React, { useState, useContext, useEffect } from "react";
import { getUserAccount } from "../Service/userService";

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
    const userDefault = {
        // do react không kiểm soát đc session người dùng nên buộc phải có
        isLoading: true,
        isAuthenticated: false,
        token: "",
        account: {},
    };
    const [user, setUser] = useState(userDefault);

    useEffect(() => {
        // Rất quan trọng khi reload
        if (window.location.pathname !== "/" && window.location.pathname !== "/login") {
            // useEffect sẽ không đợi đâu
            fetchUser();
        } else {
            setUser({ ...user, isLoading: false });
        }
    }, []);
    const loginContext = (userData) => {
        setUser({ ...userData, isLoading: false });
    };
    const logoutContext = () => {
        setUser({ ...userDefault, isLoading: false });
    };
    const fetchUser = async () => {
        let response = await getUserAccount();
        console.log("fetchAccount", response);
        if (response && response.EC === 0) {
            let { groupWithRoles, username, email, access_token } = response.DT;
            let data = {
                isAuthenticated: true,
                token: access_token,
                account: { groupWithRoles, username, email },
                isLoading: false,
            };
            console.log("xong");
            setUser(data);
        } else {
            setUser({ ...user, isLoading: false });
        }
    };
    console.log("check", user);
    return (
        <AppContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}
        </AppContext.Provider>
    );
};
const useGlobalContext = () => {
    return useContext(AppContext);
};
export { AppContext, AppProvider, useGlobalContext };
