import React, { useState } from "react";
import "./products.css";
import { request } from "../../axios/axios";
import ProductItem from "../ProductItem/ProductItem";
import { useQuery } from "react-query";
import style from '../Home/Home.module.css'
function Products() {
  const [hoverProduct, setHoverProduct] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  function getProductPagination() {
    return request.get(`/products/pagination/${currentPage}/8`);
  }
  const { data } = useQuery(
    ["getProductPagination", currentPage],
    () => getProductPagination(currentPage),
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

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  return (
    <div className="mx-auto w-[95%] my-5">
      <div className={`${style.bestSellingProductsContainer} mt-20`}>
        <i class="fa-solid fa-cart-arrow-down text-red-600 fa-2x"></i>
        <h3 className="fw-bold"> Products</h3>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(0,_250px))] smml:grid-cols-[repeat(auto-fit,_minmax(250px,1fr))] gap-5">
        {data &&
          data?.data?.data?.map((product) => (
            <ProductItem
              key={product._id}
              product={product}
              hoverProduct={hoverProduct}
              handleMouseOver={handleMouseOver}
              handleMouseOut={handleMouseOut}
              offer={false}
            />
          ))}
      </div>
      <div className="d-flex justify-content-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="btn btn-danger"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={!data?.data?.hasNextPage}
          className="btn btn-danger"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;
