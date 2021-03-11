import React, { Component } from 'react';

import ListCategories from './components/atom/admin/categories/ListCategories';
import EditCategories from './components/atom/admin/categories/EditCategories';
import Login from './components/atom/admin/auth/Login';
import ListAdmins from './components/atom/admin/users/ListAdmins';
import CreateAdmin from './components/atom/admin/users/CreateAdmin';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Product from './components/atom/admin/products/Product';
import { Switch } from 'react-router-dom';
import Home from './components/atom/admin/home/Home';
import CreateProduct from './components/atom/admin/products/CreateProduct';
import EditProduct from './components/atom/admin/products/EditProduct';
import ProtectedRoute from './helpers/admin/checkRolesAuth';
import EditCurrentAdmin from './components/atom/admin/users/EditCurrentAdmin';
import Banners from './components/atom/admin/banners/Banners';
import CreateBanner from './components/atom/admin/banners/CreateBanner';
import Orders from './components/atom/admin/orders/Orders';
import OrderDetails from './components/atom/admin/orders/OrderDetails';
import CreateBlog from './components/atom/admin/blogs/CreateBlog';
import Blog from './components/atom/admin/blogs/Blog';
import EditBlog from './components/atom/admin/blogs/EditBlog';
import CreateCategories from './components/atom/admin/categories/CreateCategories';
import CategoriesBlog from './components/atom/admin/categoriesBlog/CategoriesBlog';
import CreateCategoriesBlog from './components/atom/admin/categoriesBlog/CreateCategoriesBlog';
import EditCategoriesBlog from './components/atom/admin/categoriesBlog/EditCategoriesBlog';

// Client
import './styles/App.scss';
import HomePage from './pages/HomePage';
import Header from './components/atom/user/header/Header';
import Footer from './components/atom/user/footer/Footer';
import ProductPage from './pages/ProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUpPage';
import AboutPage from './pages/AboutPage';

export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    {/* ----------- Client ----------- */}

                    <Route exact path='/'>
                        <Header />
                        <HomePage />
                        <Footer />
                    </Route>

                    <Route exact path='/dang-ki'>
                        <SignUp />
                        <Footer />
                    </Route>

                    <Route exact path='/dang-nhap'>
                        <LoginPage />
                        <Footer />
                    </Route>

                    <Route exact path='/gioi-thieu'>
                        <Header />
                        <AboutPage />
                        <Footer />
                    </Route>

                    <Route exact path='/san-pham'>
                        <Header />
                        <ProductPage />
                        <Footer />
                    </Route>

                    <Route path='/san-pham/:urlSeo'>
                        <Header />
                        <ProductDetailPage />
                        <Footer />
                    </Route>

                    {/* -----x----- Client -----x----- */}

                    {/* ----------- Admin ----------- */}

                    <Route path='/admin/login' component={Login} />

                    <ProtectedRoute exact path='/admin/products' component={Product} />
                    <ProtectedRoute exact path='/admin/home' component={Home} />

                    <ProtectedRoute path='/admin/products/create' component={CreateProduct} />

                    <ProtectedRoute path='/admin/editproduct/:id' component={EditProduct} />

                    <ProtectedRoute exact path='/admin/categories' component={ListCategories} />
                    <ProtectedRoute path='/admin/categories/create' component={CreateCategories} />
                    <ProtectedRoute path='/admin/editcategory/:categoryId' component={EditCategories} />

                    <ProtectedRoute exact path='/admin/users' component={ListAdmins} />
                    <ProtectedRoute path='/admin/listadmins/create' component={CreateAdmin} />
                    <ProtectedRoute path='/admin/editusers/:id' component={EditCurrentAdmin} />

                    <ProtectedRoute exact path='/admin/banners' component={Banners} />
                    <ProtectedRoute path='/admin/banners/create' component={CreateBanner} />

                    <ProtectedRoute exact path='/admin/orders' component={Orders} />
                    <ProtectedRoute path='/admin/orders/:orderId' component={OrderDetails} />

                    <ProtectedRoute exact path='/admin/blogs' component={Blog} />
                    <ProtectedRoute path='/admin/blogs/create' component={CreateBlog} />
                    <ProtectedRoute path='/admin/blogs/edit/:blogId' component={EditBlog} />

                    <ProtectedRoute exact path='/admin/categoriesblog' component={CategoriesBlog} />
                    <ProtectedRoute path='/admin/categoriesblog/create' component={CreateCategoriesBlog} />
                    <ProtectedRoute
                        path='/admin/categoriesblog/edit/:categoriesBlogId'
                        component={EditCategoriesBlog}
                    />

                    {/* -----x----- Admin -----x----- */}
                </Switch>
            </Router>
        );
    }
}
