import "./App.scss";
import Nav from "./components/Navigation/Nav";
import AppRoutes from "./Route/AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
    return (
        <>
            <Router>
                <div className="app-header">
                    <Nav />
                </div>
                <div className="app-container">
                    <AppRoutes />
                </div>
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
