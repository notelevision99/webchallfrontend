import banner from '../../../../assets/images/banner/banner-2.jpg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../helpers/user/urlCallAxios.js';
import { useHistory } from 'react-router-dom';

function ListProduct() {
    const history = useHistory();
    const [listProd, setListProd] = useState({});

    useEffect(() => {
        fetchListProd();
    }, []);

    const fetchListProd = () => {
        const urlGetListProd = `${API_URL}/api/products?pageNumber=1&pageSize=10`;
        axios
            .get(urlGetListProd)
            .then((res) => {
                setListProd(res.data);
            })
            .catch((err) => {});
    };

    const productDetail = (urlSeo) => {
        history.push('/san-pham/' + urlSeo);
    };
    return (
        <div className='product-box'>
            <h1 className='category-title'>
                Giống Lúa
                <div className='underlined-category-title'></div>
            </h1>

            <div className='product-grid'>
                {Object.keys(listProd).length !== 0 &&
                    listProd.item1.map((item) => (
                        <div className='product-card' onClick={() => productDetail(item.urlSeo)}>
                            <img src={item.photoUrl} />
                            <div className='info-product'>
                                <h3>{item.productName}</h3>
                             
                            </div>
                        </div>
                    ))}

                <div className='product-card'>
                    <img src={banner} />
                    <div className='info-product'>
                        <h3>Giống lúa Thiên ưu 8</h3>
                    </div>
                </div>
            </div>

            <h1 className='category-title'>
                Giống Ngô
                <div className='underlined-category-title'></div>
            </h1>

            <div className='product-grid'>
                <div className='product-card'>
                    <img src={banner} />
                    <div className='info-product'>
                        <h3>Giống lúa Thiên ưu 8</h3>
                    </div>
                </div>

                <div className='product-card'>
                    <img src={banner} />
                    <div className='info-product'>
                        <h3>Giống lúa Thiên ưu 8</h3>
                    </div>
                </div>

                <div className='product-card'>
                    <img src={banner} />
                    <div className='info-product'>
                        <h3>Giống lúa Thiên ưu 8</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ListProduct;
