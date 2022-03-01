import React from "react";
import _ from "lodash";
import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { createRoles } from "../../Service/roleService";
import TableRole from "./TableRole";

const Role = () => {
    let childRef = useRef();
    // Cách tạo nhiều input thông qua object
    const dataChildDefault = { url: "", description: "", isValidUrl: true };
    const [listChilds, setListChilds] = useState({
        child0: dataChildDefault,
    });
    const handleOnchangeInput = (key, name, value) => {
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[key][name] = value;
        if (value && name === "url") {
            _listChilds[key]["isValidUrl"] = true;
        }
        setListChilds(_listChilds);
    };
    const handleAddNewInput = () => {
        // object khi thêm tự động nhét xuống cuối ko cần push => ko cần xếp thứ tự tên key
        let _listChilds = _.cloneDeep(listChilds);
        _listChilds[`child-${uuidv4()}`] = dataChildDefault;
        setListChilds(_listChilds);
    };
    const handleDeleteInput = (key) => {
        let _listChilds = _.cloneDeep(listChilds);
        delete _listChilds[key];
        setListChilds(_listChilds);
    };
    const buildDataPersist = () => {
        let _listChilds = _.cloneDeep(listChilds);
        let result = [];
        Object.entries(_listChilds).map(([key, child], index) => {
            result.push({ url: child.url, description: child.description });
        });
        return result;
    };
    const handleSave = async () => {
        let inValidObj = Object.entries(listChilds).find(([key, child], index) => {
            return child && !child.url;
        });
        console.log(inValidObj);
        if (!inValidObj) {
            let data = buildDataPersist();
            let res = await createRoles(data);
            if (res) {
                if (res.EC === 0) {
                    toast.success(res.EM);
                    childRef.current.fetchListRole();
                } else {
                    toast.error(res.EM);
                }
            }
        } else {
            toast.error("Missing parameter");
            let _listChilds = _.cloneDeep(listChilds);
            _listChilds[inValidObj[0]]["isValidUrl"] = false;
            setListChilds(_listChilds);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="title-row mt-3">
                    <h4>Add new row...</h4>
                </div>
                <div className="role-parent">
                    {Object.entries(listChilds).map(([key, child], index) => {
                        return (
                            <div className="row role-child" key={`child-${key}`}>
                                <div className="col-5 form-gorup">
                                    <label>URL:</label>
                                    <input
                                        type="text"
                                        className={
                                            child.isValidUrl
                                                ? "form-control"
                                                : "form-control is-invalid"
                                        }
                                        value={child.url}
                                        onChange={(event) =>
                                            handleOnchangeInput(key, "url", event.target.value)
                                        }
                                    />
                                </div>
                                <div className="col-5 form-gorup">
                                    <label>Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={child.description}
                                        onChange={(event) =>
                                            handleOnchangeInput(
                                                key,
                                                "description",
                                                event.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="col-2 d-flex justify-content-center gap-5">
                                    <i
                                        className="fa fa-plus-circle align-self-center fs-2 text-success "
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="Add"
                                        type="button"
                                        onClick={() => handleAddNewInput()}
                                    />
                                    <i
                                        className="fa fa-trash-o align-self-center fs-2 text-danger "
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="Remove"
                                        type="button"
                                        onClick={() => handleDeleteInput(key)}
                                    />
                                </div>
                            </div>
                        );
                    })}

                    <button className="btn btn-warning mt-3" onClick={() => handleSave()}>
                        Save
                    </button>
                </div>
                <hr className="m-2" />
                <h4>Table role</h4>
                <TableRole ref={childRef} />
            </div>
        </div>
    );
};

export default Role;
