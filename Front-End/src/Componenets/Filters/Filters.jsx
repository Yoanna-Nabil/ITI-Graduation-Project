import React, { useEffect, useState } from "react";
import { request } from "../../axios/axios";
import Loading from "../../ui/Loading";
import { useSearch } from "../context/SearchContext";
import ProductItem from "../ProductItem/ProductItem";
import notSearch from "../../Assets/3bbf.jpg";
const Filters = () => {
  const [hoverProduct, setHoverProduct] = useState(null);
  const { searchQuery } = useSearch();
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (searchQuery) {
      request
        .get(`/products/search?name=${searchQuery}`)
        .then((result) => {
          setProducts(result?.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [searchQuery]);

  if (loading) {
    return <Loading />;
  }

  const handleMouseOver = (productId) => {
    setHoverProduct(productId);
  };

  const handleMouseOut = () => {
    setHoverProduct(null);
  };
  return (
    <div className=" m-12 mb-12">
      <h3 className="my-3 font-bold mb-5 text-red-500">Filtered Products</h3>
      {products.length === 0 ? (
        <div className="h-[60vh]">
          <img
            src={notSearch}
            alt="NotSearch"
            className="absolute left-[50%] translate-x-[-50%] "
          />
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(0,_250px))] smml:grid-cols-[repeat(auto-fit,_minmax(250px,1fr))] gap-4">
          {products.map((product) => (
            <ProductItem
              key={product._id}
              product={product}
              hoverProduct={hoverProduct}
              handleMouseOver={handleMouseOver}
              handleMouseOut={handleMouseOut}
              offer={product?.offres === true ? true : false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Filters;
