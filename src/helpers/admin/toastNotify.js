import { toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToastFailed = (content) => {
    toast.error(content, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
    });
};

export const showToastSuccess = (content) => {
    toast.success(content, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
    });
};
