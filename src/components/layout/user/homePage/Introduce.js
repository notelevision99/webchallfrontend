import React, { useEffect } from "react";
import "../../../../styles/components/homePage/Introduce.scss";

import WOW from "wowjs";

function Introduce() {
  useEffect(() => {
    const wow = new WOW.WOW();
    wow.init();
  });

  return (
    <div className="introduce">
      <h1
        className="introduce--title wow slideInRight"
        data-wow-offset="10"
        data-wow-iteration="10"
      >
        Vinaseed là đoan nghiệp độc lập trực thuộc Bộ Nông Nghiệp và Phát Triển
        Nông thôn
      </h1>

      <p className="introduce--text">
        Được thành lập từ năm 1968. Với sự đổi mới quản trị DN, chiến lược lấy
        KHCN làm nền tảng và động lực nâng cao năng lực cạnh tranh, huy động tối
        đa các nguồn lực xã hội cùng tham gia phát triển công ty, sau 15 năm
        CPH, Vinaseed đã trở thành Tập đoàn nông nghiệp có quy mô và thị phần
        lớn nhất Việt Nam.
      </p>
    </div>
  );
}

export default Introduce;
