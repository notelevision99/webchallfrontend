import React from "react";
import axios from "axios";
import { API_URL } from "../../../../helpers/admin/urlCallAxios";
import Header from "../../../layout/admin/Header";
import Menu from "../../../layout/admin/Menu";
import Footer from "../../../layout/admin/Footer";
import { ToastContainer } from "react-toastify";
import { Redirect } from "react-router-dom";
import { showToastSuccess } from "../../../../helpers/admin/toastNotify";

// TODO
export default class CreateCategories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryName: "",
            redirect: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeCategoryName = this.handleChangeCategoryName.bind(
            this
        );
    }

    onCreateCategory = () => {
        const urlToCreate = `${API_URL}/api/categories`;
        const categoryData = {
            categoryName: this.state.categoryName,
        };
        axios
            .post(urlToCreate, categoryData, { withCredentials: true })
            .then(() => showToastSuccess("Thêm danh mục thành công"));

        return this.setState({ redirect: true });
    };

    handleChangeCategoryName(e) {
        e.preventDefault();
        this.setState({
            categoryName: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        try {
            this.onCreateCategory();
        } catch (error) {}
    }

    render() {
        return (
            <>
                <ToastContainer />
                <Header />
                <Menu />
                {this.state.redirect && <Redirect to="/admin/categories" />}
                <div className="content-wrapper" style={{ minHeight: "700px" }}>
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Thêm loại sản phẩm</h1>
                                </div>
                            </div>
                        </div>
                        {/* /.container-fluid */}
                    </section>
                    <div>
                        <div className="col-md-12">
                            {/* general form elements */}
                            <div className="card card-primary">
                                <div
                                    style={{ background: "#46A908" }}
                                    className="card-header">
                                    <h3 className="card-title">
                                        Thêm danh mục sản phẩm
                                    </h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form role="form" onSubmit={this.handleSubmit}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">
                                                Tên danh mục
                                            </label>
                                            <input
                                                value={this.state.categoryName}
                                                onChange={
                                                    this
                                                        .handleChangeCategoryName
                                                }
                                                type="text"
                                                className="form-control"
                                                placeholder="Nhập loại sản phẩm"
                                            />
                                        </div>
                                    </div>
                                    {/* /.card-body */}
                                    <div className="card-footer">
                                        <button
                                            type="submit"
                                            className="btn btn-primary">
                                            Xác nhận
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}
