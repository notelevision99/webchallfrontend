import React from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import Footer from '../../../layout/admin/Footer';
import Header from '../../../layout/admin/Header';
import Menu from '../../../layout/admin/Menu';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CloudinaryUnsigned } from 'puff-puff/CKEditor';
import { API_URL } from '../../../../helpers/admin/urlCallAxios';
import InputForm from '../../../helperComponent/InputForm';
import { showToastFailed, showToastSuccess } from '../../../../helpers/admin/toastNotify';
import { Redirect } from 'react-router-dom';

export default class CreateBlog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogInfo: {
                blogId: 0,
                title: '',
                shortDescription: '',
                content: '',
                blogCategoryId: 1,
            },
            categoriesBlog: [],
            selectedFile: {},
            idBlogToAddPhoto: 0,
            redirect: false,
            showFileData: false,
            response: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleCateBlogChange = this.handleCateBlogChange.bind(this);
    }

    componentDidMount() {
        try {
            const urlGetListCateBlog = `${API_URL}/api/categoriesblog`;
            axios.get(urlGetListCateBlog, { withCredentials: true }).then((res) => {
                this.setState({
                    categoriesBlog: res.data,
                });
            }, console.log(this.state.categoriesBlog));
        } catch (error) {
            console.log(error);
        }
    }

    handleInputChange(e) {
        e.preventDefault();
        this.setState({
            blogInfo: Object.assign({}, this.state.blogInfo, { [e.target.name]: e.target.value }),
        });
    }
    //Handle Content Form
    handleDescriptionChange = (event, editor) => {
        this.imagePluginFactory(editor);
        this.setState({
            blogInfo: Object.assign({}, this.state.blogInfo, { content: editor.getData() }),
        });
    };
    handleCateBlogChange(e) {
        e.preventDefault();
        this.setState({
            blogInfo: Object.assign({}, this.state.blogInfo, { blogCategoryId: e.target.value }),
        });
    }
    imagePluginFactory(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new CloudinaryUnsigned(loader, 'dvezhpk57', 'lmgwffy6', [160, 500, 1000, 1052]);
        };
    }
    //End Handle Content Form///

    handleSubmit(e) {
        e.preventDefault();
        this.onBlogUpload();
    }
    //handle File Upload
    onFileChange = (event) => {
        // Update the state
        this.setState({
            selectedFile: event.target.files[0],
            showFileData: true,
        });
    };

    onPhotoBlogUpload() {
        try {
            if (this.state.showFileData) {
                const urlPhotoBlogUpload = `${API_URL}/api/blogs/${this.state.idBlogToAddPhoto}/photos`;
                const formData = new FormData();
                formData.append('file', this.state.selectedFile);
                axios
                    .post(urlPhotoBlogUpload, formData, {
                        withCredentials: true,
                        headers: {
                            'content-type': 'multipart/form-data',
                        },
                    })
                    .then(() => {
                        showToastSuccess('Upload hình ảnh thành công');
                    })
                    .catch((err) => {
                        showToastFailed(err.response.data.message);
                    });
            }
        } catch (error) {}
    }

    onBlogUpload() {
        try {
            const urlToCreateBlog = `${API_URL}/api/blogs`;
            axios
                .post(urlToCreateBlog, this.state.blogInfo, { withCredentials: true })
                .then((res) => {
                    this.setState({
                        idBlogToAddPhoto: res.data.blogId,
                        redirect: true,
                        response: res.data,
                    });
                })
                .then(() => {
                    showToastSuccess('Đăng tin thành công!');
                })
                .then(() => this.onPhotoBlogUpload())
                .catch((err) => {
                    showToastFailed(err.response.data.message);
                });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div>
                <ToastContainer />
                <Header />
                <Menu />

                <div className='content-wrapper' style={{ minHeight: '700px' }}>
                    <section className='content-header'>
                        <div className='container-fluid'>
                            <div className='row mb-2'>
                                <div className='col-sm-6'>
                                    <h1>Thêm tin tức</h1>
                                </div>
                            </div>
                        </div>
                        {/* /.container-fluid */}
                    </section>
                    <div>
                        <div className='col-md-12'>
                            {/* general form elements */}
                            <div className='card card-primary'>
                                <div className='card-header'>
                                    <h3 className='card-title'>Thêm tin tức</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form role='form' onSubmit={this.handleSubmit}>
                                    <div className='d-flex flex-row bd-highlight mb-3'>
                                        <div className='col-sm-6'>
                                            <div className='form-group'>
                                                <label>Tiêu đề</label>
                                                <InputForm
                                                    className='form-control'
                                                    placeholder='Nhập tiêu đề'
                                                    name='title'
                                                    value={this.state.blogInfo.title}
                                                    onChange={this.handleInputChange}
                                                />
                                            </div>
                                            {/* <div className="form-group">
                                                <label htmlFor="exampleInputFile">Hình ảnh banner</label>
                                                <div className="input-group">
                                                    <div className="custom-file">
                                                        <label className="custom-file-label" htmlFor="exampleInputFile">
                                                            Chọn hình ảnh
                                                        <input type="file" onChange={this.onFileChange} className="custom-file-input" id="exampleInputFile" multiple />
                                                        </label>

                                                    </div>

                                                </div>

                                            </div> */}
                                            {/* {
                                                this.state.showDetailsBannerUpload &&
                                                <div className="form-group">
                                                    {
                                                        this.fileData()
                                                    }

                                                </div>
                                            } */}
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label>Đoạn giới thiệu</label>
                                                <InputForm
                                                    className='form-control'
                                                    placeholder='Nhập đoạn giới thiệu'
                                                    name='shortDescription'
                                                    value={this.state.blogInfo.shortDescription}
                                                    onChange={this.handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex flex-row bd-highlight mb-3'>
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label>Nội dung tin</label>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={this.state.blogInfo.content}
                                                    onChange={this.handleDescriptionChange}
                                                />
                                            </div>
                                        </div>
                                        {this.state.categoriesBlog ? (
                                            <div className='col-md-6'>
                                                {/* select */}
                                                <div className='form-group'>
                                                    <label>Loại bài viết</label>
                                                    <select
                                                        className='form-control'
                                                        onChange={this.handleCateBlogChange}>
                                                        {this.state.categoriesBlog.map((record) => (
                                                            <option value={record.categoryBlogId}>
                                                                {record.categoryBlogName}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className='d-flex flex-row bd-highlight mb-3'>
                                        {/* End Load ListCategories */}

                                        {/**Upload Blog Image */}
                                        {
                                            <div className='col-md-6'>
                                                <div className='form-group'>
                                                    <label htmlFor='exampleInputFile'>Hình ảnh</label>
                                                    <div className='input-group'>
                                                        <div className='custom-file'>
                                                            <label
                                                                className='custom-file-label'
                                                                htmlFor='exampleInputFile'>
                                                                Chọn hình ảnh
                                                                <input
                                                                    type='file'
                                                                    onChange={this.onFileChange}
                                                                    className='custom-file-input'
                                                                    id='exampleInputFile'
                                                                />
                                                            </label>
                                                        </div>
                                                    </div>
                                                    {this.state.showFileData && (
                                                        <div>
                                                            <div className='List_nameImage'>
                                                                {
                                                                    <div>
                                                                        <h2>Chi tiết hình ảnh đăng tải</h2>
                                                                        <p>
                                                                            Tên hình ảnh: {this.state.selectedFile.name}
                                                                        </p>
                                                                        <p>
                                                                            Loại hình ảnh:{' '}
                                                                            {this.state.selectedFile.type}
                                                                        </p>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        }
                                        {/**End Upload Blog Image */}
                                    </div>
                                    {this.state.redirect && <Redirect to='/admin/blogs' />}
                                    <div className='col-md-12 pl-3 pb-5'>
                                        <div className='d-flex justify-content-around'>
                                            <button type='submit' className='btn btn-primary'>
                                                Xác nhận
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
