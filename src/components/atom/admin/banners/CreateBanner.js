import axios from 'axios'
import React from 'react'
import { Redirect } from 'react-router-dom'
import Footer from '../../../layout/admin/Footer'
import Header from '../../../layout/admin/Header'
import Menu from '../../../layout/admin/Menu'
import { API_URL } from "../../../../helpers/admin/urlCallAxios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToastFailed, showToastSuccess } from '../../../../helpers/admin/toastNotify'

export default class CreateBanner extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderId: 0,
            selectedFile: [],
            showDetailsBannerUpload: false,
            /**Error Response */
            message: ''
            /**End Error Response */
        }
        this.handleOrderIdBanner = this.handleOrderIdBanner.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }
    handleOrderIdBanner(e) {
        e.preventDefault()
        try {
            this.setState({
                orderId: e.target.value
            }, () => { console.log(this.state.orderId) })

        } catch (error) {

        }
    }
    onFileChange = event => {

        // Update the state 
        this.setState({
            selectedFile: event.target.files[0],
            showDetailsBannerUpload: true
        });


    };
    onBannerUpload() {
        const formData = new FormData();
        formData.append(
            'file',
            this.state.selectedFile
        )
        const urlCreateBanner = `${API_URL}/api/banners/${this.state.orderId}`
       try {
        axios.post(urlCreateBanner, formData, { withCredentials: true })     
        
        .then(res => {
            this.setState({
                message: res.data.message,
                redirectToHome: true

            })
        }).then(() => {
            showToastSuccess(this.state.message)
        })
        .catch(error => {
            showToastFailed(error.response.data.message)
        });
       
       } catch (error) {     

       }      
    }

    handleSubmit(e) {
        e.preventDefault();
        this.onBannerUpload();

    }

    fileData = () => {

        if (this.state.selectedFile) {
            return (
                <div>
                    <h2>Chi ti???t h??nh ???nh ????ng t???i</h2>
                    <p>T??n file: {this.state.selectedFile.name}</p>
                    <p>Lo???i file: {this.state.selectedFile.type}</p>

                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <p>Vui l??ng ch???n h??nh ???nh </p>
                </div>
            );
        }
    };
    render() {
        return (
            <div>
                <ToastContainer/>
                <Header />
                <Menu />
                {
                    this.state.redirectToHome && <Redirect to='/admin/banners' />
                }
                <div className='content-wrapper' style={{ minHeight: '700px' }}>
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Th??m banner</h1>
                                </div>

                            </div>
                        </div>{/* /.container-fluid */}
                    </section>
                    <div>
                        <div className="col-md-6">
                            {/* general form elements */}
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Th??m banner</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form role="form" onSubmit={this.handleSubmit}>
                                    <div className='d-flex flex-row bd-highlight mb-3'>
                                        <div className='col-sm-12'>
                                            <div className='form-group'>
                                                <label>V??? tr?? c???a banner</label>
                                                <select className="form-control"
                                                    onChange={this.handleOrderIdBanner}>
                                                    <option value="1">Tr??n</option>
                                                    <option value="2">B??n tr??i</option>
                                                    <option value="3">B??n ph???i</option>
                                                    <option value="4">D?????i</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputFile">H??nh ???nh banner</label>
                                                <div className="input-group">
                                                    <div className="custom-file">
                                                        <label className="custom-file-label" htmlFor="exampleInputFile">
                                                            Ch???n h??nh ???nh
                                                        <input type="file" onChange={this.onFileChange} className="custom-file-input" id="exampleInputFile" multiple />
                                                        </label>

                                                    </div>

                                                </div>

                                            </div>
                                            {
                                                this.state.showDetailsBannerUpload &&
                                                <div className="form-group">
                                                    {
                                                        this.fileData()
                                                    }

                                                </div>
                                            }

                                        </div>

                                    </div>
                                    <div className='col-md-12 pl-3 pb-5' >
                                        <div className='d-flex justify-content-around'>
                                            <button type="submit" className="btn btn-primary">X??c nh???n</button>
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
