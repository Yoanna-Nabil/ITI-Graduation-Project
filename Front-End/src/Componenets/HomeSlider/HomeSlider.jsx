import React, { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import banner from "../../Assets/banner-image.png";
import single from "../../Assets/single-image1.png";
import Slider from "react-slick";
import "./HomeSlider.css";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();

  useEffect(() => {
    const scrollRevealOption = {
      distance: "50px",
      origin: "top",
      duration: 1000,
    };
    ScrollReveal().reveal(".maintext h1", { ...scrollRevealOption });
    ScrollReveal().reveal(".maintext h4", {
      ...scrollRevealOption,
      delay: 500,
    });
    ScrollReveal().reveal(".buy", {
      ...scrollRevealOption,
      delay: 1000,
    });
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
  };
  return (
    <div className="header">
      <Slider {...settings} className="sitt">
        <img src={banner} alt="oneheader" />
        <img src={single} alt="twoheader" />
      </Slider>

      <div className="maintext">
        <h1 className="text-4xl md:text-6xl font-bold text-white  pb-2">
          Techno<span className="text-danger">Core</span>
        </h1>
        <h4 className=" md:text-6xl font-bold text-dark  pb-3 pl-2 ">
          {" "}
          Your Products Are Great.
        </h4>
        <button
          onClick={() => navigate("/products")}
          className="btn btn-large btn-dark text-uppercase btn-rounded-none ml-4 buy"
        >
          Shop Product
        </button>
      </div>
    </div>
  );
}
