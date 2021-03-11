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
            blogs: [],
            btnActive: 0,

            showModal: false,
            contentModal: '',
            idToDelete: '',
        };
    }

    componentDidMount() {
        const url = `${API_URL}/api/categoriesblog`;

        axios.get(url, { withCredentials: true }).then((res) => {
            this.setState({
                categories: res.data,
            });

            const urlblogs = `${API_URL}/api/blogs/categoryblogs/${this.state.categories[0].categoryBlogId}?&pageNumer=1&pageSize=10`;

            axios.get(urlblogs, { withCredentials: true }).then((res) => {
                this.setState({
                    blogs: res.data.data,
                });
            });
        });
    }

    handleActiveButton(id, index) {
        const urlblogs = `${API_URL}/api/blogs/categoryblogs/${id}?&pageNumer=1&pageSize=10`;
        this.setState({ btnActive: index });

        axios.get(urlblogs, { withCredentials: true }).then((res) => {
            this.setState({
                blogs: res.data.data,
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

    onDeleleBlog = (id) => {
        console.log(this.state.idToDelete);
        const urlToDeleteProd = `${API_URL}/api/blogs/${id}`;
        console.log(urlToDeleteProd);
        axios
            .delete(urlToDeleteProd, { withCredentials: true })
            .then(() => {
                window.location.reload();
                showToastSuccess('Xóa sản phẩm thành công');
            })
            .catch();
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
                            <div className='col-3'>
                                <div className='card'>
                                    <div className='card-header'>
                                        <h3
                                            style={{
                                                color: 'rgba(139, 51, 0, 0.8)',
                                                fontWeight: 'bold',
                                            }}
                                            className='card-title'>
                                            Danh sách loại bài đăng
                                        </h3>
                                    </div>
                                    {/* /.card-header */}
                                    <div className='card-body'>
                                        <ul>
                                            {this.state.categories.map((category, index) => (
                                                <li>
                                                    <button
                                                        className={
                                                            this.state.btnActive === index
                                                                ? 'item-categories-blog active'
                                                                : 'item-categories-blog'
                                                        }
                                                        onClick={() =>
                                                            this.handleActiveButton(category.categoryBlogId, index)
                                                        }>
                                                        {category.categoryBlogName}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {/* /.card-body */}
                                </div>
                            </div>
                            <div className='col-9'>
                                <div className='card'>
                                    <div className='card-header bg-success'>
                                        <h3 className='card-title'>Danh sách bài đăng</h3>
                                    </div>
                                    {/* /.card-header */}
                                    <div className='card-body'>
                                        <NavLink to='/admin/blogs/create'>
                                            <button type='button' className='btn btn-success btn-lg'>
                                                Đăng bài
                                            </button>
                                        </NavLink>
                                        <table className='table table-bordered table-hover'>
                                            <thead>
                                                <tr>
                                                    <th>Tiêu đề bài viết</th>
                                                    <th className='table-edit'></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.blogs.map((record, index) => (
                                                    <tr>
                                                        <td>{record.title}</td>

                                                        <td className='table-edit'>
                                                            <NavLink to={'/admin/blogs/edit/' + record.blogId}>
                                                                <i class='fas fa-edit text-success'> </i>
                                                            </NavLink>
                                                            <a>
                                                                <i
                                                                    onClick={() => {
                                                                        this.showModal(record.title, record.blogId);
                                                                    }}
                                                                    class='fas fa-trash-alt'
                                                                    data-target='#exampleModal'
                                                                    data-toggle='modal'></i>
                                                            </a>
                                                            {this.state.showModal && (
                                                                <Modal
                                                                    content={
                                                                        'Bạn có muốn xóa bài đăng:' +
                                                                        this.state.contentModal
                                                                    }
                                                                    title={'Xóa bài  đăngđăng' + this.state.idToDelete}
                                                                    submit={() =>
                                                                        this.onDeleleBlog(this.state.idToDelete)
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
                                {/* /.col */}
                            </div>
                            {/* /.row */}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
