import React, { useEffect, useState } from "react";
import HeaderCategory from "../HeaderCategory/HeaderCategory";
import { useLocation, useParams } from "react-router-dom";
import { request } from "../../axios/axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import Sidebar from "../Sidebar/Sidebar";
import { useSearch } from "../context/SearchContext";
import ProductItem from "../ProductItem/ProductItem";
import notFound from '../../Assets/product-not-found.webp'
export default function CategoryUser() {
  const { priceFilter, RateFilter } = useSearch();
      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  const { id } = useParams();
  const { state } = useLocation();
  const [hoverProduct, setHoverProduct] = useState(null);

  const favoriteProducts = useSelector(
    (state) => state.favoriteproducts.products
  );

  const isFavorite = (product) => {
    return favoriteProducts.some((favProduct) => favProduct.id === product.id);
  };

  const handleMouseOver = (productId) => {
    setHoverProduct(productId);
  };

  const handleMouseOut = () => {
    setHoverProduct(null);
  };

  const getProductCategory = async () => {
    const response = await request.get(`/products/category/${id}`);
    return response.data;
  };

  const { data } = useQuery(["getProductCategory", id], getProductCategory);
  const filterData = data?.data?.filter((e) => {
    if (priceFilter) {
      return priceFilter === "5000"
        ? e.price >= 5000 && e.price <= 10000
        : priceFilter === "10000"
        ? e.price >= 10000 && e.price <= 15000
        : priceFilter === "15000"
        ? e.price >= 15000 && e.price <= 20000
        : priceFilter === "20000"
        ? e.price >= 20000 && e.price <= 25000
        : priceFilter === "30000"
        ? e.price > "25000"
        : true;
    }
    if (RateFilter) {
      return e.Rate === RateFilter;
    }
    return true;
  });
  return (
    <div className="mb-20">
      <HeaderCategory />
      <div className="w-[95%] mx-auto">
        <div className="text-gray-500 my-3">
          Home / <span className="text-danger">{state?.name}</span>
        </div>
        <div className="flex justify-between flex-wrap mt-5 relative">
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(0,_250px))]  gap-4 w-[70%]">
            {filterData &&
              filterData?.map((product) => (
                <ProductItem
                  key={product._id}
                  product={product}
                  hoverProduct={hoverProduct}
                  handleMouseOver={handleMouseOver}
                  handleMouseOut={handleMouseOut}
                  isFavorite={isFavorite(product)}
                />
              ))}
            {!filterData?.length && (
              <img
                src={notFound}
                alt="notFound"
                className="absolute left-[25%]"
              />
            )}
          </div>
          <div className=" px-12  bg-gray-100 rounded-lg">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
