import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../Service/userService";
const Login = () => {
    let history = useHistory();
    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");
    const defaultObjValideInput = {
        isValidValueLogin: true,
        isValidPassword: true,
    };
    const [objValidInput, setObjValidInput] = useState(defaultObjValideInput);
    const handleMoveToRegister = () => {
        history.push("/register");
    };
    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (session) {
            history.push("/");
            window.location.reload();
        }
    }, []);
    const handleLogin = async () => {
        setObjValidInput(defaultObjValideInput);
        if (!valueLogin) {
            setObjValidInput({ ...objValidInput, isValidValueLogin: false });
            toast.error("Please enter your email address or phone number");
            return;
        }
        if (!password) {
            setObjValidInput({ ...objValidInput, isValidPassword: false });

            toast.error("Please enter your password");
            return;
        }
        let response = await loginUser(valueLogin, password);
        if (response) {
            if (+response.EC === 0) {
                let data = {
                    isAuthenticated: true,
                    token: "fake token",
                };
                sessionStorage.setItem("account", JSON.stringify(data));
                history.push("/user");
                window.location.reload();
                return;
            } else {
                toast.error(response.EM);
            }
        }
    };
    const handlePressEnter = (event) => {
        if (event.charCode === 13) {
            handleLogin();
        }
    };
    return (
        <div className="login-container pt-5  bg-gradient-light min-vh-100">
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
                        <input
                            type="text"
                            className={
                                objValidInput.isValidValueLogin
                                    ? "form-control"
                                    : "form-control is-invalid"
                            }
                            placeholder="Email address or phone number"
                            value={valueLogin}
                            onChange={(event) => setValueLogin(event.target.value)}
                        />
                        <input
                            type="password"
                            className={
                                objValidInput.isValidPassword
                                    ? "form-control"
                                    : "form-control is-invalid"
                            }
                            placeholder="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            onKeyPress={(event) => handlePressEnter(event)}
                        />
                        <button className="btn btn-primary" onClick={() => handleLogin()}>
                            Login
                        </button>
                        <a href="#" className="text-center text-decoration-none">
                            Forgot your password?
                        </a>
                        <hr />
                        {/* div bọc ngoài để button fit content */}
                        <div className="text-center">
                            <button
                                className="btn btn-success"
                                onClick={() => handleMoveToRegister()}
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
