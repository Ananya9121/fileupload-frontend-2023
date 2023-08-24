import React from 'react'
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";


function Logout() {
    const { enqueueSnackbar } = useSnackbar();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleLogout = async (fileId) => {
        if (!token) {
            enqueueSnackbar("Please log in again to upload files!", { variant: "warning" })
            return;
        }
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            navigate("/user/login");
            window.location.reload();
            enqueueSnackbar("Successfully Logged out!", { variant: "success" })

        } catch (e) {
            if (e.response && e.response.status === 401) {
                enqueueSnackbar("Invalid Email or Password !", { variant: "error" });
            }
            else {
                enqueueSnackbar("Something went wrong!", { variant: "error" });
            }
        }

    };
    return (
        <button
        className="btn btn-outline-secondary text-white"
        type="button"
            onClick={(e) => {
                handleLogout();
            }}
        >
            Logout
        </button>)
}

export default Logout