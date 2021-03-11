import React from 'react'
import axios from "axios";
import { API_URL } from "../../../../helpers/admin/urlCallAxios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../../../layout/admin/Header';
import Menu from '../../../layout/admin/Menu';
import Footer from '../../../layout/admin/Footer';
export default class OrderDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderDetail: {
                id: 0,
                userName: '',
                dateOrder: '',
                shipAddress: '',
                shipCity: '',
                shipProvince: '',
                phoneNumber: '',
                email: '',
                userId: '',
                totalPrice: '',
                items: []
            },
           
            

        }
    }

    componentDidMount() {
        const urlGetOrderByOrderId = `${API_URL}/api/orders/${this.props.match.params.orderId}`
        axios.get(urlGetOrderByOrderId, { withCredentials: true })
            .then(res => {
                this.setState({
                    orderDetail: {
                        id: res.data.id,
                        userName: res.data.userName,
                        dateOrder: res.data.dateOrder,
                        shipAddress: res.data.shipAddress,
                        shipCity: res.data.shipCity,
                        shipProvince: res.data.shipProvince,
                        userId: res.data.userId,
                        phoneNumber: res.data.phoneNumber,
                        email: res.data.email,
                        totalPrice: res.data.totalPrice,
                        items: res.data.items
                    }
                })
            })
    }

    render() {
        return (
            <>
                <ToastContainer />
                <Header />
                <Menu />
                <div className='content-wrapper' style={{ minHeight: '700px' }}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">

                                <div className="invoice p-3 mb-3">
                                    {/* title row */}
                                    <div className="row">
                                        <div className="col-12">
                                            <h4>
                                                <i className="fas fa-globe" /> Công ty nông nghiệp
                                                <small className="float-right">Date: {this.state.orderDetail.dateOrder}</small>
                                            </h4>
                                        </div>
                                        {/* /.col */}
                                    </div>
                                    {/* info row */}
                                    <div className="row invoice-info">

                                        <div className="col-sm-4 invoice-col">
                                            <i>Thông tin khách hàng</i>
                                            <address>
                                                <b>Tên khách hàng:</b> {this.state.orderDetail.userName}<br />
                                                <b>Địa chỉ:</b> {this.state.orderDetail.shipAddress}<br />
                                                <b>Số điện thoại:</b> {this.state.orderDetail.phoneNumber}<br />
                                                <b>Email:</b> {this.state.orderDetail.email}<br />

                                            </address>
                                        </div>
                                        {/* /.col */}
                                        <div className="col-sm-4 invoice-col">
                                            <b>Mã hóa đơn #{this.state.orderDetail.id}</b><br />
                                            <br />
                                            <b>Order ID:</b> {this.state.orderDetail.orderId}<br />

                                        </div>
                                        {/* /.col */}
                                    </div>
                                    {/* /.row */}
                                    {/* Table row */}
                                    <div className="row">
                                        <div className="col-12 table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Số lượng</th>
                                                        <th>Tên sản phẩm</th>
                                                        <th>Hình ảnh</th>
                                                        <th>Description</th>
                                                        <th>Thành tiền</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.orderDetail.items.map((record) => (
                                                            <tr>
                                                                <td>{record.quantity}</td>
                                                                <td>{record.productName}</td>
                                                                <td>
                                                                    <img className="img-listItemsOrder" src={record.photoUrl}/>
                                                                </td>
                                                                <td>{record.description}</td>
                                                                <td>{record.totalPrice}đ</td>
                                                            </tr>
                                                        ))
                                                    }
                                                    
                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                        {/* /.col */}
                                    </div>
                                    {/* /.row --
                                    */}</div>


                            </div>
                            {/* /.col */}
                        </div>
                        {/* /.row */}
                    </div>

                </div>
                <Footer />
            </>
        )
    }
}
