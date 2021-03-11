import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { API_URL } from '../../../helpers/admin/urlCallAxios';
import axios from 'axios';
import Cookies from 'js-cookie';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            userName: '',
            redirectToEditUser: false,
        };
    }
    handleLogout = (e) => {
        e.preventDefault();
        const urlToSignOut = `${API_URL}/api/auth/logout`;
        axios.post(urlToSignOut, null, { withCredentials: true }).then(() => {
            Cookies.remove('usrCks');
            Cookies.remove('Usr_I');
            Cookies.remove('Usr_N');
            window.location.reload();
        });
    };
    componentDidMount() {
        this.setState({
            userName: Cookies.get('Usr_N'),
            userId: Cookies.get('Usr_I'),
        });
    }

    render() {
        const idCurrentUser = Cookies.get('Usr_I');

        return (
            <aside className='main-sidebar sidebar-dark-primary elevation-4' style={{ position: 'fixed' }}>
                {/* Brand Logo */}
                <Link to='/' className='brand-link'>
                    <span className='brand-text font-weight-bold'>C. P. SEEDS VIETNAM</span>
                </Link>
                {/* Sidebar */}
                <div className='sidebar'>
                    {/* Sidebar user panel (optional) */}
                    <div className='user-panel mt-3 pb-3 mb-3 d-flex'>
                        <div className='info'>
                            <Link className='d-block' to={'/admin/editusers/' + idCurrentUser}>
                                Xin chào <b>{this.state.userName}</b>
                            </Link>
                            <button onClick={this.handleLogout} className='btn-danger'>
                                Logout
                            </button>
                        </div>
                    </div>
                    {/* Sidebar Menu */}
                    <nav className='mt-2'>
                        <ul
                            className='nav nav-pills nav-sidebar flex-column'
                            data-widget='treeview'
                            role='menu'
                            data-accordion='false'>
                            {/* Add icons to the links using the .nav-icon class
                 with font-awesome or any other icon font library */}
                            <li className='nav-item'>
                                <NavLink to='/admin/home' className='nav-link'>
                                    <i className='nav-icon fas fa-home' />
                                    <p>Trang chủ</p>
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to='/admin/products' className='nav-link'>
                                    <i class='nav-icon fas fa-seedling'></i>
                                    <p>Sản phẩm</p>
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to='/admin/categories' className='nav-link'>
                                    <i className='nav-icon fas fa-th' />
                                    <p>Loại sản phẩm</p>
                                </NavLink>
                            </li>

                            <li className='nav-item'>
                                <NavLink to='/admin/users' className='nav-link'>
                                    <i class='nav-icon fas fa-user-alt'></i>
                                    <p>Tài khoản admin</p>
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to='/admin/banners' className='nav-link'>
                                    <i class='nav-icon fas fa-images'></i>
                                    <p>Banners</p>
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to='/admin/orders' className='nav-link'>
                                    <i class='nav-icon fas fa-money-check-alt'></i>
                                    <p>Đơn hàng</p>
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to='/admin/blogs' className='nav-link'>
                                    <i class='nav-icon fas fa-newspaper'></i>
                                    <p>Bài đăng, tin tức</p>
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to='/admin/categoriesblog' className='nav-link'>
                                    <i className='nav-icon fas fa-th' />
                                    <p>Danh mục bài đăng</p>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}
            </aside>
        );
    }
}
export default withRouter(Menu);
