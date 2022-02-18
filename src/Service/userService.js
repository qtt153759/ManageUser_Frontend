import axios from "axios";
const registerNewUser = ({ email, phone, username, password }) => {
    return axios.post("http://localhost:5000/api/v1/register", {
        email,
        phone,
        username,
        password,
    });
};
const loginUser = (valueLogin, password) => {
    return axios.post("http://localhost:5000/api/v1/login", {
        valueLogin,
        password,
    });
};
const fetchUsers = (page, limit) => {
    return axios.get(
        `http://localhost:5000/api/v1/user/read?page=${page}&limit=${limit}`
    );
};
export { registerNewUser, loginUser, fetchUsers };
