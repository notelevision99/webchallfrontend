import React from "react";
import axios from "axios";
import { API_URL } from "../../../../helpers/admin/urlCallAxios";
import Header from "../../../layout/admin/Header";
import Menu from "../../../layout/admin/Menu";
import Footer from "../../../layout/admin/Footer";
import { ToastContainer } from "react-toastify";
import { Redirect } from "react-router-dom";
import { showToastSuccess } from "../../../../helpers/admin/toastNotify";
import Pagination from "react-js-pagination";
export default class EditCategories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryForEdit: [],
            productsByCateId: [],
            categoryId: 0,
            categoryName: "",
            redirect: false,
            //State Paging List Products By CateID
            activePage: 1,
            totalItem: 0,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeCategoryName = this.handleChangeCategoryName.bind(
            this
        );
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        const url = `${API_URL}/api/categories/${this.props.match.params.categoryId}`;
        const urlGetProductsByCateId = `${API_URL}/api/categories/getproductsbycateid/${this.props.match.params.categoryId}?&pageNumber=${this.state.activePage}&pageSize=5`;
        axios.get(url, { withCredentials: true }).then((res) => {
            this.setState({
                categoryId: res.data.categoryId,
                categoryName: res.data.categoryName,
            });
        });

        return axios
            .get(urlGetProductsByCateId, { withCredentials: true })
            .then((res) => {
                this.setState({
                    productsByCateId: res.data.data,
                    totalItem: res.data.totalCount,
                });
            });
    }

    onUpdateCategory = () => {
        const urlToUpdate = `${API_URL}/api/categories/${this.props.match.params.categoryId}`;
        const categoryData = {
            categoryName: this.state.categoryName,
        };
        axios
            .put(urlToUpdate, categoryData, { withCredentials: true })
            .then(() => showToastSuccess("Cập nhật danh mục thành công"));

        return this.setState({ redirect: true });
    };

    handleChangeCategoryName(e) {
        e.preventDefault();
        this.setState({
            categoryName: e.target.value,
        });
    }
    //Paging List Product By CateId
    handlePageChange(pageNumber) {
        this.setState(
            {
                activePage: pageNumber,
            },
            () => {
                this.componentDidMount();
            }
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        try {
            this.onUpdateCategory();
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
                                    <h1>Sửa loại sản phẩm</h1>
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
                                        Sửa danh mục sản phẩm
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
                        <div className="col-md-12">
                            <div className="card">
                                <div
                                    style={{ background: "#725438" }}
                                    className="card-header">
                                    <h3
                                        style={{ color: "white" }}
                                        className="card-title">
                                        Danh sách sản phẩm thuộc{" "}
                                        {this.state.categoryName}
                                    </h3>
                                </div>
                                <div className="card-body p-0">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 10 }}>
                                                    Id
                                                </th>
                                                <th>Tên sản phẩm</th>
                                                <th>Loại sản phẩm</th>
                                                <th style={{ width: 40 }}>
                                                    Hình ảnh
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* <td>1.</td>
                                                <td>Update software</td>
                                                <td>
                                                    123
                                                </td>
                                                <td>456</td> */}
                                            {this.state.productsByCateId.map(
                                                (record, index) => (
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            {record.productName}
                                                        </td>
                                                        <td>
                                                            {
                                                                record.categoryName
                                                            }
                                                        </td>
                                                        <td>
                                                            <img
                                                                className="img-productsCateId"
                                                                src={
                                                                    record.photoUrl
                                                                }
                                                            />
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="row-pagination col-md-12">
                            <Pagination
                                innerClass="pagination pagination-xl m-0"
                                itemClass="page-item"
                                linkClass="page-link"
                                nextPageText={
                                    <i class="fas fa-step-forward"></i>
                                }
                                prevPageText={
                                    <i class="fas fa-step-backward"></i>
                                }
                                lastPageText={
                                    <i class="fas fa-fast-forward"></i>
                                }
                                firstPageText={
                                    <i class="fas fa-fast-backward"></i>
                                }
                                activePage={this.state.activePage}
                                itemsCountPerPage={5}
                                totalItemsCount={this.state.totalItem}
                                pageRangeDisplayed={8}
                                onChange={this.handlePageChange}
                            />
                        </div>
                        <br />
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}
