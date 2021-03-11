import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import { API_URL } from '../../../../helpers/admin/urlCallAxios';

export const authControl = {
    isAuthenticated: false,
    roles: '',
    authenticate(roles) {
        this.isAuthenticated = true;
        this.roles = roles;
    },
    signout(cb) {
        this.isAuthenticated = false;
        this.roles = '';
    },
};

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            userName: '',
            password: '',
            roles: '',
            cookies: '',
            redirect: false,
            message: '',
        };
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleClickSubmit = this.handleClickSubmit.bind(this);
    }

    handleUserNameChange(e) {
        this.setState({
            userName: e.target.value,
        });
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value,
        });
    }

    onLoginUser = () => {
        const url = `${API_URL}/api/auth/login`;
        const loginInfo = {
            userName: this.state.userName,
            password: this.state.password,
        };
        axios
            .post(url, loginInfo, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                this.setState({
                    userId: res.data.id,
                    userName: res.data.userName,
                    roles: res.data.roles,
                    redirect: true,
                });

                authControl.authenticate(this.state.roles);
                Cookies.set('usrCks', `${this.state.roles}`, { expires: 2 });
                Cookies.set('Usr_N', `${this.state.userName}`, { expires: 2 });
                Cookies.set('Usr_I', `${this.state.userId}`);
            })
            .catch((error) => this.setState({ message: error.message }));
    };

    handleClickSubmit(e) {
        e.preventDefault();
    }

    handleOnSubmit(e) {
        try {
            e.preventDefault();
            this.onLoginUser();
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <body class='hold-transition login-page'>
                {authControl.isAuthenticated && <Redirect to='/admin/home' />}
                <div className='login-box'>
                    <div className='login-logo'>
                        <a>
                            admin <b>Đăng nhập</b>{' '}
                        </a>
                    </div>
                    {/* /.login-logo */}
                    <div className='card'>
                        <div className='card-body login-card-body'>
                            <p className='login-box-msg'>Vui lòng đăng nhập</p>
                            <form onSubmit={this.handleOnSubmit}>
                                <div className='input-group mb-3'>
                                    <input
                                        value={this.state.userName}
                                        onChange={this.handleUserNameChange}
                                        type='text'
                                        className='form-control'
                                        placeholder='Tên đăng nhập'
                                    />
                                    <div className='input-group-append'>
                                        <div className='input-group-text'>
                                            <span className='fas fa-envelope' />
                                        </div>
                                    </div>
                                </div>
                                <div className='input-group mb-3'>
                                    <input
                                        value={this.state.password}
                                        onChange={this.handlePasswordChange}
                                        type='password'
                                        className='form-control'
                                        placeholder='Mật khẩu'
                                    />
                                    <div className='input-group-append'>
                                        <div className='input-group-text'>
                                            <span className='fas fa-lock' />
                                        </div>
                                    </div>
                                </div>
                                {this.state.message && <p className=''>{this.state.message}</p>}
                                <div className='row'>
                                    <div className='col-8'>
                                        <div className='icheck-primary'>
                                            <input type='checkbox' id='remember' />
                                            <label htmlFor='remember'>Nhớ mật khẩu</label>
                                        </div>
                                    </div>
                                    {/* /.col */}

                                    {(this.state.redirect || this.state.roles == 'Admin') && (
                                        <Redirect to='/admin/home' />
                                    )}

                                    <div className='col-4'>
                                        <button type='submit' className='btn btn-primary btn-block'>
                                            Sign In
                                        </button>
                                    </div>
                                    {/* /.col */}
                                </div>
                            </form>

                            {/* /.social-auth-links */}
                        </div>
                        {/* /.login-card-body */}
                    </div>
                </div>
                {/* /.login-box */}
            </body>
        );
    }
}
