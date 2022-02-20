import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { fetchGroup, createNewUser, updateUser } from "../../Service/userService";
import { toast } from "react-toastify";
import _ from "lodash";
const ModalUser = (props) => {
    const { action, dataModalUser, handleClose, show } = props;
    const defaultUserData = {
        email: "",
        phone: "",
        username: "",
        password: "",
        address: "",
        sex: "",
        group: "",
    };
    const defaultValidInput = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true,
        group: true,
    };
    const [userGroups, setUserGroups] = useState([]);
    const [userData, setUserData] = useState(defaultUserData);
    const [validInput, setValidInput] = useState(defaultValidInput);
    useEffect(() => {
        getGroups();
    }, []);
    // Lưu ý tk modal đã được gắn vào cây dom và mount 1 lần =>componetDidUpdate
    useEffect(() => {
        if (action === "EDIT") {
            setUserData({
                ...dataModalUser,
                group: dataModalUser.Group ? dataModalUser.Group.id : "",
            });
        }
    }, [dataModalUser, action]);
    const getGroups = async () => {
        let response = await fetchGroup();
        if (response && response.EC === 0) {
            setUserGroups(response.DT);
        } else {
            toast.error("get group failed");
        }
    };
    const handleOnChangeInput = (value, name) => {
        //do {...} là swallow clone với các object.object vẫn là tham chiếu => clonedeep= lodash hoặc JSON.parse(JSON.stringify(userData))
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    };
    const checkValidateInput = () => {
        setValidInput(defaultValidInput);
        let arr =
            action === "CREATE"
                ? ["email", "password", "phone", "username", "sex", "group"]
                : ["email", "phone", "username", "sex", "group"];
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _validInput = _.cloneDeep(defaultValidInput);
                _validInput[arr[i]] = false;
                setValidInput(_validInput);
                toast.error(`Empty input ${arr[i]}`);
                return false;
            }
        }
        return true;
    };
    const handleConfirmUser = async () => {
        let check = checkValidateInput();
        if (!check) return;
        let res =
            action === "CREATE"
                ? await createNewUser({ ...userData, groupId: userData["group"] })
                : await updateUser({ ...userData, groupId: userData["group"] });
        if (res && res.EC === 0) {
            handleCloseModal();
            return toast.success(res.EM);
        }
        return toast.error(res.EM);
    };
    const handleCloseModal = () => {
        setValidInput(defaultValidInput);
        setUserData(defaultUserData);
        handleClose();
    };
    return (
        <>
            <Modal size="lg" show={show} className="modal-user" onHide={() => handleCloseModal()}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {action === "CREATE" ? "Create new user" : "Edit a user"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body row">
                        <div className="col-12 col-sm-6 form-group">
                            <label>
                                Email (<span className="text-danger">*</span>)
                            </label>
                            <input
                                type="email"
                                className={
                                    validInput.email ? "form-control" : "form-control is-invalid"
                                }
                                value={userData.email}
                                onChange={(event) =>
                                    handleOnChangeInput(event.target.value, "email")
                                }
                                disabled={action === "CREATE" ? false : true}
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            {action === "CREATE" && (
                                <>
                                    <label>
                                        Password (<span className="text-danger">*</span>)
                                    </label>
                                    <input
                                        type="password"
                                        className={
                                            validInput.password
                                                ? "form-control"
                                                : "form-control is-invalid"
                                        }
                                        value={userData.password}
                                        onChange={(event) =>
                                            handleOnChangeInput(event.target.value, "password")
                                        }
                                    />
                                </>
                            )}
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>
                                Phone (<span className="text-danger">*</span>)
                            </label>
                            <input
                                type="text"
                                className={
                                    validInput.phone ? "form-control" : "form-control is-invalid"
                                }
                                value={userData.phone}
                                onChange={(event) =>
                                    handleOnChangeInput(event.target.value, "phone")
                                }
                                disabled={action === "CREATE" ? false : true}
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>
                                Username (<span className="text-danger">*</span>)
                            </label>
                            <input
                                type="text"
                                className={
                                    validInput.username ? "form-control" : "form-control is-invalid"
                                }
                                value={userData.username}
                                onChange={(event) =>
                                    handleOnChangeInput(event.target.value, "username")
                                }
                            />
                        </div>
                        <div className="col-12 form-group">
                            <label>
                                Address (<span className="text-danger">*</span>)
                            </label>
                            <input
                                type="text"
                                className={
                                    validInput.address ? "form-control" : "form-control is-invalid"
                                }
                                value={userData.address}
                                onChange={(event) =>
                                    handleOnChangeInput(event.target.value, "address")
                                }
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>
                                Sex (<span className="text-danger">*</span>)
                            </label>
                            <select
                                className={
                                    validInput.sex ? "form-select" : "form-select is-invalid"
                                }
                                onChange={(event) => handleOnChangeInput(event.target.value, "sex")}
                                value={userData.sex}
                            >
                                <option defaultValue>Choose gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>
                                Group (<span className="text-danger">*</span>)
                            </label>
                            <select
                                className={
                                    validInput.group ? "form-select" : "form-select is-invalid"
                                }
                                onChange={(event) =>
                                    handleOnChangeInput(event.target.value, "group")
                                }
                                value={userData.group}
                            >
                                <option defaultValue>Choose group</option>
                                {userGroups.length > 0 &&
                                    userGroups.map((item, index) => {
                                        return (
                                            <option key={`group-${index}`} value={item.id}>
                                                {item.name}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModal()}>
                        Close
                    </Button>
                    <Button variant="warning" onClick={() => handleConfirmUser()}>
                        {action === "CREATE" ? "Create user" : "Save"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalUser;
