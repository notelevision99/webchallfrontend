import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Header from "../../../layout/admin/Header";
import Menu from "../../../layout/admin/Menu";
import { API_URL } from "../../../../helpers/admin/urlCallAxios";
import Modal from "../../../helperComponent/modal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToastSuccess } from "../../../../helpers/admin/toastNotify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CloudinaryUnsigned } from "puff-puff/CKEditor";

export default class EditProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: "",
            categories: null,
            categoryName: "",
            categoryId: 0,
            price: "",
            description: "",
            productDetails: "",

            /**State onChange Image Input */
            selectedFile: [],
            /**End */

            photos: [],
            /*Modal DeleteImage State */
            idImageToDel: 0,
            showModal: false,
            urlImageToDelete: "",
            /**End Modal DeleteImage State */
            redirect: false,
        };
        this.handleProdNameChange = this.handleProdNameChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeListCategories = this.handleChangeListCategories.bind(
            this
        );
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleProductDetailsChange = this.handleProductDetailsChange.bind(
            this
        );
        this.fileInput = React.createRef();
    }

    /**
     * GET PRODUCT BY ID
     */

    componentDidMount() {
        const urlGetListProduct = `${API_URL}/api/products/${this.props.match.params.id}`;
        const urlGetListCategories = `${API_URL}/api/categories/`;
        axios
            .get(urlGetListProduct, { withCredentials: true })
            .then((res) => res.data)
            .then((data) => {
                this.setState({
                    productName: data.productName,
                    categoryId: data.categoryId,
                    categoryName: data.categoryName,
                    price: data.price,
                    description: data.description,
                    productDetails: data.productDetails,
                    photos: data.photos,
                });
                console.log(data);
            });
        return axios
            .get(urlGetListCategories, { withCredentials: true })
            .then((res) => res.data)
            .then((data) => {
                this.setState({ categories: data });
            });
    }

    /**
     * onChange ProdName
     */
    handleProdNameChange(e) {
        this.setState({
            productName: e.target.value,
        });
    }

    /**
     * onChange Price
     */
    handlePriceChange(e) {
        this.setState({
            price: e.target.value,
        });
    }

    /**
     * onChange Description
     */
    handleDescriptionChange = (event, editor) => {
        const data = editor.getData();
        this.imagePluginFactory(editor);
        this.setState({ description: data });
    };
    imagePluginFactory(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return new CloudinaryUnsigned(loader, "dvezhpk57", "lmgwffy6", [
                160,
                500,
                1000,
                1052,
            ]);
        };
    }

    /********************* END onChange Description */

    /**
     * onChange Description
     */
    handleProductDetailsChange = (event, editor) => {
        const data = editor.getData();
        this.imagePluginFactory(editor);
        this.setState({ productDetails: data });
    };
    imagePluginFactory(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return new CloudinaryUnsigned(loader, "dvezhpk57", "lmgwffy6", [
                160,
                500,
                1000,
                1052,
            ]);
        };
    }

    /********************* END onChange Description */

    /**
     * onChange File(Image)
     */
    onFileChange = (event) => {
        event.preventDefault();
        // this.setState(prevState => ({
        //     selectedFile: [...prevState.selectedFile, event.target.files]
        // }))
        // Update the state
        this.setState({ selectedFile: event.target.files });
        console.log("Slected Image:", event.target.files);
    };

    /**
     * Upload File
     */

    /**
     * UPLOAD PRODUCT
     */
    onProductUpload = () => {
        const product = JSON.stringify({
            productName: this.state.productName,
            price: parseInt(this.state.price),
            categoryId: parseInt(this.state.categoryId),
            description: this.state.description,
            productDetails: this.state.productDetails,
            photoUrl: "asd",
        });
        const formData = new FormData();
        for (const file of this.state.selectedFile) {
            formData.append("file", file);
        }

        const url = `${API_URL}/api/products/${this.props.match.params.id}`;

        axios
            .put(url, product, {
                withCredentials: true,
                headers: {
                    "content-type": "application/json",
                },
            })
            .then((res) => {
                //Assign IdProduct to create photo
                this.setState({
                    idProduct: res.data.id,
                    redirect: true,
                });

                if (this.state.selectedFile) {
                    return axios
                        .post(
                            `${API_URL}/api/products/${this.props.match.params.id}/photos`,
                            formData,
                            {
                                withCredentials: true,
                                headers: {
                                    "content-type": "multipart/form-data",
                                },
                            }
                        )
                        .then(() =>
                            showToastSuccess("C???p nh???t s???n ph???m th??nh c??ng")
                        );
                }
            })
            .catch((error) => {
                console.log(error.message);
            });
    };
    /**GET FILE DATA */

    /**
     * Handle Delete Image
     */
    onDeleteImage = () => {
        console.log(this.props.match.params.id);
        console.log(this.state.idImageToDel);
        const urlToDeleteImage = `${API_URL}/api/products/${this.props.match.params.id}/photos/${this.state.idImageToDel}`;
        console.log(urlToDeleteImage);
        axios.delete(urlToDeleteImage, { withCredentials: true }).then(() => {
            window.location.reload();
            showToastSuccess("X??a h??nh ???nh th??nh c??ng");
        });
    };

    showModal = (urlImage, id) => {
        this.setState({
            showModal: true,
            idImageToDel: id,
            urlToDeleteImage: urlImage,
        });
    };

    /**
     *
     * Handle List Categories
     */
    handleChangeListCategories(event) {
        this.setState({
            categoryId: event.target.value,
        });
    }

    /**
     * SUBMIT FORM
     */
    handleSubmit(e) {
        try {
            e.preventDefault();

            /***UPLOAD PRODUCT */
            this.onProductUpload();
        } catch (err) {}
    }

    render() {
        return (
            <>
                <Header />
                <Menu />
                <div className="content-wrapper" style={{ minHeight: "700px" }}>
                    {/* Content Header (Page header) */}
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>S???a s???n ph???m</h1>
                                </div>
                            </div>
                        </div>
                        {/* /.container-fluid */}
                    </section>
                    {/* Main content */}
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                {/* right column */}
                                <div className="col-md-12">
                                    {/* general form elements disabled */}
                                    <div className="card card-warning">
                                        <div className="card-header">
                                            <h3 className="card-title">
                                                Bi???u m???u s???a s???n ph???m
                                            </h3>
                                        </div>
                                        {/* /.card-header */}
                                        <div className="card-body">
                                            <form
                                                role="form"
                                                onSubmit={this.handleSubmit}>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        {/* text input */}
                                                        <div className="form-group">
                                                            <label>
                                                                T??n s???n ph???m
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={
                                                                    this.state
                                                                        .productName
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handleProdNameChange
                                                                }
                                                                className="form-control"
                                                                placeholder="Enter ..."
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Gi??</label>
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                value={
                                                                    this.state
                                                                        .price
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handlePriceChange
                                                                }
                                                                className="form-control"
                                                                placeholder="Enter ..."
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        {/* textarea */}
                                                        <div className="form-group">
                                                            <label>
                                                                M?? t??? s???n ph???m
                                                            </label>
                                                            <CKEditor
                                                                editor={
                                                                    ClassicEditor
                                                                }
                                                                data={
                                                                    this.state
                                                                        .description !=
                                                                        null &&
                                                                    this.state
                                                                        .description
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handleDescriptionChange
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        {/* textarea */}
                                                        <div className="form-group">
                                                            <label>
                                                                Chi ti???t s???n
                                                                ph???m
                                                            </label>
                                                            <CKEditor
                                                                editor={
                                                                    ClassicEditor
                                                                }
                                                                data={
                                                                    this.state
                                                                        .productDetails !=
                                                                        null &&
                                                                    this.state
                                                                        .productDetails
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handleProductDetailsChange
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    {this.state.categories && (
                                                        <div className="col-sm-6">
                                                            {/* select */}
                                                            <div className="form-group">
                                                                <label>
                                                                    Lo???i s???n
                                                                    ph???m
                                                                </label>

                                                                <select
                                                                    className="form-control"
                                                                    value={
                                                                        this
                                                                            .state
                                                                            .categoryId
                                                                    }
                                                                    defaultValue={{
                                                                        label: this
                                                                            .state
                                                                            .categoryName,
                                                                        value: this
                                                                            .state
                                                                            .categoryId,
                                                                    }}
                                                                    onChange={
                                                                        this
                                                                            .handleChangeListCategories
                                                                    }>
                                                                    {this.state.categories.map(
                                                                        (
                                                                            record
                                                                        ) => (
                                                                            <option
                                                                                value={
                                                                                    record.categoryId
                                                                                }>
                                                                                {
                                                                                    record.categoryName
                                                                                }
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputFile">
                                                        H??nh ???nh
                                                    </label>
                                                    <div className="input-group">
                                                        <div className="custom-file">
                                                            <label
                                                                className="custom-file-label"
                                                                htmlFor="exampleInputFile">
                                                                Choose file
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={
                                                                        this
                                                                            .onFileChange
                                                                    }
                                                                    className="custom-file-input"
                                                                    id="exampleInputFile"
                                                                    multiple
                                                                />
                                                            </label>
                                                        </div>
                                                        {/* Ki???m tra s???n ph???m c?? h??nh th?? render n???u kh??ng th?? kh??ng x??t */}
                                                    </div>
                                                    {this.state.photos !=
                                                        null && (
                                                        <div className="row">
                                                            {this.state.photos.map(
                                                                (
                                                                    record,
                                                                    index
                                                                ) => (
                                                                    <div
                                                                        className="col-3"
                                                                        className="rounded-top">
                                                                        <i
                                                                            onClick={() =>
                                                                                this.showModal(
                                                                                    record.url,
                                                                                    record.id
                                                                                )
                                                                            }
                                                                            class="fas fa-minus-circle"
                                                                            data-target="#exampleModal"
                                                                            data-toggle="modal"
                                                                        />
                                                                        <img
                                                                            src={
                                                                                record.url
                                                                            }
                                                                            width="200px"
                                                                            height="200px"
                                                                        />
                                                                        {this
                                                                            .state
                                                                            .showModal && (
                                                                            <Modal
                                                                                content={
                                                                                    "B???n c?? mu???n x??a h??nh ???nh:" +
                                                                                    " " +
                                                                                    this
                                                                                        .state
                                                                                        .idImageToDel
                                                                                }
                                                                                title="X??a h??nh ???nh"
                                                                                urlImage={
                                                                                    this
                                                                                        .state
                                                                                        .urlToDeleteImage
                                                                                }
                                                                                submit={() =>
                                                                                    this.onDeleteImage()
                                                                                }
                                                                            />
                                                                        )}
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    )}
                                                    {/* ...End */}
                                                    <div className="List_nameImage">
                                                        {Object.keys(
                                                            this.state
                                                                .selectedFile
                                                        ).map((item) => {
                                                            console.log(
                                                                "this.state.selectedFile[item].name:",
                                                                this.state
                                                                    .selectedFile[
                                                                    item
                                                                ].name
                                                            );
                                                            return (
                                                                <div>
                                                                    <h2>
                                                                        Chi ti???t
                                                                        h??nh ???nh
                                                                        ????ng t???i
                                                                    </h2>
                                                                    <p>
                                                                        T??n h??nh
                                                                        ???nh:{" "}
                                                                        {
                                                                            this
                                                                                .state
                                                                                .selectedFile[
                                                                                item
                                                                            ]
                                                                                .name
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        Lo???i
                                                                        h??nh
                                                                        ???nh:{" "}
                                                                        {
                                                                            this
                                                                                .state
                                                                                .selectedFile[
                                                                                item
                                                                            ]
                                                                                .type
                                                                        }
                                                                    </p>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                                {this.state.redirect && (
                                                    <Redirect to="/admin/products" />
                                                )}

                                                <button className="btn btn-success">
                                                    X??c nh???n
                                                </button>
                                                <div className="col-md-6"></div>

                                                {/* input states */}
                                            </form>
                                        </div>
                                        {/* /.card-body */}
                                    </div>
                                    {/* /.card */}
                                </div>
                                {/*/.col (right) */}
                            </div>
                            {/* /.row */}
                        </div>
                        {/* /.container-fluid */}
                    </section>
                    {/* /.content */}
                </div>
                <ToastContainer />
            </>
        );
    }
}
