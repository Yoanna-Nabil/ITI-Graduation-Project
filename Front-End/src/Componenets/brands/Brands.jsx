import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import imgSrc1 from "../../../src/Assets/Lenovo-Logo-PNG-Picture (1).png";
import imgSrc2 from "../../../src/Assets/600da9af516067000439ac9f.png";
import imgSrc3 from "../../../src/Assets/0f7d50fc9ab9c884c563a55c98a77e35.png";
import imgSrc4 from "../../../src/Assets/photo_2024-06-26_13-41-14.png";
import "./Brands.css";


function Brands() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          speed: 3000,
        },
      },
    ],
  };

  return (
    <div className="allslick">
      <div className="title">
        <h3 className="font-bold text-red-500">Brands</h3>
        <p className="text-red-400">Brands of the products on our website</p>
      </div>

      <Slider {...settings}>
        <img src={imgSrc1} alt="Icon" />
        <img src={imgSrc2} alt="Icon" />
        <img src={imgSrc3} alt="Icon" />
        <img src={imgSrc4} alt="Icon" />
      </Slider>
    </div>
  );
}

export default Brands;
