import React, { useState, useEffect } from "react";

import Slider from "react-slick";

//style
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//images
import Img1 from "../../../../assets/images/tech/tech-1.jpg";
import Img2 from "../../../../assets/images/tech/tech-2.jpg";
import Img3 from "../../../../assets/images/tech/tech-3.jpg";

//icons
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

function Technology() {
  let carousel = [
    {
      id: 0,
      image: Img1,
      title: "công nghệ chọn tạo giống cây trống",
      text:
        "Vinaseed là doanh nghiệp KHCN đầu tiên trong ngành giống cây trồng Việt Nam, tiên phong trong hoạt động nghiên cứu, ứng dụng và chuyển giao công nghệ với các giải pháp đột phá, đi trước và định hướng thị trường. Hệ thống cơ sở hạ tầng phục vụ nghiên cứu hiện đại, đội ngũ chuyên gia hùng hậu, nhân sự trên 1000 lao động với 80% có trình độ đại học và trên đại học hoàn toàn làm chủ công nghệ chọn tạo giống tiên tiến trên thế giới, công nghệ sản xuất hạt lai, công nghệ sản xuất nông nghiệp 4.0.",
    },

    {
      id: 1,
      image: Img2,
      title: "quản trị sản xuất nông nghiệp thông minh 4.0",
      text:
        "Xây dựng phương thức quản trị sản xuất nông nghiệp tiên tiến,  ứng dụng các giải pháp canh tác bền vững tiết kiệm tài nguyên, có truy xuất nguồn gốc, sử dụng các chế phẩm và thuốc BVTV có nguồn gốc sinh học thế hệ mới góp phần giảm hiệu ứng nhà kính, giảm tồn dư hóa chất và hàm lượng Nitorat trong sản phẩm, thực hiện cơ giới hóa trong sản xuất và chế biến.  Hỗ trợ các doanh nghiệp vừa và nhỏ, các HTX, hộ nông dân tham gia chuỗi liên kết sản xuất nông sản của Vinaseed để hình thành các vùng sản xuất nông nghiệp tập trung quy mô lớn, góp phần đem lại thu nhập ổn định cho người nông dân.",
    },

    {
      id: 2,
      image: Img3,
      title: "công nghệ sản xuất hiện đại",
      text:
        "Thực hiện chiến lược đầu tư để mở rộng công ty, đổi mới công nghệ nâng cao năng lực cạnh tranh, Vinaseed đã xây dựng các trung tâm công nghiệp chế biến hạt giống và chế biến nông sản quy mô lớn, hiện đại, đồng bộ và tự động hóa hàng đầu tại Việt Nam, các dòng sản phẩm của nhà máy sản xuất ra đáp ứng các quy trình kiểm định khắt khe theo tiêu chuẩn quốc tế, an toàn với con người và môi trường.",
    },
  ];

  const [slideNum, setSlideNum] = useState();
  const [slideTitle, setSlideTitle] = useState();
  const [slideText, setSlideText] = useState();

  const handleSlide = (clicked) => {
    clicked.onClick();
    setSlideNum(clicked.currentSlide);
    handleText(clicked.currentSlide);
  };

  const handleText = (id) => {
    carousel.map(function (num, i) {
      if (id === num.id) {
        setSlideText(num.text);
        setSlideTitle(num.title);
      }
    });
  };

  const handlePaging = (pageNum) => {
    pageNum.map(function (num, i) {
      if (num.props.className === "slick-active") {
        setSlideNum(i);
        handleText(i);
      }
    });
  };

  function Arrow(props) {
    let className = props.type === "next" ? "nextArrow" : "prevArrow";
    className += " arrow";
    const char =
      props.type === "next" ? <NavigateNextIcon /> : <NavigateBeforeIcon />;
    return (
      <span className={className} onClick={() => handleSlide(props)}>
        {char}
      </span>
    );
  }

  function customPaging(i) {
    return <span className="test">0{i + 1}</span>;
  }

  function appendDots(dots) {
    return (
      <div className="tech-paging" onClick={handlePaging(dots)}>
        <ul className="tech-paging__numb"> {dots} </ul>
      </div>
    );
  }

  const renderSlides = () =>
    carousel.map((num) => (
      <div className="cus-slide">
        <div className="cus-slide__img">
          <img src={num.image} alt="" />
        </div>
      </div>
    ));

  const renderText = () => (
    <div>
      <h4 className="technology__text--title-small">{slideTitle}</h4>

      <p className="technology__text--description">{slideText}</p>
    </div>
  );

  return (
    <div className="technology">
      <div className="technology__img">
        <Slider
          nextArrow={<Arrow type="next" />}
          prevArrow={<Arrow type="prev" />}
          dots={true}
          customPaging={customPaging}
          appendDots={appendDots}
        >
          {renderSlides()}
        </Slider>
      </div>

      <div className="technology__text">
        <h2 className="technology__text--title-main">công nghệ nổi bật</h2>
        {renderText()}
      </div>
    </div>
  );
}

export default Technology;
