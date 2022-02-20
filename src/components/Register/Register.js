import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { registerNewUser } from "../../Service/userService";
const Register = () => {
    let history = useHistory();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const defaultValidInput = {
        isValidEmail: true,
        isValidUsername: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    };
    const [isValid, setIsValid] = useState(defaultValidInput);
    const handleMoveToLogin = () => {
        history.push("/login");
    };
    const handleRegister = async () => {
        if (!validate()) return;
        let response = await registerNewUser({
            email,
            password,
            username,
            phone,
        });
        if (response.EC === 0) {
            toast.success(response.EM);
            history.push("/login");
        } else {
            toast.error(response.EM);
        }
    };
    const validate = () => {
        setIsValid(defaultValidInput);
        if (!email) {
            toast.error("Email is required");
            setIsValid({ ...defaultValidInput, isValidEmail: false });
            return false;
        }
        let regex = /\S+@\S+\.\S+/;
        if (!regex.test(email)) {
            toast.error("Please enter a valid email address");
            setIsValid({ ...defaultValidInput, isValidEmail: false });

            return false;
        }
        if (!phone) {
            toast.error("Phone is required");
            setIsValid({ ...defaultValidInput, isValidPhone: false });

            return false;
        }
        if (!username) {
            toast.error("Username is Required");
            setIsValid({ ...defaultValidInput, isValidUsername: false });

            return false;
        }
        if (!password) {
            toast.error("Password is Required");
            setIsValid({ ...defaultValidInput, isValidPassword: false });

            return false;
        }
        if (confirmPassword !== password) {
            toast.error("Password is not the same");
            setIsValid({ ...defaultValidInput, isValidConfirmPassword: false });
            return false;
        }
        return true;
    };
    useEffect(() => {}, []);
    return (
        <div className="register-container pt-5 pt-sm-1  bg-gradient-light min-vh-100">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left d-none d-sm-block col-7">
                        <div className="title fs-1 fw-bold text-primary">Facebook</div>
                        <div className="detail fs-4 text-muted">
                            Connect with friend and share with the people in your life
                        </div>
                    </div>
                    <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3 bg-white rounded shadow-lg ">
                        <div className="title fs-1 fw-bold text-primary text-center d-sm-none">
                            Facebook
                        </div>
                        <div className="form-group">
                            <label className="ps-2">Email:</label>
                            <input
                                type="text"
                                className={
                                    isValid.isValidEmail
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                placeholder="Email address"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="ps-2">Phone:</label>
                            <input
                                type="text"
                                className={
                                    isValid.isValidPhone
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                placeholder="Phone number"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="ps-2">Username:</label>
                            <input
                                type="text"
                                className={
                                    isValid.isValidUsername
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                placeholder="Username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="ps-2">Password:</label>
                            <input
                                type="password"
                                className={
                                    isValid.isValidPassword
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                placeholder="Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="ps-2">Re-Enter password:</label>
                            <input
                                type="password"
                                className={
                                    isValid.isValidConfirmPassword
                                        ? "form-control"
                                        : "form-control is-invalid"
                                }
                                placeholder="Re-Enter password"
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                        </div>
                        <button className="btn btn-primary" onClick={() => handleRegister()}>
                            Register
                        </button>
                        <hr />
                        {/* div bọc ngoài để button fit content */}
                        <div className="text-center">
                            <button className="btn btn-success" onClick={() => handleMoveToLogin()}>
                                Already've an account. Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
