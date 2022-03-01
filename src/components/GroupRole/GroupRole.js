import React, { useState, useEffect } from "react";
import { fetchGroup } from "../../Service/userService";
import { fetchRoles, fetchRolesById, assignRoleToGroup } from "../../Service/roleService";
import { toast } from "react-toastify";
import _ from "lodash";
const GroupRole = () => {
    const [userGroups, setUserGroups] = useState([]);
    const [listRoles, setListRoles] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState("");
    const [assignRolesByGroup, setAssignRolesByGroup] = useState([]);
    useEffect(() => {
        getGroups();
        getAllRoles();
    }, []);
    const getGroups = async () => {
        let response = await fetchGroup();
        console.log(response);
        if (response && response.EC === 0) {
            setUserGroups(response.DT);
        } else {
            toast.error("get group failed");
        }
    };
    const getAllRoles = async () => {
        let response = await fetchRoles();
        if (response && response.EC === 0) {
            setListRoles(response.DT);
        } else {
            toast.error("get role failed");
        }
    };
    const handleOnChangeInput = async (groupId) => {
        setSelectedGroup(groupId);
        if (groupId) {
            if (groupId) {
                let response = await fetchRolesById(groupId);
                if (response && response.EC === 0) {
                    let result = buildRolesByGroup(response.DT.Roles, listRoles);
                    setAssignRolesByGroup(result);
                } else {
                    toast.error("get role by id failed");
                }
            }
        }
    };
    const buildRolesByGroup = (groupRoles, getAllRoles) => {
        let result = [];
        if (getAllRoles && getAllRoles.length > 0) {
            getAllRoles.map((role) => {
                let object = {};
                object.url = role.url;
                object.description = role.description;
                object.id = role.id;
                object.isAssigned = false;
                if (groupRoles && groupRoles.length > 0) {
                    object.isAssigned = groupRoles.some((item) => item.url === object.url);
                }
                result.push(object);
            });
        }
        return result;
    };
    const handleSelectRole = (value) => {
        let _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
        let foundIndex = assignRolesByGroup.findIndex((item) => +item.id === +value);
        console.log("ind", foundIndex);
        if (foundIndex !== -1) {
            _assignRolesByGroup[foundIndex].isAssigned =
                !_assignRolesByGroup[foundIndex].isAssigned;
        }
        setAssignRolesByGroup(_assignRolesByGroup);
    };
    const buildDataToSave = () => {
        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
        let result = {};
        result.listRoles = _assignRolesByGroup.reduce((res, item) => {
            if (item.isAssigned) {
                res.push({ groupId: +selectedGroup, roleId: +item.id });
            }
            return res;
        }, []);
        result.groupId = +selectedGroup;
        return result;
    };
    const handleSave = async () => {
        let data = buildDataToSave();
        let res = await assignRoleToGroup(data);
        if (res && res.EC === 0) {
            toast.success(res.EM);
        } else {
            toast.error(res.EM);
        }
    };
    return (
        <div className="container">
            <div className="col-12 col-sm-6 form-group m-3">
                <h4>
                    Group-Role(<span className="text-danger">*</span>)
                </h4>
                <select
                    className="form-select"
                    onChange={(event) => handleOnChangeInput(event.target.value)}
                    // value={userData.group}
                >
                    <option value="">Choose group</option>
                    {userGroups &&
                        userGroups.length > 0 &&
                        userGroups.map((item, index) => {
                            return (
                                <option key={`group-${index}`} value={item.id}>
                                    {item.name}
                                </option>
                            );
                        })}
                </select>
                <hr className="m-3" />
                {selectedGroup && (
                    <div className="role">
                        {assignRolesByGroup &&
                            assignRolesByGroup.length > 0 &&
                            assignRolesByGroup.map((item, index) => {
                                return (
                                    <div className="form-check" key={`list-role-${item.id}`}>
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            value={item.id}
                                            id="flexCheckChecked"
                                            checked={item.isAssigned}
                                            onChange={(event) =>
                                                handleSelectRole(event.target.value)
                                            }
                                        />
                                        <label
                                            class="form-check-label"
                                            htmlFor={`list-role-${item.id}`}
                                        >
                                            {item.url}
                                        </label>
                                    </div>
                                );
                            })}
                        <div className="mt-3">
                            <button className="btn btn-warning" onClick={() => handleSave()}>
                                Save
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GroupRole;
