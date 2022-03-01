import axios from "../Setup/axios";
const createRoles = (roles) => {
    return axios.post("/api/v1/role/create", [...roles]);
};
const fetchRoles = () => {
    return axios.get("/api/v1/role/read");
};
const deleteRoles = (id) => {
    return axios.delete("/api/v1/role/delete", { data: { id } });
};

export { createRoles, fetchRoles, deleteRoles };
