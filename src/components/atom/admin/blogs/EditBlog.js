import React from 'react';
import axios from 'axios';

import InputForm from '../../../helperComponent/InputForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CloudinaryUnsigned } from 'puff-puff/CKEditor';
import { API_URL } from '../../../../helpers/admin/urlCallAxios';
import Header from '../../../layout/admin/Header';
import Menu from '../../../layout/admin/Menu';
import Footer from '../../../layout/admin/Footer';
import Modal from '../../../../components/helperComponent/modal';
import { showToastFailed, showToastSuccess } from '../../../../helpers/admin/toastNotify';
import { Redirect } from 'react-router-dom';

export default class EditBlog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            blogInfo: {
                blogId: 0,
                title: '',
                shortDescription: '',
                content: '',
                blogCategoryId: 0,
                blogCategoryName: '',
                photo: {
                    photoId: 0,
                    photoUrl: '',
                },
            },
            categoriesBlog: [],
            showModalDeletePhoto: false,
            selectedFile: [],
            messageSuccess: '',
            redirect: false,
            showFileData: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChangeCatesBlog = this.handleChangeCatesBlog.bind(this);
    }

    componentDidMount() {
        try {
            const urlGetBlogById = `${API_URL}/api/blogs/${this.props.match.params.blogId}`;
            const urlGetListCategoryBlog = `${API_URL}/api/categoriesblog`;
            axios.get(urlGetBlogById, { withCredentials: true }).then((res) => {
                //Blog trả về có hình đại diện
                if (res.data.photo !== null) {
                    this.setState({
                        blogInfo: Object.assign({}, this.state.blogInfo, {
                            blogId: res.data.blogId,
                            title: res.data.title,
                            shortDescription: res.data.shortDescription,
                            content: res.data.content,
                            blogCategoryId: res.data.blogCategoryId,
                            blogCategoryName: res.data.blogCategoryName,
                            photo: {
                                photoId: res.data.photo.id,
                                photoUrl: res.data.photo.url,
                            },
                        }),
                    });
                }
                //Blog trả về không có hình đại diện
                else {
                    this.setState({
                        blogInfo: Object.assign({}, this.state.blogInfo, {
                            blogId: res.data.blogId,
                            title: res.data.title,
                            shortDescription: res.data.shortDescription,
                            content: res.data.content,
                            blogCategoryId: res.data.blogCategoryId,
                            blogCategoryName: res.data.blogCategoryName,
                        }),
                    });
                }
            });
            return axios.get(urlGetListCategoryBlog, { withCredentials: true }).then((res) => {
                this.setState({
                    categoriesBlog: res.data,
                });
            });
        } catch (error) {
            showToastSuccess('Có Lỗi xảy ra');
        }
    }

    //Form Input Change
    handleInputChange(e) {
        this.setState({
            blogInfo: Object.assign({}, this.state.blogInfo, {
                [e.target.name]: e.target.value,
            }),
        });
    }
    //Selection CateBlog Changes
    handleChangeCatesBlog(e) {
        e.preventDefault();
        this.setState({
            blogInfo: Object.assign({}, this.state.blogInfo, {
                blogCategoryId: e.target.value,
            }),
        });
    }

    //Handle Change Ckeditor Content Form
    handleDescriptionChange = (event, editor) => {
        this.imagePluginFactory(editor);
        this.setState({
            blogInfo: Object.assign({}, this.state.blogInfo, {
                content: editor.getData(),
            }),
        });
    };
    imagePluginFactory(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new CloudinaryUnsigned(loader, 'dvezhpk57', 'lmgwffy6', [160, 500, 1000, 1052]);
        };
    }
    //End Handle Change CkEditor Content Form
    //Handle Blog Update

    //Show Modal Delele Photo
    showModal = () => {
        this.setState({
            showModalDeletePhoto: true,
        });
    };

    //Handle Delele Photo
    onDeleteImage = () => {
        try {
            const urlToDeletePhotoBlog = `${API_URL}/api/blogs/photos/${this.state.blogInfo.photo.photoId}`;
            axios.delete(urlToDeletePhotoBlog, { withCredentials: true }).then((res) => {
                this.setState({
                    messageSuccess: res.data,
                });
            });
        } catch (error) {}
    };
    //On File Change
    onFileChange = (event) => {
        // Update the state
        this.setState({
            selectedFile: event.target.files[0],
            showFileData: true,
        });
    };

    //Upload Photo Blog if null
    onPhotoBlogUpload() {
        try {
            const urlToAddPhotoBlog = `${API_URL}/api/blogs/${this.props.match.params.blogId}/photos`;
            if (this.state.showFileData) {
                const formData = new FormData();
                formData.append('file', this.state.selectedFile);
                axios
                    .post(urlToAddPhotoBlog, formData, {
                        withCredentials: true,
                        headers: {
                            'content-type': 'multipart/form-data',
                        },
                    })
                    .then((res) => {
                        showToastSuccess(res.data.message);
                    })
                    .catch((err) => {
                        showToastFailed(err.response.data.message);
                    });
            }
        } catch (error) {
            showToastSuccess('Có Lỗi xảy ra');
        }
    }

    //Blog Update Handle
    onBlogUpdate() {
        try {
            const urlToUpdateBlog = `${API_URL}/api/blogs/${this.props.match.params.blogId}`;
            axios
                .put(urlToUpdateBlog, this.state.blogInfo, {
                    withCredentials: true,
                })
                .then((res) => {
                    this.setState({
                        messageSuccess: res.data.message,
                        redirect: true,
                    });
                })

                .then(() => {
                    if (this.state.showFileData == false) {
                        showToastSuccess(this.state.messageSuccess);
                    }
                })
                .then(() => this.onPhotoBlogUpload());
        } catch (error) {
            showToastSuccess('Có Lỗi xảy ra');
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.onBlogUpdate();
    }
    //End Blog Update Handle

    render() {
        return (
            <>
                <ToastContainer />
                <Header />
                <Menu />

                <div className='content-wrapper' style={{ minHeight: '700px' }}>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-md-12'>
                                {/* general form elements */}
                                <div className='card card-primary'>
                                    <div className='card-header'>
                                        <h3 className='card-title'>chỉnh sửa bài viết</h3>
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
                                            {this.state.categoriesBlog && (
                                                <div className='col-md-6'>
                                                    {/* select */}
                                                    <div className='form-group'>
                                                        <label>Loại bài viết</label>

                                                        <select
                                                            className='form-control'
                                                            value={this.state.blogInfo.blogCategoryId}
                                                            defaultValue={{
                                                                label: this.state.blogCategoryName,
                                                                value: this.state.blogCategoryId,
                                                            }}
                                                            onChange={this.handleChangeCatesBlog}>
                                                            {this.state.categoriesBlog.map((record) => (
                                                                <option value={record.categoryBlogId}>
                                                                    {record.categoryBlogName}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className='d-flex flex-row bd-highlight mb-3'>
                                            <div className='col-md-6 rounded-top'>
                                                <div className='form-group'>
                                                    <label>Ảnh đại diện</label>
                                                    <i
                                                        class='fas fa-minus-circle'
                                                        data-target='#exampleModal'
                                                        data-toggle='modal'
                                                        onClick={() => this.showModal()}
                                                    />
                                                    {this.state.showModalDeletePhoto && (
                                                        <Modal
                                                            content={
                                                                'Bạn có muốn xóa hình ảnh:' +
                                                                this.state.blogInfo.photo.photoId
                                                            }
                                                            title='Xóa hình ảnh'
                                                            urlImage={this.state.blogInfo.photo.photoUrl}
                                                            submit={() => this.onDeleteImage()}
                                                        />
                                                    )}
                                                    <img src={this.state.blogInfo.photo.photoUrl} />
                                                </div>
                                            </div>
                                            {/* End Load ListCategories */}

                                            {/**Upload Blog Image */}
                                            {this.state.blogInfo.photo.photoUrl === '' && (
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
                                                                                Tên hình ảnh:{' '}
                                                                                {this.state.selectedFile.name}
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
                                            )}
                                            {/**End Upload Blog Image**/}
                                            {this.state.redirect && <Redirect to='/admin/blogs' />}
                                        </div>

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
                </div>
                <Footer />
            </>
        );
    }
}
