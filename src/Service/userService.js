// import axios from "axios";
import axios from "../Setup/axios";
const registerNewUser = ({ email, phone, username, password }) => {
    return axios.post("/api/v1/register", {
        email,
        phone,
        username,
        password,
    });
};
const loginUser = (valueLogin, password) => {
    return axios.post("/api/v1/login", {
        valueLogin,
        password,
    });
};
const fetchUsers = (page, limit) => {
    return axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`);
};
const deleteUser = (userId) => {
    return axios.delete("/api/v1/user/delete", {
        data: { id: userId },
    });
};
const fetchGroup = () => {
    return axios.get("/api/v1/group/read");
};
const createNewUser = (userData) => {
    return axios.post("/api/v1/user/create", { ...userData });
};
const updateUser = (userData) => {
    return axios.put("/api/v1/user/update", { ...userData });
};
const getUserAccount = () => {
    return axios.get("/api/v1/account");
};
export {
    getUserAccount,
    registerNewUser,
    loginUser,
    fetchUsers,
    deleteUser,
    fetchGroup,
    createNewUser,
    updateUser,
};
