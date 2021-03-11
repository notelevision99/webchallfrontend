import React from 'react';

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

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

function Slide() {
    return (
        <div>
            <div className='after-header'></div>
            {/* <img src={banner3} /> */}

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
    );
}

export default Slide;
