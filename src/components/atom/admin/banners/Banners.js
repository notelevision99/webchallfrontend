import React from "react";
import axios from "axios";
import { API_URL } from "../../../../helpers/admin/urlCallAxios";
import { Link, NavLink } from "react-router-dom";
import "../../../../css/main.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../../layout/admin/Header";
import Menu from "../../../layout/admin/Menu";
import Modal from "../../../helperComponent/modal";
import {
    showToastFailed,
    showToastSuccess,
} from "../../../../helpers/admin/toastNotify";

export default class Banners extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /**Banner Info */
            banners: [],
            id: 0,
            orderId: 0,
            urlBanner: "",
            /**End Banner Info */
            showModal: false,
            idToDelete: 0,
            messageSuccess: "",
            messageError: "",
        };
    }

    componentDidMount() {
        const urlGetBanners = `${API_URL}/api/banners`;
        axios.get(urlGetBanners, { withCredentials: true }).then((res) => {
            this.setState({
                banners: res.data,
                id: res.data.id,
                orderId: res.data.orderId,
                urlBanner: res.data.url,
            });
        });
    }

    onDeleteBanner() {
        try {
            const urlToDeleteBanner = `${API_URL}/api/banners/${this.state.idToDelete}`;

            axios
                .delete(urlToDeleteBanner, { withCredentials: true })
                .then((res) => {
                    this.setState({
                        messageSuccess: res.data.message,
                    });
                })
                .then(() => {
                    window.location.reload();
                })
                .then(() => showToastSuccess(this.state.messageSuccess))
                .catch((err) => {
                    showToastFailed(err.response.data.message);
                });
        } catch (error) {
            showToastFailed(error);
        }
    }
    showModal(id) {
        this.setState({
            showModal: true,
            idToDelete: id,
        });
        console.log("Cliecked");
    }

    render() {
        return (
            <div>
                <ToastContainer />
                <Header />
                <Menu />
                <div className="content-wrapper" style={{ minHeight: "700px" }}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">
                                            Danh sách banners
                                        </h3>
                                    </div>
                                    {/* /.card-header */}
                                    <div className="card-body">
                                        <div className="row col-md">
                                            <Link to="/admin/banners/create">
                                                <button
                                                    type="button"
                                                    className="btn btn-success btn-lg">
                                                    Thêm banners
                                                </button>
                                            </Link>
                                        </div>
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Order Id</th>
                                                    <th>Hình ảnh banner</th>
                                                    <th className="table-edit"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.banners.map(
                                                    (record, index) => (
                                                        <tr>
                                                            <td>{record.id}</td>
                                                            <td>
                                                                {record.orderId}
                                                            </td>
                                                            <td>
                                                                <img
                                                                    className="img-listbanners"
                                                                    src={
                                                                        record.url
                                                                    }
                                                                />
                                                            </td>
                                                            <td className="table-edit">
                                                                <a>
                                                                    <i
                                                                        onClick={() => {
                                                                            this.showModal(
                                                                                record.id
                                                                            );
                                                                        }}
                                                                        class="fas fa-trash-alt"
                                                                        data-target="#exampleModal"
                                                                        data-toggle="modal"></i>
                                                                </a>
                                                                {this.state
                                                                    .showModal && (
                                                                    <Modal
                                                                        content={
                                                                            "Bạn có muốn xóa banner này"
                                                                        }
                                                                        title={
                                                                            "Xóa banner"
                                                                        }
                                                                        submit={() =>
                                                                            this.onDeleteBanner()
                                                                        }
                                                                    />
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* /.card-body */}
                                </div>
                            </div>
                            {/* /.col */}
                        </div>
                        {/* /.row */}
                    </div>
                </div>
            </div>
        );
    }
}
