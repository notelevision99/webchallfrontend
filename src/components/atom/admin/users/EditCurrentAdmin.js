import React from 'react'
import axios from "axios";
import { API_URL } from "../../../../helpers/admin/urlCallAxios";
import { Cookies } from "js-cookie";
import Footer from '../../../layout/admin/Footer';
import Menu from '../../../layout/admin/Menu';
import Header from '../../../layout/admin/Header';
import { showToastSuccess } from '../../../../helpers/admin/toastNotify';
import { Redirect } from 'react-router-dom';

export default class EditCurrentAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userForEdit: [],
            /**Info User Edit */
            userId: '',
            userName: '',
            email: '',
            phoneNumber: '',
            address: '',
            /**End Info User Edit */
            redirectToHome: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeAddress = this.handleChangeAddress.bind(this)
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this)
        this.handleChangeUserName = this.handleChangeUserName.bind(this)

    }
    componentDidMount() {

        const urlGetCurrentUser = `${API_URL}/api/users/${this.props.match.params.id}`
        axios.get(urlGetCurrentUser, { withCredentials: true })
            .then(res => {
                this.setState({
                    userId: res.data.id,
                    userName: res.data.userName,
                    email: res.data.email,
                    phoneNumber: res.data.phoneNumber,
                    address: res.data.address
                })
            })
    }

    onUpdateUser() {
        const userToUpdate = {
            userName: this.state.userName,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email
        }
        const urlEditUser = `${API_URL}/api/users/${this.state.userId}`
        axios.put(urlEditUser, userToUpdate, { withCredentials: true })
            .then(() => showToastSuccess("Cập nhật user thành công"))

        return this.setState({
            redirectToHome: true
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.onUpdateUser();

    }
    handleChangeUserName(e) {
        e.preventDefault();
        this.setState({
            userName: e.target.value
        })
    }
    handleChangeEmail(e) {
        e.preventDefault();
        this.setState({
            email: e.target.value
        })
    }
    handleChangePhoneNumber(e) {
        e.preventDefault();
        this.setState({
            phoneNumber: e.target.value
        })
    }
    handleChangeAddress(e) {
        e.preventDefault();
        this.setState({
            address: e.target.value
        })
    }
    render() {
       
        return (
            <div>
                <Header />
                <Menu />
                {
                    this.state.redirectToHome && <Redirect to='/' />
                }
                <div className='content-wrapper' style={{ minHeight: '700px' }}>
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Thông tin của bạn</h1>
                                </div>

                            </div>
                        </div>{/* /.container-fluid */}
                    </section>
                    <div>
                        <div className="col-md-12">
                            {/* general form elements */}
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Chỉnh sửa thông tin cá nhân</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form role="form" onSubmit={this.handleSubmit}>
                                    <div className='d-flex flex-row bd-highlight mb-3'>
                                        <div className='col-md-6'>
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Tên tài khoản</label>
                                                    <input
                                                        value={this.state.userName}
                                                        onChange={this.handleChangeUserName}
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Nhập tên tài khoản" />
                                                </div>
                                            </div>

                                        </div>
                                        <div className='col-md-6'>
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Địa chỉ</label>
                                                    <input
                                                        value={this.state.address}
                                                        onChange={this.handleChangeAddress}
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Nhập địa chỉ" />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='d-flex flex-row bd-highlight '>
                                        <div className='col-md-6'>
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Số điện thoại</label>
                                                    <input
                                                        value={this.state.phoneNumber}
                                                        onChange={this.handleChangePhoneNumber}
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Nhập số điện thoại" />
                                                </div>
                                            </div>

                                        </div>
                                        <div className='col-md-6'>
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Email</label>
                                                    <input
                                                        value={this.state.email}
                                                        onChange={this.handleChangeEmail}
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Nhập địa chỉ email" />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='col-md-12 pl-3 pb-5' >
                                        <div className='d-flex justify-content-around'>
                                            <button type="submit" className="btn btn-primary">Xác nhận</button>
                                        </div>


                                    </div>
                                </form>
                            </div>
                        </div>


                    </div>

                </div>
                <Footer />
            </div>
        )
    }
}
