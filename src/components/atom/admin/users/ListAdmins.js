import Axios from "axios";
import React from "react";
import axios from "axios";
import { API_URL } from "../../../../helpers/admin/urlCallAxios";
import Header from "../../../layout/admin/Header";
import Menu from "../../../layout/admin/Menu";
import Footer from "../../../layout/admin/Footer";
import {
    Link,
    NavLink,
    Redirect,
    useRouteMatch as match,
    withRouter,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../../../helperComponent/modal";
import { showToastSuccess } from "../../../../helpers/admin/toastNotify";

export default class ListAdmins extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            /**Modal Delete User */
            contentModal: "",
            showModal: false,
            idToDelete: "",
            redirect: false,
            messageResult: "",

            /**End Modal Delete User */
        };
    }
    componentDidMount() {
        const urlGetListAdmins = `${API_URL}/api/users/admin`;
        axios.get(urlGetListAdmins, { withCredentials: true }).then((res) => {
            this.setState({
                users: res.data,
            });
            console.log(this.state.users);
        });
    }

    showModal(name, id) {
        this.setState({
            showModal: true,
            contentModal: name,
            idToDelete: id,
        });
        console.log("Cliecked");
    }

    onDeleleProd = () => {
        try {
            const urlToDeleteProd = `${API_URL}/api/users/${this.state.idToDelete}`;

            axios
                .delete(urlToDeleteProd, { withCredentials: true })
                .then((res) => {
                    this.setState({
                        messageResult: res.data.message,
                        redirect: true,
                    });
                })
                .then(() => window.location.reload())
                .then(() => showToastSuccess(this.state.messageResult));
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        this.state.redirect && <Redirect to="/listadmins" />;

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
                                            Danh s??ch t??i kho???n qu???n tr???
                                        </h3>
                                    </div>
                                    {/* /.card-header */}
                                    <div className="card-body">
                                        <div className="row col-md">
                                            <NavLink to="/admin/listadmins/create">
                                                <button
                                                    type="button"
                                                    className="btn btn-success btn-lg">
                                                    Th??m t??i kho???n
                                                </button>
                                            </NavLink>
                                        </div>
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>T??n t??i kho???n</th>
                                                    <th>Email</th>
                                                    <th>S??? ??i???n tho???i</th>
                                                    <th>Quy???n</th>
                                                    <th className="table-edit"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.users.map(
                                                    (record, index) => (
                                                        <tr>
                                                            <td></td>
                                                            <td>
                                                                {
                                                                    record.userName
                                                                }
                                                            </td>
                                                            <td>
                                                                {record.email}
                                                            </td>
                                                            <td>
                                                                {
                                                                    record.phoneNumber
                                                                }
                                                            </td>
                                                            <td>
                                                                {record.roles}
                                                            </td>
                                                            <td className="table-edit">
                                                                <a>
                                                                    <i
                                                                        onClick={() => {
                                                                            this.showModal(
                                                                                record.userName,
                                                                                record.id
                                                                            );
                                                                        }}
                                                                        class="fas fa-trash-alt"
                                                                        data-target="#exampleModal"
                                                                        data-toggle="modal"></i>
                                                                </a>
                                                            </td>

                                                            {this.state
                                                                .showModal && (
                                                                <Modal
                                                                    content={
                                                                        "B???n c?? mu???n x??a user:" +
                                                                        this
                                                                            .state
                                                                            .contentModal
                                                                    }
                                                                    title={
                                                                        "X??a User"
                                                                    }
                                                                    submit={() =>
                                                                        this.onDeleleProd()
                                                                    }
                                                                />
                                                            )}
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
                <Footer />
            </div>
        );
    }
}
