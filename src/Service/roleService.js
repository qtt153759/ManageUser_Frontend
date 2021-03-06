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
const fetchRolesById = (id) => {
    return axios.get(`/api/v1/role/by-group/${id}`);
};
const assignRoleToGroup = (data) => {
    return axios.post("/api/v1/role/assignToGroup", { data });
};

export { createRoles, fetchRoles, deleteRoles, fetchRolesById, assignRoleToGroup };
