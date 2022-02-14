import React from "react";
import { useHistory } from "react-router-dom";

const Register = () => {
    let history = useHistory();

    const handleMoveToLogin = () => {
        history.push("/login");
    };
    return (
        <div className="register-container pt-3 pt-sm-1  bg-gradient-light min-vh-100">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left d-none d-sm-block col-7">
                        <div className="title fs-1 fw-bold text-primary">
                            Facebook
                        </div>
                        <div className="detail fs-4 text-muted">
                            Connect with friend and share with the people in
                            your life
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
                                className="form-control"
                                placeholder="Email address  "
                            />
                        </div>
                        <div className="form-group">
                            <label className="ps-2">Phone:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Phone number"
                            />
                        </div>
                        <div className="form-group">
                            <label className="ps-2">Username:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Username"
                            />
                        </div>
                        <div className="form-group">
                            <label className="ps-2">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                            />
                        </div>
                        <div className="form-group">
                            <label className="ps-2">Re-Enter password:</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Re-Enter password"
                            />
                        </div>
                        <button className="btn btn-primary">Register</button>
                        <hr />
                        {/* div bọc ngoài để button fit content */}
                        <div className="text-center">
                            <button
                                className="btn btn-success"
                                onClick={() => handleMoveToLogin()}
                            >
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
