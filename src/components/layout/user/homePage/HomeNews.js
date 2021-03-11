import React from "react";

//img
import HomeNewsBG from "../../../../assets/images/bg/news.jpg";

//icons
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

function HomeNews() {
  const newsArr = [
    {
      title:
        "Lễ khánh thành trung tâm công nghiệp chế biến hạt giống và nông sản hiện đại bậc nhất Việt Nam",
      date: "10/10/2020",
    },

    {
      title:
        "Lễ khánh thành trung tâm công nghiệp chế biến hạt giống và nông sản hiện đại bậc nhất Việt Nam",
      date: "10/10/2020",
    },

    {
      title:
        "Lễ khánh thành trung tâm công nghiệp chế biến hạt giống và nông sản hiện đại bậc nhất Việt Nam",
      date: "10/10/2020",
    },
  ];

  const renderNews = () =>
    newsArr.map((num) => (
      <div className="hn-item">
        <h5 className="hn-item--title">{num.title}</h5>
        <small className="hn-item--date">{num.date}</small>
      </div>
    ));

  return (
    <div className="homenews">
      <div className="homenews__lasted">
        <h3 className="homenews__lasted--title">Tin tức nông nghiệp</h3>
        <p className="homenews__lasted--title-s">tin mới cập nhật</p>

        {renderNews()}

        <p className="homenews__lasted--viewmore">
          Xem tất cả tin tức <ArrowRightAltIcon />
        </p>
      </div>

      <div className="homenews__img">
        <img src={HomeNewsBG} alt="" />
      </div>
    </div>
  );
}

export default HomeNews;
