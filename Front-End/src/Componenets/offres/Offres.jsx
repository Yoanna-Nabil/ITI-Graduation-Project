import React, { useEffect, useState } from "react";
import { request } from "../../axios/axios";
import ProductItem from "../ProductItem/ProductItem";
import { useQuery } from "react-query";
import style from "../Home/Home.module.css";
import "tailwindcss/tailwind.css";
import ScrollReveal from "scrollreveal";
function Offres() {
  const [hoverProduct, setHoverProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  function getAllProductsOffers() {
    return request.get(`/products/pagination/sales/${currentPage}/8`);
  }
  const { data } = useQuery(
    ["getAllProductsOffers", currentPage],
    () => getAllProductsOffers(currentPage),
    {
      keepPreviousData: true,
    }
  );
  const handleMouseOver = (productId) => {
    setHoverProduct(productId);
  };

  const handleMouseOut = () => {
    setHoverProduct(null);
  };
  useEffect(() => {
    const scrollRevealOption = {
      distance: "50px",
      origin: "left",
      duration: 1000,
    };
    for (let i = 0; i < data?.data?.data?.length; i++) {
      ScrollReveal().reveal(`#offer${i}`, {
        ...scrollRevealOption,
        delay: 300 * i + 1,
      });
    }
  }, [data?.data?.data?.length]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className={`w-[95%] mx-auto mt-32 mb-8`}>
      <div className={`${style.bestSellingProductsContainer} mt-20`}>
        <i className="fa-solid fa-square-caret-right text-red-600 fa-2x"></i>
        <h3 className="fw-bold mb-20"> Our Offres Products </h3>
      </div>

      <div
        className={`grid grid-cols-[repeat(auto-fit,_minmax(0,_250px))] smml:grid-cols-[repeat(auto-fit,_minmax(250px,1fr))] gap-10`}
      >
        {data?.data?.data?.length > 0 ? (
          data?.data?.data?.map((product, index) => (
            <ProductItem
              product={product}
              key={product._id}
              hoverProduct={hoverProduct}
              handleMouseOver={handleMouseOver}
              handleMouseOut={handleMouseOut}
              isExclusive={true}
              offer={true}
              id={`offer${index}`}
            />
          ))
        ) : (
          <h1 className="text-center w-full">No offers products here</h1>
        )}
      </div>
      <div className="d-flex justify-content-between mt-4 mb-20">
        <button
          onClick={handlePreviousPage}
          className="btn btn-danger"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="btn btn-danger"
          disabled={!data?.data?.hasNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Offres;
