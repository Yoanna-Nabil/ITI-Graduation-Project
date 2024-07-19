import React, { useEffect, useState } from "react";
import "./bestseller.css";
import { request } from "../../axios/axios";
import ProductItem from "../ProductItem/ProductItem";
import style from "../Home/Home.module.css";
import ScrollReveal from "scrollreveal";
function Bestseller() {
  const [products, setProducts] = useState([]);
  const [hoverProduct, setHoverProduct] = useState(null);
  useEffect(() => {
    request
      .get("/products/bestSelling")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);
  const handleMouseOver = (productId) => {
    setHoverProduct(productId);
  };

  const handleMouseOut = () => {
    setHoverProduct(null);
  };

  useEffect(() => {
    const scrollRevealOption = {
      distance: "100px",
      origin: "right",
      duration: 1000,
      delay: 500,
    };

    ScrollReveal().reveal(`#bestSell0`, scrollRevealOption);
    ScrollReveal().reveal(`#bestSell1`, {
      ...scrollRevealOption,
      delay: 1000,
    });
    ScrollReveal().reveal(`#bestSell2`, {
      ...scrollRevealOption,
      delay: 1500,
    });
    ScrollReveal().reveal(`#bestSell3`, {
      ...scrollRevealOption,
      delay: 2000,
    });
  }, [products?.length]);
  return (
    <div className={`w-[95%] mx-auto mt-10`}>
      <div className={`${style.shapeContainer}`}>
        <div className={style.Rectangle}></div>
        <h6 className={style.title}>This Month</h6>
      </div>
      <div className={`${style.bestSellingProductsContainer} `}>
        <i className="fa-brands fa-think-peaks text-red-600 fa-2x"></i>
        <h3 className="fw-bold">Best Selling Products</h3>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(0,_250px))] smml:grid-cols-[repeat(auto-fit,_minmax(250px,1fr))] gap-5">
        {products.map((product, index) => (
          <ProductItem
            key={product._id}
            product={product}
            hoverProduct={hoverProduct}
            handleMouseOver={handleMouseOver}
            handleMouseOut={handleMouseOut}
            offer={false}
            id={`bestSell${index}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Bestseller;
