import React from "react";
import axios from "axios";
import { API_URL } from "../../../../helpers/admin/urlCallAxios";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../../../layout/admin/Header";
import Menu from "../../../layout/admin/Menu";
import Footer from "../../../layout/admin/Footer";
import Modal from "../../../helperComponent/modal";
export default class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /**Order Info */
            orders: [],
            /**End Order Info */
            showModal: false,
            orderIdToDelete: 0,
            //Message Response API
            messageSuccess: "",
            messageError: "",
        };
    }

    componentDidMount() {
        const urlGetOrders = `${API_URL}/api/orders?&pageNumber=1&pageSize=10`;
        try {
            axios.get(urlGetOrders, { withCredentials: true }).then((res) => {
                this.setState({
                    orders: res.data.data,
                });
            });
        } catch (error) {
            console.log(error);
        }
    }

    showModal(id) {
        this.setState({
            showModal: true,
            orderIdToDelete: id,
        });
    }

    onDeleteOrder() {
        try {
            const urlDeleteOrder = `${API_URL}/api/orders/${this.state.orderIdToDelete}`;
            axios
                .delete(urlDeleteOrder, { withCredentials: true })
                .then((res) => {
                    this.setState({
                        messageSuccess: res.data.message,
                    });
                })
                .catch((err) => {
                    this.setState({
                        messageError: err.response.data.message,
                    });
                });
        } catch (error) {
            console.log(error);
        }
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
                                            Danh sách đơn hàng
                                        </h3>
                                    </div>
                                    {/* /.card-header */}
                                    <div className="card-body">
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>OrderId</th>
                                                    <th>Tên khách hàng</th>
                                                    <th>Số điện thoại</th>
                                                    <th>Địa chỉ</th>

                                                    <th className="table-edit"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.orders.map(
                                                    (record, index) => (
                                                        <tr>
                                                            <td>
                                                                {record.orderId}
                                                            </td>
                                                            <td>
                                                                {
                                                                    record.userName
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    record.phoneNumber
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    record.shipAddress
                                                                }
                                                            </td>
                                                            <td className="table-edit">
                                                                <NavLink
                                                                    to={
                                                                        "/admin/orders/" +
                                                                        record.orderId
                                                                    }>
                                                                    <i class="fas fa-edit text-success"></i>
                                                                </NavLink>

                                                                <i
                                                                    onClick={() => {
                                                                        this.showModal(
                                                                            record.orderId
                                                                        );
                                                                    }}
                                                                    class="fas fa-trash-alt"
                                                                    data-target="#exampleModal"
                                                                    data-toggle="modal"></i>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                                {this.state.showModal && (
                                                    <Modal
                                                        content={
                                                            "Bạn có muốn xóa đơn hàng - " +
                                                            "Order Id : " +
                                                            this.state
                                                                .orderIdToDelete
                                                        }
                                                        title={"Xóa đơn hàng"}
                                                        submit={() =>
                                                            this.onDeleteOrder()
                                                        }
                                                    />
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
                <Footer />
            </div>
        );
    }
}
