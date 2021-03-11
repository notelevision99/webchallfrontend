import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

//Images banner
import banner3 from '../../../../assets/images/banner/banner-3.jpg';
import banner2 from '../../../../assets/images/banner/banner-2.jpg';
import banner1 from '../../../../assets/images/banner/banner-1.jpg';
import banner from '../../../../assets/images/banner/banner.jpg';
import { API_URL } from "../../../../helpers/user/urlCallAxios";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from 'react-router';
import { useParams } from "react-router";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

function ProductDetail() {

    const [prodDetail, setProdDetail] = useState({})
    const location = useLocation();
    let {urlSeo} = useParams();
    useEffect(() => {
        fetchProdDetail();
    },[])
    const fetchProdDetail = () => {
         const urlGetProdDetail = `${API_URL}/api/products/${urlSeo}`  

         axios.get(urlGetProdDetail)
         .then(res => {
             setProdDetail(res.data.item1)
            
         })
         .catch(err => {});
    }
    return (
        <>
            <h1 className='category-title'>
                Thông tin sản phẩm
                <div className='underlined-category-title'></div>
            </h1>

           

            <div className='info-box'>
                {/* ===== Slide ===== */}
                <div className='slide-box'>
                    <Swiper
                        spaceBetween={0}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}>
                        <SwiperSlide>
                            <div
                                className='banner'
                                // style={{
                                //   backgroundImage: `url(${banner1})`,
                                //   backgroundPosition: "center",
                                //   backgroundSize: "cover",
                                // }}
                            >
                                <img src={banner3} />
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className='banner'>
                                <img src={banner2} />
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className='banner'>
                                <img src={banner1} />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
                {/* ===x=== Slide ===x=== */}
                {
                    prodDetail !== null && 
                    <div className='info-detail'>
                    <h3>{prodDetail.productName}</h3>
                    <ul>
                        <li>
                            <strong>Loại sản phẩm</strong>:&nbsp;{prodDetail.categoryName}&nbsp;
                        </li>
                        <li>
                            <strong>Thuộc công ty</strong>:&nbsp;{prodDetail.company}
                        </li>
                        <li>
                            <strong>Trọng lượng</strong>:&nbsp;{prodDetail.weight} kg
                        </li>
                        <li>
                            <strong>Đặc&nbsp;điểm:</strong>&nbsp;Chiều cao cây 100-110 cm, phiến lá phẳng đứng, gọn
                            khóm, màu xanh đậm, đẻ nhánh trung bình. Chống đổ khá, chống chịu trung bình với một số loại
                            sâu bệnh hại chính (đạo ôn, khô vằn, bạc lá…), phạm vi thích ứng rộng.
                        </li>
                        <li>
                            <strong>Chất lượng</strong>:&nbsp;Hạt thon, dài, mỏ cong, màu vàng sáng, khối lượng 1000 hạt
                            20-21 gram, hạt gạo trong, cơm trắng, bóng, mềm, vị đậm.
                        </li>
                    </ul>

                    <h3>{prodDetail.price}đ</h3>
                </div>
                }
                
            </div>
        </>
    );
}
export default ProductDetail;
