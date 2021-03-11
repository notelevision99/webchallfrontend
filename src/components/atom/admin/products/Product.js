import React from 'react';
import axios from 'axios';

import { Redirect, withRouter } from 'react-router';
import { Link, NavLink, useRouteMatch as match } from 'react-router-dom';
import Header from '../../../layout/admin/Header';
import Menu from '../../../layout/admin/Menu';
import '../../../../css/main.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../../layout/admin/Footer';
import Modal from '../../../helperComponent/modal';
import { API_URL } from '../../../../helpers/admin/urlCallAxios';
import { showToastSuccess } from '../../../../helpers/admin/toastNotify';
import Pagination from 'react-js-pagination';

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],

            /*Sort State */
            countClickSortProdName: 0,
            countClickSortCategory: 0,
            countClickSortPrice: 0,
            isSortProdName: false,
            isSortCagoryName: false,
            isSortPrice: false,
            isSearch: false,
            searchByProdNameParams: '',
            orderByProdNameParams: '',
            orderByCategoryIdParams: '',
            orderByPriceParams: '',
            /*End Sort State*/

            /**Paging State */
            isPaging: false,
            activePage: 1,
            totalItem: 0,
            /**End Paging State */

            categoryName: '',

            /**Modal State */
            showModal: false,
            contentModal: '',
            idToDelete: 0,

            /**End Modal State */

            redirect: false,
        };
        this.handleSortProdName = this.handleSortProdName.bind(this);
        this.handleSortPrice = this.handleSortPrice.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleSearchProducts = this.handleSearchProducts.bind(this);
    }

    componentDidMount() {
        try {
            let url = '';
            switch (this.state.searchByProdNameParams) {
                case '':
                    if (this.state.isSortProdName) {
                        url = `${API_URL}/api/products?${this.state.orderByProdNameParams}&pageNumber=${this.state.activePage}&pageSize=5`;
                    } else if (this.state.isSortCagoryName) {
                        url = `${API_URL}/api/products?${this.state.orderByCategoryIdParams}&pageNumber=${this.state.activePage}&pageSize=5`;
                    } else if (this.state.isSortPrice) {
                        url = `${API_URL}/api/products?${this.state.orderByPriceParams}&pageNumber=${this.state.activePage}&pageSize=5`;
                    } else {
                        url = `${API_URL}/api/products?${this.state.orderByProdNameParams}&pageNumber=${this.state.activePage}&pageSize=5`;
                    }
                    break;
                default:
                    url = `${API_URL}/api/products?filter=productName~=${this.state.searchByProdNameParams}&pageNumber=${this.state.activePage}&pageSize=5`;
                    console.log(url);
                    if (this.state.isSortProdName) {
                        url = `${API_URL}/api/products?filter=productName~=${this.state.searchByProdNameParams}${this.state.orderByProdNameParams}&pageNumber=${this.state.activePage}&pageSize=5`;
                    }
                    if (this.state.isSortCagoryName) {
                        url = `${API_URL}/api/products?filter=productName~=${this.state.searchByProdNameParams}${this.state.orderByCategoryIdParams}&pageNumber=${this.state.activePage}&pageSize=5`;
                    }
                    if (this.state.isSortPrice) {
                        url = `${API_URL}/api/products?filter=productName~=${this.state.searchByProdNameParams}${this.state.orderByPriceParams}&pageNumber=${this.state.activePage}&pageSize=5`;
                    }
                    break;
            }
            return axios.get(url, { withCredentials: true }).then((res) =>
                this.setState({
                    products: res.data.data,
                    totalItem: res.data.totalCount,
                })
            );
        } catch (error) {
            console.log(error);
        }
    }

    /**Handle Sort ProdName */

    handleSortProdName = () => {
        this.setState({
            //Count Number Click Sort
            countClickSortProdName: this.state.countClickSortProdName + 1,
        });
        if (this.state.countClickSortProdName > 0 && this.state.countClickSortProdName % 2 !== 0) {
            this.setState(
                {
                    isSortProdName: true,
                    isSortCagoryName: false,
                    isSortPrice: false,
                    orderByProdNameParams: '&order=productName;desc',
                },
                () => {
                    this.componentDidMount();
                }
            );
        } else {
            this.setState(
                {
                    isSortProdName: true,
                    orderByProdNameParams: '&order=productName;asc',
                },
                () => {
                    this.componentDidMount();
                }
            );
        }
    };
    // }
    /**End handle Sort ProdName */

    handleSortCategory = () => {
        this.setState({
            //Count Number Click Sort
            countClickSortCategory: this.state.countClickSortCategory + 1,
        });
        if (this.state.countClickSortCategory > 0 && this.state.countClickSortCategory % 2 !== 0) {
            this.setState(
                {
                    isSortCagoryName: true,
                    isSortProdName: false,
                    isSortPrice: false,
                    orderByCategoryIdParams: '&order=categoryId;desc',
                },
                () => {
                    this.componentDidMount();
                }
            );
        } else {
            this.setState(
                {
                    isSortCagoryName: true,
                    orderByCategoryIdParams: '&order=categoryId;asc',
                },
                () => {
                    this.componentDidMount();
                }
            );
        }
    };

    handleSortPrice = () => {
        this.setState({
            //Count Number Click Sort
            countClickSortPrice: this.state.countClickSortPrice + 1,
        });
        if (this.state.countClickSortPrice > 0 && this.state.countClickSortPrice % 2 !== 0) {
            this.setState(
                {
                    isSortPrice: true,
                    isSortCagoryName: false,
                    isSortProdName: false,
                    orderByPriceParams: '&order=price;desc',
                },
                () => {
                    this.componentDidMount();
                }
            );
        } else {
            this.setState(
                {
                    isSortPrice: true,

                    orderByPriceParams: '&order=price;asc',
                },
                () => {
                    this.componentDidMount();
                }
            );
        }
    };

    /**
     * Handle Search Product
     */
    handleSearchProducts(e) {
        e.preventDefault();
        this.setState(
            {
                searchByProdNameParams: e.target.value,
                isSortCagoryName: false,
                isSortPrice: false,
                isSortPrice: false,
            },
            () => this.componentDidMount()
        );
    }
    /**
     * Handle Paging
     */
    handlePageChange(pageNumber) {
        this.setState(
            {
                activePage: pageNumber,
            },
            () => {
                this.componentDidMount();
                window.scroll(0, 0);
            }
        );
    }
    handleEditProduct = (id) => {
        this.setState({
            redirect: true,
            idToEdit: id,
        });
    };

    // handleDeleteProd = id => {
    //     this.setState({showModal: true})
    //     console.log("clicked")
    // }
    showModal(name, id) {
        this.setState({
            showModal: true,
            contentModal: name,
            idToDelete: id,
        });
    }

    onDeleleProd = () => {
        console.log(this.state.idToDelete);
        const urlToDeleteProd = `${API_URL}/api/products/${this.state.idToDelete}`;
        console.log(urlToDeleteProd);
        axios.delete(urlToDeleteProd, { withCredentials: true }).then(() => {
            window.location.reload();
            showToastSuccess('Xóa sản phẩm thành công');
        });
    };
    render() {
        // if(this.state.redirect){
        //     return <NavLink to="/products"/>
        // }
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
                                        <h3 className='card-title'>Danh sách sản phẩm</h3>
                                    </div>
                                    {/* /.card-header */}
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='col-md-9'>
                                                <NavLink to='/admin/products/create'>
                                                    <button type='button' className='btn btn-success btn-lg'>
                                                        Thêm sản phẩm
                                                    </button>
                                                </NavLink>
                                            </div>
                                            <div className='col-md-3 d-flex align-items-end'>
                                                <div className='input-group input-group-sm'>
                                                    <div class='d-flex flex-row bd-highlight'>
                                                        <input
                                                            value={this.state.searchByProdNameParams}
                                                            onChange={this.handleSearchProducts}
                                                            className='form-control form-control-navbar'
                                                            type='text'
                                                            placeholder='Tìm kiếm sản phẩm'
                                                            aria-label='Search'
                                                        />
                                                        <div className='input-group-append'>
                                                            <button className='btn btn-navbar' type='submit'>
                                                                <i className='fas fa-search' />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <table className='table table-bordered table-hover'>
                                            <thead>
                                                <tr>
                                                    <th onClick={this.handleSortProdName}>
                                                        Tên sản phẩm{' '}
                                                        {this.state.countClickSortProdName > 0 &&
                                                        this.state.countClickSortProdName % 2 !== 0 ? (
                                                            <i class='fas fa-sort-amount-up'></i>
                                                        ) : (
                                                            <i class='fas fa-sort-amount-down'></i>
                                                        )}
                                                    </th>
                                                    <th onClick={this.handleSortCategory}>
                                                        Loại sản phẩm
                                                        {this.state.countClickSortCategory > 0 &&
                                                        this.state.countClickSortCategory % 2 !== 0 ? (
                                                            <i class='fas fa-sort-amount-up'></i>
                                                        ) : (
                                                            <i class='fas fa-sort-amount-down'></i>
                                                        )}
                                                    </th>
                                                    <th onClick={this.handleSortPrice}>
                                                        {' '}
                                                        Giá
                                                        {this.state.countClickSortPrice > 0 &&
                                                        this.state.countClickSortPrice % 2 !== 0 ? (
                                                            <i class='fas fa-sort-amount-up'></i>
                                                        ) : (
                                                            <i class='fas fa-sort-amount-down'></i>
                                                        )}
                                                    </th>
                                                    <th className='table-image'>Photourl</th>
                                                    <th className='table-edit'></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.products.map((record, index) => (
                                                    <tr>
                                                        <td>{record.productName}</td>
                                                        <td>{record.categoryName}</td>
                                                        <td>
                                                            {new Intl.NumberFormat('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            }).format(record.price)}
                                                        </td>
                                                        <td className='table-image'>
                                                            <img className='img-listProd' src={record.photoUrl} />
                                                        </td>
                                                        <td className='table-edit'>
                                                            <NavLink to={'/admin/editproduct/' + record.id}>
                                                                <i class='fas fa-edit text-success'> </i>
                                                            </NavLink>

                                                            <a>
                                                                <i
                                                                    onClick={() => {
                                                                        this.showModal(record.productName, record.id);
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
                                                                    submit={() => this.onDeleleProd()}
                                                                />
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className='row-pagination'>
                                            <Pagination
                                                innerClass='pagination pagination-xl m-0'
                                                itemClass='page-item'
                                                linkClass='page-link'
                                                nextPageText={<i class='fas fa-step-forward'></i>}
                                                prevPageText={<i class='fas fa-step-backward'></i>}
                                                lastPageText={<i class='fas fa-fast-forward'></i>}
                                                firstPageText={<i class='fas fa-fast-backward'></i>}
                                                activePage={this.state.activePage}
                                                itemsCountPerPage={5}
                                                totalItemsCount={this.state.totalItem}
                                                pageRangeDisplayed={8}
                                                onChange={this.handlePageChange}
                                            />
                                        </div>
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
            </>
        );
    }
}
export default withRouter(Product);
