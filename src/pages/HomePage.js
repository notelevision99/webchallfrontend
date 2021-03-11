import React from "react";
import BusinessAreas from "../components/layout/user/homePage/BusinessAreas";
import BusinessProduct from "../components/layout/user/homePage/BusinessProduct";
import HomeNews from "../components/layout/user/homePage/HomeNews";
import Introduce from "../components/layout/user/homePage/Introduce";

//Components
import Overview from "../components/layout/user/homePage/Overview";
import Slide from "../components/layout/user/homePage/Slide";
import Technology from "../components/layout/user/homePage/Technology";

function HomePage() {
  return (
    <>
      <Slide />
      <Overview />
      <Introduce />
      <Technology />
      <HomeNews />
      <BusinessProduct />
      <BusinessAreas />
    </>
  );
}

export default HomePage;
