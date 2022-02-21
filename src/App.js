import "./App.scss";
import Nav from "./components/Navigation/Nav";
import AppRoutes from "./Route/AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Triangle } from "react-loader-spinner";
import { useGlobalContext } from "./Context/UserContext";

function App() {
    const { user } = useGlobalContext();
    return (
        <>
            <Router>
                {/* Cái điều kiện check này ko chỉ cho đẹp đâu, mục đích chính là phải đợi user.isLoading=false rồi rerender qua useContextx
                , nếu ko do tron userContext hàm useEffect chưa chạy xong là nó chạy vào Nav vs AppRoutes luôn */}
                {user && user.isLoading ? (
                    <div className="loading-container d-flex flex-column align-items-center justify-content-center min-vh-100">
                        <Triangle height="100" width="100" color="#1877f2" ariaLabel="loading" />
                        <div>Loading data...</div>
                    </div>
                ) : (
                    <>
                        <div className="app-header">
                            <Nav />
                        </div>
                        <div className="app-container">
                            <AppRoutes />
                        </div>
                    </>
                )}
            </Router>
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}

export default App;
