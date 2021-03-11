import React from 'react';
import { Link, NavLink, useRouteMatch as match, withRouter } from 'react-router-dom';
import Header from '../../../layout/admin/Header';
import Menu from '../../../layout/admin/Menu';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { showToastSuccess } from '../../../../helpers/admin/toastNotify';
import { API_URL } from '../../../../helpers/admin/urlCallAxios';
import axios from 'axios';
import Modal from '../../../helperComponent/modal';

export default class ListCategories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],

            /**Modal State */
            showModal: false,
            contentModal: '',
            idToDelete: 0,
        };
    }

    componentDidMount() {
        const url = `${API_URL}/api/categoriesblog`;

        axios.get(url, { withCredentials: true }).then((res) => {
            this.setState({
                categories: res.data,
            });
        });
    }

    showModal(name, id) {
        this.setState({
            showModal: true,
            contentModal: name,
            idToDelete: id,
        });
    }

    onDeleleCategoriesBlog = (id) => {
        console.log(this.state.idToDelete);
        const urlToDeleteProd = `${API_URL}/api/categoriesblog/${id}`;
        console.log(urlToDeleteProd);
        axios.delete(urlToDeleteProd, { withCredentials: true }).then(() => {
            window.location.reload();
            showToastSuccess('Xóa thành công');
        });
    };

    render() {
        return (
            <>
                <ToastContainer />
                <Header />
                <Menu />
                <div className='content-wrapper' style={{ minHeight: '700px' }}>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-12'>
                                <div className='card'>
                                    <div className='card-header'>
                                        <h3 className='card-title'>Danh sách loại bài đăng</h3>
                                    </div>
                                    {/* /.card-header */}
                                    <div className='card-body'>
                                        <div className='row col-md'>
                                            <NavLink to='/admin/categoriesblog/create'>
                                                <button type='button' className='btn btn-success btn-lg'>
                                                    Thêm danh mục bài đăng
                                                </button>
                                            </NavLink>
                                        </div>
                                        <table className='table table-bordered table-hover'>
                                            <thead>
                                                <tr>
                                                    <th>Loại bài đăng</th>
                                                    <th className='table-edit'></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.categories.map((record, index) => (
                                                    <tr>
                                                        <td>{record.categoryBlogName}</td>

                                                        <td className='table-edit'>
                                                            {/* <NavLink
                                                                    to={
                                                                        "/admin/categoriesblog/edit/" +
                                                                        record.categoryBlogId
                                                                    }>
                                                                    <i class="fas fa-edit text-success">
                                                                        {" "}
                                                                    </i>
                                                                </NavLink> */}
                                                            <a>
                                                                <i
                                                                    onClick={() => {
                                                                        this.showModal(
                                                                            record.categoryBlogName,
                                                                            record.categoryBlogId
                                                                        );
                                                                    }}
                                                                    class='fas fa-trash-alt'
                                                                    data-target='#exampleModal'
                                                                    data-toggle='modal'></i>
                                                            </a>
                                                            {this.state.showModal && (
                                                                <Modal
                                                                    content={
                                                                        'Bạn có muốn xóa sản phẩm:' +
                                                                        this.state.contentModal
                                                                    }
                                                                    title={'Xóa sản phẩm' + this.state.idToDelete}
                                                                    submit={() =>
                                                                        this.onDeleleCategoriesBlog(
                                                                            this.state.idToDelete
                                                                        )
                                                                    }
                                                                />
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
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
            </>
        );
    }
}
