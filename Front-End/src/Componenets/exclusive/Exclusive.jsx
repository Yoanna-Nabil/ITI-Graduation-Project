import React, { useState } from "react";
import { request } from "../../axios/axios";
import ProductItem from "../ProductItem/ProductItem";
import { useQuery } from "react-query";

function Exclusive() {
  const [hoverProduct, setHoverProduct] = useState(null);

  // Function to fetch all products
  const [currentPage, setCurrentPage] = useState(1);
  function getAllProductsExclusive() {
    return request.get(`/products/pagination/exclusive/${currentPage}/8`);
  }
  const { data } = useQuery(
    ["getAllProductsExclusive", currentPage],
    () => getAllProductsExclusive(currentPage),
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
    <div className="w-[95%] mx-auto mb-5">
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(0,_250px))] smml:grid-cols-[repeat(auto-fit,_minmax(250px,1fr))]">
        {data?.data?.data?.length > 0 ? (
          data?.data?.data?.map((product) => (
            <ProductItem
              key={product._id}
              product={product}
              hoverProduct={hoverProduct}
              handleMouseOver={handleMouseOver}
              handleMouseOut={handleMouseOut}
              isExclusive={true}
            />
          ))
        ) : (
          <h1 className="text-center w-full">No exclusive products here</h1>
        )}
      </div>
      <div className="d-flex justify-content-between mt-4">
        <button
          onClick={handlePreviousPage}
          className="btn btn-danger "
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="btn btn-danger "
          disabled={!data?.data?.hasNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Exclusive;
