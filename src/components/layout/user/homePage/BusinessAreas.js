import React from "react";

//image
import ChuctetBG from "../../../../assets/images/business-areas/chuctet.png";
import KhanhThanhBG from "../../../../assets/images/business-areas/khanhthanh.jpg";
import XuatKhauGaoBG from "../../../../assets/images/business-areas/xuatkhaugao.jpg";
import MainBG from "../../../../assets/images/business-areas/logo-bg.jpg";

function BusinessAreas() {
  return (
    <div id="projects">
      <h2 className="business-product__title">
        <span>Lĩnh vực kinh doanh</span>
      </h2>

      <div className="project-grid">
        <div className="project coll-2">
          <h3>Advertise here</h3>
        </div>

        <div className="project coll-2 row-2">
          <div
            className="image"
            style={{ backgroundImage: `url(${KhanhThanhBG})` }}
          ></div>

          <h3 className="isProject">
            <a href="#">Khánh thành nhà máy</a>
          </h3>
        </div>

        <div className="project">
          <div
            className="image"
            style={{ backgroundImage: `url(${ChuctetBG})` }}
          ></div>

          <h3 className="isProject">
            <a href="#">Thư chúc tết</a>
          </h3>
        </div>

        <div className="project row-2">
          <h3>Advertise here</h3>
        </div>

        <div className="project">
          <div
            className="image"
            style={{ backgroundImage: `url(${XuatKhauGaoBG})` }}
          ></div>

          <h3 className="isProject">
            <a href="#">Xuất khẩu</a>
          </h3>
        </div>

        <div className="project">
          <div
            className="image"
            style={{ backgroundImage: `url(${MainBG})` }}
          ></div>

          <h3 className="isProject">
            <a href="#">Đại hội cổ đông</a>
          </h3>
        </div>

        <div className="project">
          <h3>Advertise here</h3>
        </div>
      </div>
    </div>
  );
}

export default BusinessAreas;
