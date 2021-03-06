import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
    baseURL: "http://localhost:5000",
});
// Alter defaults after instance has been created
//Browser auto set withCredentials=false for security=> withCredentials=true to exchange cookie
instance.defaults.withCredentials = true;
// fix cors header
instance.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("jwt")}`;

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const status = error.response?.status || 500;
        // we can handle global errors here
        switch (status) {
            // authentication (token related issues)
            case 401: {
                toast.error("Unauthorized the user.Please login... ");
                // window.location.href='/login' dùng để chuyển trang
                // return Promise.reject(error); return error thế này thì cái tk hứng sẽ tạo ra vòng lặp error=> return error.response
                return error.response.data;
            }

            // forbidden (permission related issues)
            case 403: {
                toast.error("you don't have permission to access this resource...");
                return Promise.reject(error);
            }

            // bad request
            case 400: {
                return Promise.reject(error);
            }

            // not found
            case 404: {
                return Promise.reject(error);
            }

            // conflict
            case 409: {
                return Promise.reject(error);
            }

            // unprocessable
            case 422: {
                return Promise.reject(error);
            }

            // generic api error (server related) unexpected
            default: {
                return Promise.reject(error);
            }
        }
    }
);
export default instance;
