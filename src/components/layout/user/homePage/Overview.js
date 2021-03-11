import React from "react";

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

//Images
import VisionImage from "../../../../assets/images/vision/vision.png";
import MissionImage from "../../../../assets/images/vision/mission.png";
import ValueImage from "../../../../assets/images/vision/value.png";
import TestImage from "../../../../assets/images/vision/communication.png";

function Overview() {
  return (
    <div className="overview">
      <div className="overview__wrap">
        <div className="vision">
          <div className="vision__box">
            <div className="vision__box--content">
              <div className="v-icon">
                <img src={VisionImage} />
              </div>

              <h3 className="v-title">Tầm nhìn</h3>

              <p className="v-des">
                Vinaseed phấn đấu trở thành Tập đoàn cung cấp các giải pháp phát
                triển nông nghiệp bền vững hàng đầu Việt Nam, thực hiện giấc mơ
                cải thiện thu nhập và điều kiện sống của nông dân Việt Nam.
              </p>
            </div>
          </div>

          <div className="vision__box">
            <div className="vision__box--content">
              <div className="v-icon">
                <img src={MissionImage} />
              </div>

              <h3 className="v-title">Sứ mệnh</h3>

              <p className="v-des">
                Bằng tất cả tình cảm và trách nhiệm của mình với cuộc sống con
                người và xã hội, Vinaseed cam kết mang đến các giải pháp phát
                triển nông nghiệp bền vững, nhằm thực hiện giấc mơ cải thiện thu
                nhập và điều kiện sống của nông dân Việt Nam.
              </p>
            </div>
          </div>

          <div className="vision__box">
            <div className="vision__box--content">
              <div className="v-icon">
                <img src={ValueImage} />
              </div>

              <h3 className="v-title">Giá trị cốt lõi</h3>

              <p className="v-des">Năng động – Sáng tạo – Chuyên nghiệp</p>
            </div>
          </div>
        </div>

        {/* <div className="business-products">
          <div className="business-products__box">
            <h3 className="bp--title">Sản phẩm kinh doanh</h3>

            <div className="bp--carousel">
              <Swiper
                slidesPerView={4}
                navigation
                // pagination={{ clickable: true }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
              >
                <SwiperSlide>
                  <div className="bp--carousel__box">
                    <div className="bp-c--img">
                      <img src={ValueImage} />
                    </div>

                    <h4 className="bp-c--name">Hạt giống</h4>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="bp--carousel__box">
                    <div className="bp-c--img">
                      <img src={ValueImage} />
                    </div>

                    <h4 className="bp-c--name">Hạt giống</h4>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="bp--carousel__box">
                    <div className="bp-c--img">
                      <img src={ValueImage} />
                    </div>

                    <h4 className="bp-c--name">Hạt giống</h4>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="bp--carousel__box">
                    <div className="bp-c--img">
                      <img src={ValueImage} />
                    </div>

                    <h4 className="bp-c--name">Hạt giống</h4>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="bp--carousel__box">
                    <div className="bp-c--img">
                      <img src={ValueImage} />
                    </div>

                    <h4 className="bp-c--name">Hạt giống</h4>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Overview;
