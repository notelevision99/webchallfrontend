import axios from "axios";
import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../../layout/admin/Footer";
import Header from "../../../layout/admin/Header";
import Menu from "../../../layout/admin/Menu";
import {
    showToastFailed,
    showToastSuccess,
} from "../../../../helpers/admin/toastNotify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CloudinaryUnsigned } from "puff-puff/CKEditor";
import { API_URL } from "../../../../helpers/admin/urlCallAxios";

export default class CreateProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /**State Product Info */
            productName: "",
            price: 0,
            categories: null,
            selectedFile: [],
            idProduct: 0,
            categoryId: 0,
            description: "",
            productDetails: "",
            /**End State Product Info */
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

    componentDidMount() {
        /**
         * Get ListCategories
         */
        const url = `${API_URL}/api/categories`;
        axios
            .get(url, { withCredentials: true })
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
        this.imagePluginFactory(editor);
        this.setState({ description: editor.getData() });
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
    /***************END onChange Description */

    /**
     * onChange ProductDetails
     */
    handleProductDetailsChange = (event, editor) => {
        this.imagePluginFactory(editor);
        this.setState({ productDetails: editor.getData() });
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
    /***************END onChange ProductDetails */

    /**
     * onChange File(Image)
     */
    onFileChange = (event) => {
        // Update the state
        this.setState({ selectedFile: event.target.files });
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

        const url = `${API_URL}/api/products`;
        axios
            .post(url, product, {
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
                return axios
                    .post(
                        `${API_URL}/api/products/${this.state.idProduct}/photos`,
                        formData,
                        {
                            withCredentials: true,
                            headers: {
                                "content-type": "multipart/form-data",
                            },
                        }
                    )
                    .then(() => {
                        showToastSuccess("Th??m th??nh c??ng");
                    });
            })
            .catch((error) => {
                console.log(error.message);
                showToastFailed("Th??m th???t b???i!!!");
            });
    };

    /**GET FILE DATA */
    fileData = () => {
        if (this.state.selectedFile) {
            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>
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

    /**HandleChange ListCategories */
    handleChangeListCategories(e) {
        try {
            this.setState({
                categoryId: e.target.value,
            });
        } catch (error) {}
    }

    /**NOTIFY SUCCESS*/

    render() {
        return (
            <>
                <Header />
                <Menu />
                <div className="content-wrapper" style={{ minHeight: "700px" }}>
                    {/* Content Header (Page header) */}
                    <section classNayme="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1>Th??m s???n ph???m</h1>
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
                                                Bi???u m???u th??m s???n ph???m
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
                                                                        .desription
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
                                                                        .productDetails
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handleProductDetailsChange
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* Load ListCategories */}
                                                    {this.state.categories ? (
                                                        <div className="col-sm-6">
                                                            {/* select */}
                                                            <div className="form-group">
                                                                <label>
                                                                    Lo???i s???n
                                                                    ph???m
                                                                </label>
                                                                <select
                                                                    className="form-control"
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
                                                    ) : null}
                                                    {/* End Load ListCategories */}
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
                                                                Ch???n h??nh ???nh
                                                                <input
                                                                    type="file"
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
                                                    </div>
                                                    <div>
                                                        {
                                                            <div className="List_nameImage">
                                                                {Object.keys(
                                                                    this.state
                                                                        .selectedFile
                                                                ).map(
                                                                    (item) => {
                                                                        return (
                                                                            <div>
                                                                                <h2>
                                                                                    Chi
                                                                                    ti???t
                                                                                    h??nh
                                                                                    ???nh
                                                                                    ????ng
                                                                                    t???i
                                                                                </h2>
                                                                                <p>
                                                                                    T??n
                                                                                    h??nh
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
                                                                    }
                                                                )}
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                                {this.state.redirect && (
                                                    <Redirect to="/products" />
                                                )}
                                                <button className="btn btn-success">
                                                    X??c nh???n
                                                </button>

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
                <Footer />
                <ToastContainer />
            </>
        );
    }
}
