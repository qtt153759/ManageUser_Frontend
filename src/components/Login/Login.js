import React from "react";
import { useHistory } from "react-router-dom";
const Login = () => {
    let history = useHistory();

    const handleRegister = () => {
        history.push("/register");
    };
    return (
        <div className="login-container pt-5  bg-gradient-light min-vh-100">
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
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email address or phone number "
                        />
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                        />
                        <button className="btn btn-primary">Login</button>
                        <a
                            href="#"
                            className="text-center text-decoration-none"
                        >
                            Forgot your password?
                        </a>
                        <hr />
                        {/* div bọc ngoài để button fit content */}
                        <div className="text-center">
                            <button
                                className="btn btn-success"
                                onClick={() => handleRegister()}
                            >
                                Create new account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
